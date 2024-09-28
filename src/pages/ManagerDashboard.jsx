import React from 'react'
import SidebarManager from '../components/Sidebar/SidebarManager'
import ManDash from '../components/ManagerDashboard/ManDash'

const ManagerDashboard = () => {
  return (


<div className="p-4">
  <main className="grid gap-4 grid-cols-[250px_1fr]">
     <SidebarManager/>
    <ManDash/>
   </main>
</div>
  )
}

export default ManagerDashboard