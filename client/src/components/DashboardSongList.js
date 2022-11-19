import React, { useContext, useEffect, useState } from 'react'
import { StateContext } from '../context/StateProvider'
import {MdDeleteForever} from 'react-icons/md';
import {motion} from 'framer-motion';
import { fetchAllSongs } from '../api/api';
import { actionType } from '../context/reducer';


const SongElement =({songName, songCover, id})=>{

  const [flip, setFlip] = useState(false);

  const toggleFlip =()=>{
    if(flip) {
      setFlip(false);
    }else{
      setFlip(true);
    }
  }

  const {state, dispatch} = useContext(StateContext);
  const {allSongs} = state;

  


  return (
    <div className='flex h-56 w-52 ' >
      <div  className={`w-full ${flip?"w-full": "w-0"} bg-slate-800 transition-all ease-in-out duration-500 rounded-md`}
            onMouseLeave={()=>toggleFlip()}
            >
          <div className='h-full w-full p-4 flex justify-center items-center ml-4'>
            <motion.div whileHover={{scale: 0.9}} className=' bg-red-500 rounded-full  w-fit text-[4rem]'>
              <MdDeleteForever className='' /> 
            </motion.div>
            
          </div>

      </div>

      <div  className={` bg-slate-800 rounded-md p-1 ${flip?"w-0": "w-full"} transition-all ease-in-out duration-500 overflow-hidden`} 
            onMouseEnter={()=>toggleFlip()}
            >     
        <img src={songCover}
          className='h-[85%] w-[95%] m-auto rounded-md'
        />
        <div className='flex gap-2 p-1 text-center'>

          <h2>{`${songName.length > 20 ? songName.slice(0, 20)+"..." : songName} `}</h2>
        </div>
      </div>
    </div>
  )
}


const DashboardSongList = () => {

  const {state, dispatch} = useContext(StateContext);
  const {allSongs} = state;
  
  useEffect(() => {
    fetchAllSongs().then((result)=>{
      dispatch({type: actionType.SET_ALL_SONGS, allSongs: result.data})
    })
  }, [])
  

  return (
    <div className='w-[90%] grid md:grid-cols-3 lg:grid-cols-5 m-auto h-auto  rounded-md p-2'>
      {
        allSongs?.map((elm)=>{
          return (
            <>
              <SongElement songName={elm.name} songCover={elm.imageURL} id={elm._id} />
            </>
          )
        })
      }
    </div>
  )
}

export default DashboardSongList