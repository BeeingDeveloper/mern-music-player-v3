import './App.css';
import Navbar from './components/Navbar';
import {Routes, Route, useNavigate} from 'react-router-dom'
import SignIn from './components/SignIn';
import Home from './components/Home';
import { useState, useEffect, useContext } from 'react';
import {getAuth} from 'firebase/auth'
import { app } from './config/firebase.config';
import { validateUser } from './api/api';
import { StateContext } from './context/StateProvider';
import { actionType } from './context/reducer';
import Dashboard from './pages/Dashboard';
import Musics from './pages/Musics';
import Premium from './pages/Premium';
import Contact from './pages/Contact';
import './components/style.css'
function App() {
  const navigate = useNavigate();
  const firebaseAuth = getAuth(app);
  const [auth, setAuth] = useState(false || window.localStorage.getItem("auth")=== "true");
  console.log(auth)
  const {state, dispatch} = useContext(StateContext);


  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userData)=>{
      if(userData){
        userData.getIdToken().then((token)=>{
          validateUser(token).then((data)=>{
            dispatch({type: actionType.SET_USER, user: data});
            console.log(state)
          })
        })
      }else{
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        dispatch({type: actionType.SET_USER, user: null})
        navigate("/signin");
      }
    });
    navigate("/home");
  }, []);
  


  return (
    <div className="App bg-slate-900 min-h-screen text-slate-300 ">
      <Navbar />
      <Routes>
        <Route path='/signin' element={<SignIn setAuth={setAuth} /> } />
        <Route path='/*' element={<Home /> } />
        <Route path='/musics' element={<Musics /> } />
        <Route path='/premium' element={<Premium /> } />
        <Route path='/contact' element={<Contact /> } />
        <Route path='/dashboard/*' element={<Dashboard /> } />
          {/* <Route path='/home' element={<Dashboard />} />
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;
