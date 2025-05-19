import React, { useEffect, useState } from 'react'
import { GiMetalHand } from "react-icons/gi";
import { HiOutlineMicrophone } from "react-icons/hi";
import { TbSettingsCode } from "react-icons/tb";
import { TbFileTypePpt } from "react-icons/tb";
import { BiSolidVideos } from "react-icons/bi";
import Toggle1, { Toggle2 } from '../assets/toggle1';
import { MdOutlineDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useAppContext } from './context';

const Section2 = () => {
  const { dark,setDark } = useAppContext()
    
    return (

    <div className='w-full h-24 flex flex-row gap-2 items-center dark:bg-black dark:text-white'>
        <div className='h-24 w-14 bg-blue-30 dark:bg-black flex flex-col items-center justify-center gap-4'>
        <TbFileTypePpt className='w-7 h-7'/>

        </div>
        <div className='h-24 w-20  bg-blue300 flex flex-col items-center justify-center gap-3'>
        <Toggle1 scriptType="handyppt" />
        <Toggle1 scriptType="voiceppt"/>

        </div>
        <div className='h-24 w-16 bg-blue300 flex flex-col items-center justify-center gap-4'>
        <GiMetalHand className='w-7 h-7'/>
        <HiOutlineMicrophone className='w-6 h-6'/>

        </div>
        <div className='h-24 w-20 bg-blue300 flex flex-col justify-center items-center gap-4'>
        <Toggle1 scriptType="handyvideo" />
        <Toggle1 scriptType="voicevideo"/>

        </div>
        <div className='h-24 w-14 bg-blue300 flex flex-col items-center justify-center gap-4'>
        <BiSolidVideos className='w-7 h-7' />

        </div>
        <div className='ml-24 h-10 w-32 bg-blue300 rounded-2xl border-2 border-black dark:border-white
        flex items-center justify-center'>
            <h4 className='font-orbitron text-lg font-normal'>Tutorial</h4>
        </div>

      <Menu as="div" className="relative inline-block text-left ">
      <div>
        <MenuButton className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ">
        <TbSettingsCode className="w-7 h-7 text-black dark:text-white hover:text-green-500 dark:hover:text-green-500" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-1 z-10 mt- w-11 origin-top-right rounded-md rounded-t-full rounded-b-full bg-green-300 ring-1 shadow-lg ring-black/5 
        transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 
        data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem >
            <button className="block px-2 py-2 text-sm text-gray-700 data-focus:bg-gray-10 data-focus:text-gray-900 
            data-focus:outline-hidden" onClick={() => setDark(true)} >
              <MdOutlineDarkMode className={`w-7 h-7 ${ dark? 'text-black' : 'text-white hover:text-black'}`}/>
            </button >
          </MenuItem>
          <MenuItem>
            <a
              className="block px-2 py-2 text-sm text-gray-700 data-focus:bg-gray-10 data-focus:text-gray-900 
              data-focus:outline-hidden"  onClick={() => setDark(false)}
            >
              <MdLightMode className={`w-7 h-7 ${ dark? 'text-black hover:text-white' : 'text-white'}`} />
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
    </div>
  )
}

export default Section2
