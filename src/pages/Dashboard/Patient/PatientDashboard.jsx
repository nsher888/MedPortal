import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import {
  getAllClinics,
  getPatientResults,
} from './../../../services/patient/patient';
import FilterPopover from './Filter';

const PatientDashboard = () => {
  const { data, isLoading, error } = useQuery(
    'patientResults',
    getPatientResults,
  );
  const { data: clinics } = useQuery('clinicsList', getAllClinics);

  const [columnFilters, setColumnFilters] = useState([]);

  const columns = [
    {
      accessorKey: 'clinicName',
      header: 'Clinic Name',
      enableColumnFilter: true,
      cell: (props) => <div>{props.getValue()}</div>,
      filterFn: (row, id, value) => {
        if (!value.length) return true;
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'doctorNames',
      header: 'Doctor(s)',
      enableSorting: false,
      cell: (props) => <div>{props.getValue().join(', ')}</div>,
    },
    {
      accessorKey: 'testType',
      header: 'Test Type',
      cell: (props) => <div>{props.getValue()}</div>,
      filterFn: (row, id, value) => {
        if (!value.length) return true;
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'testResult',
      header: 'Test Result',
      enableSorting: false,
      cell: (props) => (
        <div>
          <a
            href={props.getValue()}
            target='_blank'
            rel='noopener noreferrer'
            className='text-indigo-600 hover:text-indigo-900'
          >
            View Result
          </a>
        </div>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Date of Test',
      cell: (props) => (
        <div>{new Date(props.getValue()).toLocaleDateString()}</div>
      ),
    },
  ];

  const relevantTestTypes = useMemo(() => {
    if (!data) return [];
    const typesSet = new Set(data.map((result) => result.testType));
    return Array.from(typesSet).map((type) => ({ value: type, label: type }));
  }, [data]);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    state: {
      columnFilters,
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className='px-4 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-base font-semibold leading-6 text-gray-900'>
            Patient Results
          </h1>
          <p className='mt-2 text-sm text-gray-700'>
            A list of all the patient results.
          </p>
          <FilterPopover
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            clinics={clinics}
            testTypes={relevantTestTypes}
          />
        </div>
      </div>
      <div className='flow-root mt-8'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle'>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        scope='col'
                        className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8'
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                        {header.column.getCanSort() && (
                          <button
                            onClick={header.column.getToggleSortingHandler()}
                            className='inline-block w-4 h-4 ml-1'
                          >
                            {
                              {
                                asc: '🔼',
                                desc: '🔽',
                                false: '↕️',
                              }[header.column.getIsSorted()]
                            }
                          </button>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className='py-4 pl-4 pr-3 text-sm text-gray-900 whitespace-nowrap sm:pl-6 lg:pl-8'
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className='py-4 pl-4 pr-3 text-sm text-center text-gray-500 whitespace-nowrap sm:pl-6 lg:pl-8'
                    >
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className='flex items-center justify-between mt-4'>
              <div className='text-sm text-gray-700'>
                Showing{' '}
                {table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                  1}{' '}
                to{' '}
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) *
                    table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length,
                )}{' '}
                of {table.getFilteredRowModel().rows.length} results
              </div>
              <div className='flex items-center'>
                <button
                  className='px-3 py-1 mx-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500'
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  &lt;&lt; First
                </button>
                <button
                  className='px-3 py-1 mx-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500'
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  &lt; Previous
                </button>
                <div className='flex items-center mx-2'>
                  Page{' '}
                  <input
                    type='number'
                    value={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      table.setPageIndex(page);
                    }}
                    className='w-12 px-2 py-1 mx-1 text-sm font-semibold text-center text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                    min={1}
                    max={table.getPageCount()}
                  />{' '}
                  of {table.getPageCount()}
                </div>
                <button
                  className='px-3 py-1 mx-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next &gt;
                </button>
                <button
                  className='px-3 py-1 mx-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500'
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  Last &gt;&gt;
                </button>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                  className='px-3 py-1 ml-4 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm '
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
