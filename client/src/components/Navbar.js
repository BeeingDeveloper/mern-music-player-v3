import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import { StateContext } from '../context/StateProvider'
import './style.css'
import {motion} from 'framer-motion'
import {getAuth} from 'firebase/auth'
import {app} from '../config/firebase.config';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Portal,
  Button,
} from '@chakra-ui/react'
import Musics from '../pages/Musics'

const Navbar = () => {

  const [activeNav, setActiveNav] = useState("#");
  const navigate = useNavigate();
  const {state} = useContext(StateContext);
  const {user} = state;
  
  let name = user?.user?.name;
  let imageURL = user?.user?.imageURL;

  let firstName = undefined;
  let profileIMG = imageURL ? imageURL : logo;
  let role = user?.user?.role;
  if(name) firstName = name.split(" ")[0];
  // const [activePopup, setActivePopup] = useState(undefined);


  const headToHome =()=>{
    navigate("/home");
    setActiveNav("#");
  }

  const signOut = ()=>{
    const auth = getAuth(app);
      auth.signOut().then(()=>{
        window.localStorage.setItem("auth" , "false");
        navigate("/", {replace: true});
      }).catch((error)=>{
        navigate("/signin", {replace: true});
      })
  }

  
  return (
    <header className='h-14 w-screen bg-slate-800 text-slate-300 z-10 ' >
      <div className='h-14 w-screen bg-slate-800 fixed'>
        <div className='w-[90%] m-auto flex items-center justify-between '>
            <button onClick={headToHome} className='hidden md:flex' >
              <NavLink to="/" >
                <img src={logo} alt='logo' className='h-12 pt-2' />
              </NavLink>
            </button>


            <div className='flex items-center justify-center  h-14' >
              <div className='bg-slate-900 p-2 px-3 rounded-3xl flex gap-5'>
              <a href='#home' onClick={()=>setActiveNav('#')} className={activeNav === "#home" ? 'active' : ''} >
                <NavLink to={'/home'} >Home</NavLink>    
              </a>

              <a href='#musics' onClick={()=>setActiveNav('#musics')} className={activeNav === "#musics" ? 'active' : ''} >
                <NavLink to={'/musics'} >
                  Musics
                </NavLink>    
              </a>

              <a href='#premium' onClick={()=>setActiveNav('#premium')} className={activeNav === "#premium" ? 'active' : ''}>
                <NavLink to={'/premium'} >Premium</NavLink> 
              </a>

              <a href='#contact' onClick={()=>setActiveNav('#contact')} className={activeNav === "#contact" ? 'active' : ''} >
                <NavLink to={'/contact'} > Contact Us</NavLink> 
              </a>
              </div>
            </div>

            <Popover
              isOpen={!firstName ? false : undefined }
              closeOnBlur={true}
              >
              <PopoverTrigger>
                <Button>
                  <motion.div className='w-fit h-fit flex gap-2 rounded-3xl p-1 bg-slate-900 transition-all ease-in-out duration-200 ' whileHover={{scale: 0.9}}
                    onClick={!firstName ? ()=>navigate("/signin") : ()=>navigate("/home") }
                  >
                      <h2 className='text-xl my-auto pl-2 hidden md:flex' >{firstName ? firstName : "Sign In"}</h2>
                      <img src={profileIMG} alt='' className='h-8  rounded-full ' />
                  </motion.div>
                </Button>
              </PopoverTrigger>
              <Portal  >
                <PopoverContent className='bg-slate-800 w-44 text-slate-300 shadow-2xl shadow-red-500 rounded-lg p-2 hover:bg-slate-900'>
                  <div className='flex flex-col'>
                    <motion.p className=' cursor-pointer' whileHover={{scale: 0.95}} >Profile</motion.p>
                    <motion.p className=' cursor-pointer' whileHover={{scale: 0.95}}>My Favorites</motion.p>
                    <div className='w-full h-1 bg-slate-400 rounded-3xl'></div>
                    {
                      role === "admin" && (
                        <NavLink to='/dashboard/home' className=' cursor-pointer'>Dashboard</NavLink>
                      )
                    }
                    <motion.p onClick={signOut} className=' cursor-pointer' whileHover={{scale: 0.95}} >Sign Out</motion.p>
                  </div>
                </PopoverContent>
              </Portal>
            </Popover>
        </div>
      </div>
    </header>
  )
}

export default Navbar







                  // {/* <PopoverCloseButton /> */}
                  // <PopoverBody>
                  //   <p className=' text-slate-500' >Profile</p>
                  //   <p className=' text-slate-500' >My Favorites</p>
                  //   <div></div>
                  //   <Button colorScheme='blue'>Button</Button>


