import { Howl } from 'howler';
import { useEffect, useRef, useState } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import useEcho from '../hooks/echo';
import { useAuth } from '../hooks/useAuth';
import instance from '../services/axios';

const fetchNotifications = async () => {
  const response = await instance.get('/api/notifications');
  return response.data;
};

const markNotificationsAsRead = async (notificationIds) => {
  await instance.post('/api/notifications/read', {
    notification_ids: notificationIds,
  });
};

const Notifications = () => {
  const { profile } = useAuth();
  const echo = useEcho();
  const queryClient = useQueryClient();
  const { data: notifications = [] } = useQuery(
    'notifications',
    fetchNotifications,
  );
  const unreadCount = notifications.filter((n) => !n.read).length;

  const mutation = useMutation(markNotificationsAsRead, {
    onSuccess: () => {
      queryClient.invalidateQueries('notifications');
    },
  });

  const [showNotifications, setShowNotifications] = useState(false);
  const [playSound, setPlaySound] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const soundRef = useRef(null);

  const initializeSound = () => {
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: ['/src/assets/bell.mp3'],
      });
    }
  };

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        initializeSound();
      }
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [userInteracted]);

  useEffect(() => {
    if (playSound && userInteracted && soundRef.current) {
      soundRef.current.play();
      setPlaySound(false);
    }
  }, [playSound, userInteracted]);

  useEffect(() => {
    if (echo && profile) {
      const channel = echo.private(`appointment.${profile.id}`);

      channel.listen('AppointmentBooked', (e) => {
        queryClient.setQueryData('notifications', (oldData) => [e, ...oldData]);
        setPlaySound(true);
      });

      return () => {
        channel.stopListening('AppointmentBooked');
        echo.leave(`appointment.${profile.id}`);
      };
    }
  }, [echo, profile, queryClient]);

  const handleMarkAsRead = (notificationIds) => {
    mutation.mutate(notificationIds);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, buttonRef]);

  const handleButtonClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className='relative pt-2'>
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        className='relative focus:outline-none'
      >
        <IoMdNotificationsOutline className='w-8 h-8 text-gray-600' />
        {unreadCount > 0 && (
          <span className='absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div
          ref={dropdownRef}
          className='absolute right-0 bg-white border border-gray-200 rounded-lg shadow-lg w-72'
        >
          <div className='py-2 overflow-y-auto max-h-96'>
            {notifications.length === 0 ? (
              <div className='px-4 py-2 text-gray-700'>No notifications</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-2 border-b border-gray-200 ${
                    notification.read ? 'bg-gray-100' : 'bg-white'
                  }`}
                >
                  <div className='text-sm text-gray-700'>
                    {notification.message}
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => handleMarkAsRead([notification.id])}
                      className='mt-1 text-xs text-blue-500 hover:underline'
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
