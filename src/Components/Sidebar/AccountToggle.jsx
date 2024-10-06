import React, { useState, useEffect } from "react";

import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const AccountToggle = () => {
  const [name,setname] = useState([]);
  const [email,setEmail] = useState([]);

  useEffect(() => {
    const fetchname = async () => {
      try {
        const response = await fetch("http://localhost:5000/getuserfullname", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.fullname) {
            console.log("Data retrieved successfully!", data.fullname);
            setname(data.fullname);
            setEmail(data.email);
          }
        } else {
          console.log("Failed to retrieve bills. Status:", response.status);
        }
      } catch (error) {
        console.error("Error retrieving bills:", error);
      }
    };

    fetchname();
  }, []);

  return (
    <div className='bg-zinc-800 border-b mb-4 mt-2 pb-4 border-stone-300 text-white'>
        <button className="bg-zinc-800 text-white flex p-0.5 hover:bg-zinc-800 rounded transition-colors relative gap-2 w-full items-center">

        <img
          src="https://api.dicebear.com/9.x/dylan/svg?seed=Cookie"
          alt="avatar"
          className="size-8 rounded shrink-0 bg-violet-500 shadow"
        />

        <div className="text-start flex-grow">
          <span className="text-sm font-bold block text-white">{name}</span>
          <span className="text-xs block text-white">{email}</span>
        </div>

        <FiChevronDown className="absolute right-4 top-1/2 translate-y-[calc(-50%+4px)] text-xs text-stone-800" />
        <FiChevronUp className="absolute right-4 top-1/2 translate-y-[calc(-50%-4px)] text-xs text-stone-800" />

        </button>
    </div>
  )
}

export default AccountToggle
