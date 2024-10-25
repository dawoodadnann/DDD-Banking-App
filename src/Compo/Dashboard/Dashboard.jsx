import React from 'react'
import { TopBar } from './Topbar'
import { Grid } from './Grid'

const Dashboard = () => {
  return (
    <div className=' rounded-lg pb-4 shadow h-[150vh] text-white'>
        <TopBar/>
        <Grid />
    </div>
  )
}

export default Dashboard