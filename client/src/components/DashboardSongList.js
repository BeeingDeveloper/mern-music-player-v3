import React, { useContext, useEffect, useState } from 'react'
import { StateContext } from '../context/StateProvider'
import {MdDeleteForever} from 'react-icons/md';
import {motion} from 'framer-motion';
import { deleteSongItem, fetchAllSongs } from '../api/api';
import { actionType } from '../context/reducer';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../config/firebase.config';
import {MdCleaningServices} from 'react-icons/md';


const SongElement =({songName, songCover, id, songData})=>{

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

  
  const deleteSong=(songData)=>{
    deleteSongItem(songData._id).then((data)=>{
      fetchAllSongs().then((res)=>{
        dispatch({type: actionType.SET_ALL_SONGS, allSongs: res.data});
      });

      const deleteIMG = ref(storage, songData.imageURL);
      deleteObject(deleteIMG).then(()=>{
      });

      const deleteAUDIO = ref(storage, songData.songURL);
      deleteObject(deleteAUDIO).then(()=>{
        console.log("song delted");
      });
    })
  }

  return (
    <motion.div className='flex h-64 w-52 hover:shadow-xl hover:shadow-slate-500' whileHover={{scale: 1.1}}  >
      <div  className={`w-full ${flip?"w-full": "w-0"} bg-slate-800 transition-all ease-in-out duration-500 rounded-md`}
            onMouseLeave={()=>toggleFlip()}
            >
          <div className='h-full w-full p-4 flex justify-center items-center ml-4'>
            <motion.button whileHover={{scale: 0.875}} className=' bg-red-500 rounded-full  w-fit text-[4rem]'>
              <MdDeleteForever className='' onClick={()=>deleteSong(songData)} /> 
            </motion.button>
            
          </div>

      </div>

      <div  className={` bg-slate-800 rounded-md p-1 ${flip?"w-0": "w-full"} transition-all ease-in-out duration-500 overflow-hidden`} 
            onMouseEnter={()=>toggleFlip()}
            >     
        <img src={songCover}
          className='h-[85%] w-[95%] m-auto rounded-lg'
        />
        <div className='flex gap-2 p-1 text-center'>

          <h2>{`${songName.length > 20 ? songName.slice(0, 20)+"..." : songName} `}</h2>
        </div>
      </div>
    </motion.div>
  )
}


const DashboardSongList = ({searchSong}) => {

  const {state, dispatch} = useContext(StateContext);
  const {allSongs} = state;
  
  useEffect(() => {
    fetchAllSongs().then((result)=>{
      dispatch({type: actionType.SET_ALL_SONGS, allSongs: result.data})
    })
  }, []);
  
  const [songList, setSongList] = useState(allSongs);
  const [searchSongName, setSearchSongName] = useState("");


  const searchSongs = ()=>{
    setSongList(songList.filter((elm)=>{
      let len = searchSongName.length;
      let getName = elm.name.toLowerCase();
      return getName.includes(searchSongName)
    })
    )
  }

  const handleChange =(e)=>{
    setSearchSongName(e.target.value);
    searchSongs();
    if(searchSongName.length <= 1){
      setSongList(allSongs)
    }
  }


  return (
    <>
      <div className='flex w-fit m-auto gap-5 pb-5' onKeyDown={()=>setSongList(allSongs)} >
          <input  placeholder='Search songs...' 
                                        className=' bg-slate-200 rounded-md outline-none text-slate-900 ml-5 px-2 shadow-lg shadow-slate-400'
                                        onChange={handleChange}
                                        />
          <motion.button className='text-2xl' whileHover={{scale: 0.85}} >
            <MdCleaningServices onClick={()=>setSongList(allSongs)} className='transform rotate-0 hover:rotate-45 transition-all ease-in-out duration-200' />
          </motion.button>
      </div>
      <div className='w-[90%] grid md:grid-cols-3 lg:grid-cols-5 m-auto h-auto  rounded-md p-2'>
        {
          songList?.map((elm, i)=>{
            return (
                <SongElement key={i} songName={elm.name} songCover={elm.imageURL} id={elm._id} songData={elm}  />
            )
          })
        }
      </div>
    </>
  )
}

export default DashboardSongList