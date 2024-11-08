import React from 'react'
import { StatCardMan } from './StatCardMan'
import { GraphMan } from './GraphMan'
// import { RecentTransactions } from '../Dashboard/RecentTransactions'
//import { ActivityGraph } from '../Dashboard/ActivityGraph'
import { AllRecentTransactions } from './AllRecentTransactions'

const GridMan = () => {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
    <StatCardMan/>
    <GraphMan/>
    <AllRecentTransactions/>
   

  </div>
  )
}

export default GridMan