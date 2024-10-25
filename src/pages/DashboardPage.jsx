import React from 'react';
import Sidebar from '../Compo/Sidebar/Sidebar';
import Dashboard from '../Compo/Dashboard/Dashboard';

const DashboardPage = () => {
  return (
    <div className=" p-4">
      <main className="grid gap-4 grid-cols-[250px_1fr]">
        <Sidebar />
        <Dashboard />
      </main>
    </div>
  );
};

export default DashboardPage;
