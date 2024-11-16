import React from 'react';
import { StatCardMan } from './StatCardMan';
import { GraphMan } from './GraphMan';
import { AllRecentTransactions } from './AllRecentTransactions';

const GridMan = () => {
  return (
    <div className="px-4 grid gap-6 grid-cols-12">
      {/* Stat Cards Section */}
      <div className="col-span-12">
        <StatCardMan />
      </div>

      {/* Graph Section */}
      <div className="col-span-12">
        <GraphMan />
      </div>

      {/* Recent Transactions Section */}
      <div className="col-span-12">
        <AllRecentTransactions />
      </div>
    </div>
  );
};

export default GridMan;
