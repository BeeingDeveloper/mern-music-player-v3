import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import '../components/style.css'
import DashboardAlbum from './DashboardAlbum'
import DashboardArtist from './DashboardArtist'
import DashboardHome from './DashboardHome'
import DashboardSongs from './DashboardSongs'
import DashboardUser from './DashboardUser'



const Dashboard = () => {
  return (
    <div className=' justify-center items-center bg-slate-900 text-slate-300'>
        <div className=' h-32 w-full bg-slate-800  border-t-2 border-t-slate-900'>
            <div className=' w-[70%] m-auto flex mt-10 justify-around bg-slate-900 border-red-600 pt-2 h-11 border rounded-3xl ' >
                <NavLink to='/dashboard/home'    >Home</NavLink>
                <NavLink to='/dashboard/users'   >Users</NavLink>
                <NavLink to='/dashboard/songs'   >Songs</NavLink>
                <NavLink to='/dashboard/artists' >Artists</NavLink>
                <NavLink to='/dashboard/albums'  >Albums</NavLink>
            </div>
        </div>
        <div>
            <Routes>
                <Route path='/home' element={<DashboardHome /> } />
                <Route path='/users' element={<DashboardUser /> } />
                <Route path='/songs' element={<DashboardSongs /> } />
                <Route path='/artists' element={<DashboardArtist /> } />
                <Route path='/albums' element={<DashboardAlbum /> } />
            </Routes>
        </div>
    </div>
  )
}

export default Dashboard