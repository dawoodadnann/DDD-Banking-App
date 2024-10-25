import React from 'react'
import SidebarManager from '../Compo/Sidebar/SidebarManager'
import ManDash from '../Compo/ManagerDashboard/ManDash'

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