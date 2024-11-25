import React, { useState } from 'react';
import { Nav, Button } from 'react-bootstrap';
import RouteSelect from './RouteSelect';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div 
      className={`d-flex flex-column h-100 text-white transition-all ${isOpen ? 'w-250' : 'w-60'}`}
      style={{
        background: 'linear-gradient(180deg, #1E90FF 0%, #004AAD 100%)'
      }}
    >
      <div className="p-3 d-flex justify-content-between align-items-center">
        <span className={`h5 mb-0 text-white ${isOpen ? '' : 'd-none'}`}>D-Pay</span>
        <Button 
          onClick={toggleSidebar} 
          style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'white' }}
          className="p-1"
        >
          <FiMenu />
        </Button>
      </div>
      <div className={`p-3 ${isOpen ? '' : 'd-none'}`}>
        <Nav className="flex-column">
          <RouteSelect />
        </Nav>
      </div>
      <div className={`mt-auto p-3 ${isOpen ? '' : 'd-none'}`}>
        <Nav className="flex-column">
          <Link to="/portfolio">
            <button
              className="flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] hover:bg-zinc-800 bg-transparent text-white shadow-none"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </Link>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
