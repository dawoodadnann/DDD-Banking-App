import React from 'react'
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const ToggleMan = () => {
  return (
    <div className='border-b mb-4 mt-2 pb-4 border-stone-300'>
        <button className="bg-white flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">

        <img
          src="https://api.dicebear.com/9.x/micah/svg?seed=Christian"
          alt="avatar"
          className="size-8 rounded shrink-0 bg-violet-500 shadow"
        />

        <div className="text-start flex-grow">
          <span className="text-sm font-bold block text-stone-800">Manager</span>
          <span className="text-xs block text-stone-500">ID # 445533</span>
        </div>

        <FiChevronDown className="absolute right-4 top-1/2 translate-y-[calc(-50%+4px)] text-xs text-stone-800" />
        <FiChevronUp className="absolute right-4 top-1/2 translate-y-[calc(-50%-4px)] text-xs text-stone-800" />

        </button>
    </div>
  )
}

export default ToggleMan