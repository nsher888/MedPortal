import { useState, useRef, useEffect } from 'react';

const ClinicItem = ({ clinic, setColumnFilters, isActive }) => (
  <div className='flex items-center p-1'>
    <input
      type='checkbox'
      checked={isActive}
      onChange={() =>
        setColumnFilters((prev) => {
          const clinicFilters = prev.find(
            (filter) => filter.id === 'clinicName',
          )?.value;
          if (!clinicFilters) {
            return prev.concat({
              id: 'clinicName',
              value: [clinic.name],
            });
          }

          return prev.map((f) =>
            f.id === 'clinicName'
              ? {
                  ...f,
                  value: isActive
                    ? clinicFilters.filter((name) => name !== clinic.name)
                    : clinicFilters.concat(clinic.name),
                }
              : f,
          );
        })
      }
      className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
    />
    <label className='ml-3 text-sm text-gray-600'>{clinic.name}</label>
  </div>
);

const TestTypeItem = ({ testType, setColumnFilters, isActive }) => (
  <div className='flex items-center p-1'>
    <input
      type='checkbox'
      checked={isActive}
      onChange={() =>
        setColumnFilters((prev) => {
          const typeFilters = prev.find(
            (filter) => filter.id === 'testType',
          )?.value;
          if (!typeFilters) {
            return prev.concat({
              id: 'testType',
              value: [testType.value],
            });
          }

          return prev.map((f) =>
            f.id === 'testType'
              ? {
                  ...f,
                  value: isActive
                    ? typeFilters.filter((name) => name !== testType.value)
                    : typeFilters.concat(testType.value),
                }
              : f,
          );
        })
      }
      className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
    />
    <label className='ml-3 text-xs text-gray-600 '>{testType.label}</label>
  </div>
);

const FilterPopover = ({
  columnFilters,
  setColumnFilters,
  clinics,
  testTypes,
}) => {
  const filterClinics =
    columnFilters.find((f) => f.id === 'clinicName')?.value || [];
  const filterTypes =
    columnFilters.find((f) => f.id === 'testType')?.value || [];
  const [isClinicPopoverOpen, setIsClinicPopoverOpen] = useState(false);
  const [isTestTypePopoverOpen, setIsTestTypePopoverOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const clinicRef = useRef();
  const testTypeRef = useRef();

  const filteredTestTypes = testTypes.filter((type) =>
    type.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const clearFilters = () => {
    setColumnFilters([]);
  };

  const handleClickOutside = (event) => {
    if (
      clinicRef.current &&
      !clinicRef.current.contains(event.target) &&
      isClinicPopoverOpen
    ) {
      setIsClinicPopoverOpen(false);
    }
    if (
      testTypeRef.current &&
      !testTypeRef.current.contains(event.target) &&
      isTestTypePopoverOpen
    ) {
      setIsTestTypePopoverOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className='relative flex mt-6'>
      <div className='relative' ref={clinicRef}>
        <button
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md border ${
            filterClinics.length > 0
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-800 border-gray-300'
          } hover:bg-blue-500 hover:text-white transition`}
          onClick={() => {
            setIsClinicPopoverOpen(!isClinicPopoverOpen);
            setIsTestTypePopoverOpen(false);
          }}
        >
          <svg
            className='w-5 h-5 mr-2'
            fill='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path d='M13.414 18.586a2 2 0 01-2.828 0L2.929 9.414a2 2 0 112.828-2.828L12 13.172l7.243-7.586a2 2 0 112.828 2.828l-7.586 7.586z'></path>
          </svg>
          Filter by Clinic
        </button>
        {isClinicPopoverOpen && (
          <div className='absolute left-0 z-10 w-40 mt-2 bg-white border border-gray-300 rounded-md shadow-lg'>
            <div className='p-4'>
              <div className='mb-2 font-semibold text-gray-700'>Clinic</div>
              <div className='flex flex-col space-y-1'>
                {clinics?.map((clinic) => (
                  <ClinicItem
                    clinic={clinic}
                    isActive={filterClinics.includes(clinic.name)}
                    setColumnFilters={setColumnFilters}
                    key={clinic.id}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='relative ml-4' ref={testTypeRef}>
        <button
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md border ${
            filterTypes.length > 0
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-800 border-gray-300'
          } hover:bg-blue-500 hover:text-white transition`}
          onClick={() => {
            setIsTestTypePopoverOpen(!isTestTypePopoverOpen);
            setIsClinicPopoverOpen(false);
          }}
        >
          <svg
            className='w-5 h-5 mr-2'
            fill='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path d='M13.414 18.586a2 2 0 01-2.828 0L2.929 9.414a2 2 0 112.828-2.828L12 13.172l7.243-7.586a2 2 0 112.828 2.828l-7.586 7.586z'></path>
          </svg>
          Filter by Test Type
        </button>
        {isTestTypePopoverOpen && (
          <div className='absolute left-0 z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-80'>
            <div className='p-4'>
              <div className='mb-2 font-semibold text-gray-700'>Test Type</div>
              <input
                type='text'
                placeholder='Search test types...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full p-2 mb-2 text-sm border border-gray-300 rounded-md'
              />
              <div className='flex flex-col space-y-1 overflow-y-auto max-h-40'>
                {filteredTestTypes.map((type) => (
                  <TestTypeItem
                    testType={type}
                    isActive={filterTypes.includes(type.value)}
                    setColumnFilters={setColumnFilters}
                    key={type.value}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        className='flex items-center px-4 py-2 ml-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-200'
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterPopover;
