import React, { useContext } from 'react'
import {MdDeleteForever} from 'react-icons/md';
import { deleteArtist, fetchAllArtists, deleteAlbum, fetchAllAlbums } from '../api/api';
import { actionType } from '../context/reducer';
import { StateContext } from '../context/StateProvider';
import {motion} from 'framer-motion'

const CardElement = ({name, imageURL, id, type}) => {
    const {state, dispatch} = useContext(StateContext);
    const {allArtists, allAlbums} = state;

    const deleteArtistById = (id)=>{
        deleteArtist(id).then((data)=>{
            fetchAllArtists().then((res)=>{
                dispatch({type: actionType.SET_ALL_ARTISTS, allArtists: res.data});
            })
        })
    }

    const deleteAlbumById = (id)=>{
        deleteAlbum(id).then((data)=>{
            fetchAllAlbums().then((res)=>{
                dispatch({type: actionType.SET_ALL_ALBUMNS, allAlbums: res.data});
            });
        })
    }

  return (
    <div className=' h-60 w-56 bg-slate-800 rounded-lg m-4'>
        <div className='h-[85%] w-[95%] rounded-lg  p-2 m-auto'>
            <img src={imageURL} className='h-full rounded-lg m-auto' />   
        </div>
        <div className='flex w-[90%] m-auto  justify-between'>
            <h2>{name.length>15 ? name.slice(0, 14)+" . . .": name}</h2>
            <motion.div whileHover={{scale: 0.95}} className='h-8 w- bg-red-500 rounded-full text-[2rem] cursor-pointer'>
                <MdDeleteForever onClick={type === "album"?()=>deleteAlbumById(id) : ()=>deleteArtistById(id)} />
            </motion.div>  
        </div>

    </div>
  )
}

export default CardElement