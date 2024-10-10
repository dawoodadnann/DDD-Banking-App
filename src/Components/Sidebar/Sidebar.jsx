import React, { useState } from 'react';
import AccountToggle from './AccountToggle';
import Search from './Search';
import RouteSelect from './RouteSelect';
import Plan from './Plan';

const Sidebar = () => {
  // State to track whether the sidebar is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Sidebar */}
      <div
        className={` fixed top-0 left-0 h-[100vh] text-white transition-transform duration-300 ${
          isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'
        } z-40`} // Sidebar slides
      >
        {/* Main Sidebar Content */}
        <AccountToggle />
        <Search />
        <RouteSelect />
      </div>

      {/* Button to toggle sidebar */}
      <button
        onClick={toggleSidebar}
        className={`absolute top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-2 z-50 rounded-l-full transition-transform duration-300 ${
          isOpen ? 'left-[16rem]' : 'left-[4rem]'
        }`} // Button is attached to the right edge of the sidebar
      >
        {/* Arrow Icon */}
        {isOpen ? '←' : '→'} {/* Arrow changes direction */}
      </button>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        {/* Your main components go here */}
        <h1 className="text-center text-2xl">Main Content</h1>
      </div>
    </div>
  );
};

export default Sidebar;
