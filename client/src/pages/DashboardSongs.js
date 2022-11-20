import React, { useState } from 'react'
import {SiAddthis} from 'react-icons/si';
import DashboardNewSong from '../components/DashboardNewSong';
import {HiHome} from 'react-icons/hi2'
import DashboardSongList from '../components/DashboardSongList';
import {BiSearchAlt} from 'react-icons/bi';
import {motion} from 'framer-motion';

const DashboardSongs = () => {

  const [activeNewSongTab, setActiveNewSongTab] = useState(false);
  

  return (
    <div className='w-full  justify-center items-center'>
      <div className='flex w-fit m-auto gap-4 p-10'>
        <HiHome className='text-[28px] cursor-pointer bg-transparent rounded-lg  shadow-lg shadow-slate-400 hover:scale-90 transition-all ease-in-out duration-200' onClick={()=>setActiveNewSongTab(false)} />
        {!activeNewSongTab && <SiAddthis className='text-[28px] cursor-pointer text-slate-200 shadow-lg shadow-slate-400 hover:scale-90 transition-all ease-in-out duration-200' onClick={()=>setActiveNewSongTab(true)} />}
      </div>
      <div className='h-auto w-full' >
        {
          activeNewSongTab ? (<DashboardNewSong />) : 
          (
          <DashboardSongList  />
          )
        }
      </div>
    </div>
  )
}

export default DashboardSongs