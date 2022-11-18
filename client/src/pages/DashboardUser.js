import { IconButton } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react'
import { deleteUser, demoteToMember, fetchAllUsers, promoteToAdmin } from '../api/api'
import { actionType } from '../context/reducer';
import { StateContext } from '../context/StateProvider'
import {MdDeleteSweep} from 'react-icons/md'


const UserElement =({name, profileIMG, email, createdAt, role, key, id })=>{
  let date = new Date(createdAt).toLocaleDateString();
  const {state, dispatch} = useContext(StateContext);
  const {allUsers, user} = state;

  
  useEffect(() => {
    fetchAllUsers().then((result)=>{
      dispatch({type: actionType.SET_ALL_USERS, allUsers: result.data});
    })
  }, [])
  

  const deleteAnUser =(id)=>{
    deleteUser(id).then((data)=>{
      if(data){
        fetchAllUsers().then((res)=>{
          dispatch({type: actionType.SET_ALL_USERS, allUsers: res.data})
        })
      }
    })
  }

  const switchToAdmin =(id, role)=>{
    promoteToAdmin(id, role).then((data)=>{
      if(data){
        fetchAllUsers().then((res)=>{
          dispatch({type: actionType.SET_ALL_USERS, allUsers: res.data});
        })
      }
    })
  }

  const switchToMember =(id, role)=>{
    demoteToMember(id, role).then((data)=>{
      if(data){
        fetchAllUsers().then((res)=>{
          dispatch({type: actionType.SET_ALL_USERS, allUsers: res.data});
        })
      }
    })
  }

  let newName = name.length > 12 ? name.slice(0, 14)+" ...." : name;


  console.log(allUsers)
  return(
    <>
      <div className='flex w-full h-14'>
          <div className='flex w-[60%] p-1 items-center justify-center' >
            <div className='h-8 w-12 pr-2'>
              {user?.user._id === id ? (<div className='h-8 w-12'></div>) : (<><MdDeleteSweep className=' h-8 w-10  text-red-600' onClick={()=>deleteAnUser(id)} /></> ) }
            </div>
            <img src={profileIMG}  alt='profile' className='h-10 w-10 rounded-full' />
            <p className=' w-full h-fit my-auto '>{newName}</p>
          </div>
          <p className=' w-[110%]  h-fit my-auto '>{email}</p>
          <p className=' w-[40%]  h-fit my-auto '>{date}</p>
          <p className=' w-[90%]  h-fit my-auto '>{role}
                    { role === "admin" ? (
                    <button className='text-slate-900 text-sm font-medium bg-red-500 rounded-3xl border border-slate-900 px-1 ml-2' onClick={()=>switchToMember(id, role)} >Demote</button>
                    ) : (<button className='text-slate-900 text-sm font-medium bg-green-500 rounded-3xl border border-slate-900 px-1 ml-2'
                            onClick={()=>switchToAdmin(id, role)}
                            >Promote</button>) }
          </p>

      </div>
      <div className='w-full h-[2px] bg-slate-600'></div>
    </>
  )
}


const DashboardUser = () => {

  const {state, dispatch} = useContext(StateContext);
  const {allUsers} = state;

  useEffect(() => {
    if(allUsers === null || allUsers === undefined){
      fetchAllUsers().then((result)=>{
        dispatch({type: actionType.SET_ALL_USERS, allUsers: result.data})
      })
    }
  }, [])
  


  console.log(allUsers)
  return (
    <div className='w-[80%] h-full pb-2 relative top-20 bg-slate-800 m-auto rounded-lg' >
      <div className=' h-12 w-full flex justify-between bg-red-600 text-xl  rounded-t-md' >
        <p className=' w-full h-fit my-auto '>Name</p>
        <p className=' w-full h-fit my-auto '>Email</p>
        <p className=' w-full h-fit my-auto '>Created Date</p>
        <p className=' w-full h-fit my-auto '>Role</p>
      </div>
      {
        allUsers ? allUsers.map((elm)=>{
          return(
            <>
              <UserElement key={elm._id} id={elm._id} name={elm.name} profileIMG = {elm.imageURL} email={elm.email} createdAt={elm.createdAt} role={elm.role}  />
            </>
          )
        }) : <></>
      }
    </div>
  )
}

export default DashboardUser