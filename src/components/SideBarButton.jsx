export default function SidebarButton({ setSidebarOpen }) {
  return (
    <button
      type='button'
      className='-m-2.5 p-2.5 text-gray-700 lg:hidden'
      onClick={() => setSidebarOpen(true)}
    >
      <span className='sr-only'>Open sidebar</span>
      <div className='w-6 h-6'>≡</div>
    </button>
  );
}
