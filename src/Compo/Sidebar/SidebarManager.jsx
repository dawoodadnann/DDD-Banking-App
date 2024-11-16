import React from 'react';
import AccountToggle from './AccountToggle';
import RouteSelect from './RouteSelect';
import Plan from './Plan';
import RouteSelectManager from './RouteSelectManager';
import ToggleMan from './ToggleMan';

const SidebarManager = () => {
  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 to-blue-700 text-white overflow-y-scroll sticky top-4">
      {/* Main SideBar Content */}
      <ToggleMan />
      <RouteSelectManager />

      {/* Plan Toggle */}
      {/* <Plan /> */}
    </div>
  );
};

export default SidebarManager;
