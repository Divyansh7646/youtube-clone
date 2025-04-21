import React from 'react'
import { MdSubscriptions, MdOutlineVideoLibrary, MdHistory, MdHomeFilled, MdWatchLater } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { LuThumbsUp } from 'react-icons/lu';


const SideBar = () => {

    const mainLinks = [
        {
            icon: <MdHomeFilled className='text-xl' />,
            name: "Home",
        },
        {
            icon: <SiYoutubeshorts className='text-xl' />,
            name: "Shorts"
        },
        {
            icon: <MdSubscriptions className='text-xl' />,
            name: 'Subscriptions'
        }
    ];
    const otherLinks = [
        {
            icon: <MdOutlineVideoLibrary className='text-xl' />,
            name: 'Library'

        },
        {
            icon: <MdHistory className='text-xl' />,
            name: "History"
        },
        {
            icon: <MdWatchLater className='text-xl' />,
            name: "Watch Later"

        },
        {
            icon: <LuThumbsUp className='text-xl' />,
            name: "Liked Videos"

        },


    ]
    return (
        <div className='w-2/12  p-2 bg-[#212121] pr-5 overflow-auto pb-8 h-screen'>
            <ul className='flex flex-col border-b-1 b-2 border-gray-700'>
                {mainLinks.map(({ icon, name }) => {
                    return (<li
                        key={name}
                        className={`pl-6 py-3 hover:bg-zinc-700 ${name === "Home" ? "bg-zinc-600" : ""} rounded-xl`}
                    >



                        <a href='#' className='flex items-center gap-5'>
                            {icon}
                            <span className='text-sm tracking-wider'>{name}</span>
                        </a>
                    </li>
                    )
                })}
            </ul><ul className='flex flex-col border-b-1 border-gray-800'>
                {otherLinks.map(({ icon, name }) => {
                    return (<li
                        key={name}
                        className={`pl-6 py-3 ${name === "Home" ? "bg-slate-600 hover:bg-slate-600" : "hover:bg-zinc-600"} rounded-xl`}
                    >


                        <a href='#' className='flex items-center gap-5'>
                            {icon}
                            <span className='text-sm tracking-wider'>{name}</span>
                        </a>
                    </li>
                    )  
                })}                    
            </ul>



        </div>
    )
}

export default SideBar
