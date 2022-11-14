import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import { StateContext } from '../context/StateProvider'
import './style.css'
import {motion} from 'framer-motion'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
  Button
} from '@chakra-ui/react'

const Navbar = () => {

  const [activeNav, setActiveNav] = useState("#");
  const navigate = useNavigate();
  const {state} = useContext(StateContext);
  const {user} = state;
  console.log(user);
  const headToHome =()=>{
    navigate("/home");
    setActiveNav("#");
  }



  
  return (
    <div className='h-14 w-screen bg-slate-800' >
      <div className='h-14 w-screen bg-slate-800 fixed'>
        <div className='w-[90%] m-auto flex items-center justify-between '>
            <button onClick={headToHome} className='hidden md:flex' >
              <NavLink to="/" >
                <img src={logo} alt='logo' className='h-12 pt-2' />
              </NavLink>
            </button>


            <div className='flex items-center justify-center gap-5' >
              <a href='#home' onClick={()=>setActiveNav('#')} className={activeNav === "#home" ? 'active' : ''} >
                <NavLink to={'/home'} >Home</NavLink>    
              </a>

              <a href='#musics' onClick={()=>setActiveNav('#musics')} className={activeNav === "#musics" ? 'active' : ''} >
                <NavLink to={'/musics'} >Musics</NavLink>    
              </a>

              <a href='#premium' onClick={()=>setActiveNav('#premium')} className={activeNav === "#premium" ? 'active' : ''}>
                <NavLink to={'/premium'} >Premium</NavLink> 
              </a>

              <a href='#contact' onClick={()=>setActiveNav('#contact')} className={activeNav === "#contact" ? 'active' : ''} >
                <NavLink to={'/contact'} > Contact Us</NavLink> 
              </a>
            </div>

            <Popover >
              <PopoverTrigger>
                <Button>
                  <motion.div className='w-fit h-full flex gap-3 '  >
                      <h2 className='text-xl my-auto hidden md:flex' >{user?.user?.name}</h2>
                      <img src={logo} alt='logo' className='h-10 mt-2 rounded-full ' />
                  </motion.div>
                </Button>
              </PopoverTrigger>
              <Portal  >
                <PopoverContent className='bg-red-500 w-52 rounded-lg p-2'>
                  <PopoverArrow />
                  {/* <PopoverCloseButton /> */}
                  <PopoverBody>
                    <Button colorScheme='blue'>Button</Button>
                  </PopoverBody>
                  <PopoverFooter>This is the footer</PopoverFooter>
                </PopoverContent>
              </Portal>
            </Popover>
        </div>
      </div>
    </div>
  )
}

export default Navbar