import React from 'react'
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const ToggleMan = () => {
  return (
    <div className='border-b mb-4 mt-2 pb-4 border-stone-300 text-white'>
        <button className=" text-white flex p-0.5 rounded transition-colors relative gap-2 w-full items-center">

        <img
          src="https://api.dicebear.com/9.x/micah/svg?seed=Christian"
          alt="avatar"
          className="size-8 rounded shrink-0  shadow"
        />

        <div className="text-start flex-grow">
          <span className="text-sm font-bold block text-white">Manager</span>
          <span className="text-xs block text-white0">ID # 445533</span>
        </div>

        <FiChevronDown className="absolute right-4 top-1/2 translate-y-[calc(-50%+4px)] text-xs text-stone-800" />
        <FiChevronUp className="absolute right-4 top-1/2 translate-y-[calc(-50%-4px)] text-xs text-stone-800" />

        </button>
    </div>
  )
}

export default ToggleMan
