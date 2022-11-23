import React, { useContext } from 'react'
import { fetchAllAlbums } from '../api/api';
import CardElement from '../components/CardElement';
import { actionType } from '../context/reducer';
import { StateContext } from '../context/StateProvider'


const DashboardAlbum = () => {
  const {state, dispatch} = useContext(StateContext);
  const {allAlbums} = state;
  
  fetchAllAlbums().then((res)=>{
    dispatch({type: actionType.SET_ALL_ALBUMNS, allAlbums: res.data});
  })

  return (
    <div className=' w-[90%] m-auto grid grid-cols-3 lg:grid-cols-5'>
      {
        allAlbums?.map((elm)=>{
          return(
            <CardElement name={elm.name} imageURL={elm.imageURL} id={elm._id} type={"album"} />
          )
        })
      }
    </div>
  )
}

export default DashboardAlbum