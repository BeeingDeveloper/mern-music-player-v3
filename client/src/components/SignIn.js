import React,{useContext, useEffect} from 'react'
import VDO from '../assets/video/music-beat.mp4'
import {FcGoogle} from 'react-icons/fc'
import { app } from '../config/firebase.config'
import {getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { StateContext } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { validateUser } from '../api/api'

const SignIn = ({setAuth}) => {
  const navigate = useNavigate();
  const {state, dispatch} = useContext(StateContext);
  // const {user} = state;
  console.log(state)


// ------------------------------------------------------------------------------------------------
// SIGIN IN WITH GOOGLE FUNCTION
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const loginWithGoogle = async()=>{
    await signInWithPopup(auth, provider).then((userData)=>{
      if(userData){
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        auth.onAuthStateChanged((userData)=>{
          if(userData){
            userData.getIdToken().then((token)=>{
              validateUser(token).then((data)=>{
                dispatch({type: actionType.SET_USER, user: data});
                console.log(state)
              })
            })
            navigate("/", {replace: true})
          }else{
            setAuth(false);
            dispatch({type: actionType.SET_USER, user: null})
            navigate("/signin")
          }
        })
      }
    })
  }
// ------------------------------------------------------------------------------------------------


  useEffect(() => {
    if(window.localStorage.getItem("auth") === "true"){
      navigate("/", {replace: true})
    }
  }, [])
  

  return (
    <div className='relative  h-[94vh] my-auto inset-0 bg-black flex items-center justify-center overflow-hidden' >
      {/* <div className='absolute top-14' > */}
        <video
          src={VDO}
          type="video/mp4"
          loop
          muted
          autoPlay
          style={{ height: '150vh', position: 'absolute'}}
          // className=' w-screen h-screen object-cover'
        ></video>
        <div className='absolute bottom-32 p-2 flex items-center justify-center gap-2 bg-slate-600 rounded-md hover:rounded-3xl bgs hover:bg-card  transition-all ease-in-out duration-600 shadow-xl cursor-pointer' onClick={loginWithGoogle} >
          <FcGoogle />
          <h6 className='h-6 text-white hover:text-slate-300'>Sign in with Google</h6>
        </div>
      {/* </div> */}
    </div>
  )
}

export default SignIn