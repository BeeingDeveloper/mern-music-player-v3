import React, { useState } from 'react'
import {SiAddthis} from 'react-icons/si';
import DashboardNewSong from '../components/DashboardNewSong';
import {HiHome} from 'react-icons/hi2'
import DashboardSongList from '../components/DashboardSongList';

const DashboardSongs = () => {

  const [activeNewSongTab, setActiveNewSongTab] = useState(false);

  return (
    <div className='w-full  justify-center items-center'>
      <div className='flex w-fit m-auto gap-4 p-10'>
        <HiHome className='text-[28px] cursor-pointer bg-transparent rounded-lg  shadow-lg shadow-slate-400' onClick={()=>setActiveNewSongTab(false)} />
        {!activeNewSongTab && <SiAddthis className='text-[28px] cursor-pointer text-slate-200 shadow-lg shadow-slate-400' onClick={()=>setActiveNewSongTab(true)} />}
        {!activeNewSongTab && <input placeholder='Search songs...' className=' bg-slate-200 rounded-md outline-none text-slate-900 ml-5 pl-3  shadow-lg shadow-slate-400' />}
      </div>
      <div className='h-auto w-full' >
        {
          activeNewSongTab ? (<DashboardNewSong />) : 
          (
          <DashboardSongList />
          )
        }
      </div>
    </div>
  )
}

export default DashboardSongs