import React from 'react'
//import { StatCardMan } from './StatCardMan'
import { TopBar } from '../Dashboard/Topbar'
import GridMan from './GridMan'

const ManDash = () => {
  return (
    <div className='text-white rounded-lg pb-4 shadow h-[150vh]'>
        <TopBar/>
        <GridMan/>
    </div>
  )
}

export default ManDash