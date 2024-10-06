import React from 'react'
import AccountToggle from './AccountToggle'
import Search from './Search'
import RouteSelect from './RouteSelect'
import Plan from './Plan'
import RouteSelectManager from './RouteSelectManager'
import ToggleMan from './ToggleMan'



const SidebarManager = () => {
  return (
    <div>
        <div className='bg-zinc-800 text-white overflow-y-scroll sticky  top-4 h-[100vh]'>
            {/*Main SideBar Content */}
            <ToggleMan/>
            <Search/>
           <RouteSelectManager/>
            
        </div>
        {/*Plan Toggle */}
          {/*<Plan/>*/}
    </div>
  )
}

export default SidebarManager