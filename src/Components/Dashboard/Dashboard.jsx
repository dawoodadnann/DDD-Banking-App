import React from 'react'
import { TopBar } from './Topbar'
import { Grid } from './Grid'

const Dashboard = () => {
  return (
    <div className='bg-white rounded-lg pb-4 shadow h-[150vh]'>
        <TopBar/>
        <Grid />
    </div>
  )
}

export default Dashboard