import React from 'react'
import AccountToggle from './AccountToggle'
import Search from './Search'
import RouteSelect from './RouteSelect'
import Plan from './Plan'



const Sidebar = () => {
  return (
    <div>
        <div className='bg-white overflow-y-scroll sticky  top-4 h-[100vh]'>
            {/*Main SideBar Content */}
            <AccountToggle/>
            <Search/>
            <RouteSelect/>
            
        </div>
        {/*Plan Toggle */}
          {/*<Plan/>*/}
    </div>
  )
}

export default Sidebar