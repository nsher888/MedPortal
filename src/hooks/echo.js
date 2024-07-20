import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';

import instance from '../services/axios';

window.Pusher = Pusher;

const useEcho = () => {
  const [echoInstance, setEchoInstance] = useState(null);

  useEffect(() => {
    if (!echoInstance) {
      const echo = new Echo({
        broadcaster: 'reverb',
        key: import.meta.env.VITE_REVERB_APP_KEY,
        authorizer: (channel) => {
          return {
            authorize: (socketId, callback) => {
              instance
                .post('/api/broadcasting/auth', {
                  socket_id: socketId,
                  channel_name: channel.name,
                })
                .then((response) => {
                  callback(false, response.data);
                })
                .catch((error) => {
                  callback(true, error);
                });
            },
          };
        },
        wsHost: import.meta.env.VITE_REVERB_HOST,
        wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
        wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
        forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
        enabledTransports: ['ws', 'wss'],
      });

      setEchoInstance(echo);
    }
  }, [echoInstance]);

  return echoInstance;
};

export default useEcho;
