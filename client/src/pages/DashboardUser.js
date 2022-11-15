import React, { useContext, useEffect } from 'react'
import { fetchAllUsers } from '../api/api'
import { actionType } from '../context/reducer';
import { StateContext } from '../context/StateProvider'

const UserElement =({name, profileIMG, email, createdAt, role, key })=>{
  let date = new Date(createdAt).toLocaleDateString();

  // const switchRole =(key, role)=>{
  //   switchToAdmin(key, role).then((result)=>{
  //     if(result){
  //       fetchAllUsers().then((res)=>{
  //         dispatch({type: actionType.SET_ALL_USERS, allUsers: res.data})
  //       })
  //     }
  //   })
  // }

  return(
    <>
      <div className='flex w-full h-14'>
          <div className='flex w-full p-2 items-center justify-center' >
            <img src={profileIMG}  alt='profile' className='h-10 w-10 rounded-full' />
            <p className=' w-full h-fit my-auto '>{name}</p>
          </div>
          <p className=' w-full h-fit my-auto '>{email}</p>
          <p className=' w-full h-fit my-auto '>{date}</p>
          <p className=' w-full h-fit my-auto '>{role}
            <button className={ `text-xs text-slate-900 font-medium rounded-3xl px-1 ml-2 ${role==='admin'?'bg-red-500':'bg-green-500'}`}
              // onClick={}
            >
              {role === "admin" ? "Demote" : "Promote"}
            </button>
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
    <div className='w-[80%] h-44 relative top-20 bg-slate-800 m-auto rounded-lg' >
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
              <UserElement key={elm._id} name={elm.name} profileIMG = {elm.imageURL} email={elm.email} createdAt={elm.createdAt} role={elm.role}  />
            </>
          )
        }) : <></>
      }
    </div>
  )
}

export default DashboardUser