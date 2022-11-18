import React, { useContext, useEffect, useState } from 'react'
import {BiCloudUpload} from 'react-icons/bi'
import {getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject} from 'firebase/storage'
import {storage} from '../config/firebase.config'
import {MdDeleteForever} from 'react-icons/md'
import {motion} from 'framer-motion'
import {HiOutlineChevronDown} from 'react-icons/hi'
import SelectDetails from './SelectDetails'
import { fetchAllAlbums, fetchAllArtists, fetchAllSongs, uploadNewSong } from '../api/api'
import { StateContext } from '../context/StateProvider'
import { actionType } from '../context/reducer'



const UploadingUI = (props)=>{
  const {fileUploadingProgress} = props;

  return(
    <div className='h-full w-full flex justify-center items-center' >
      <div className='h-[60%] w-[80%] rounded-md'>
        <div className='h-5 w-[80%] rounded-3xl mt-10 border border-red-600 m-auto'>
          <div className={`h-full bg-red-500 rounded-3xl`} style={{width: `${fileUploadingProgress}%` }} ></div>
        </div>
        <p className='mt-5'>{`Uploading: ${fileUploadingProgress}%`}</p>
      </div>
    </div>
  )
}


const ImageInput =({ setIsImageLoading, setImageUploadingProgress, image, setImage})=>{

  const uploadFile = (e)=>{
    setIsImageLoading(true);

    const uploadItem = e.target.files[0];
    const storageRef = ref(storage, `/Images/${Date.now()}-${uploadItem.name}`)
    const uploadTask = uploadBytesResumable(storageRef, uploadItem);

    uploadTask.on("state_changed", (snapshot)=>{
      setImageUploadingProgress( Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100) )
    },
    (error)=>{
      console.log(error);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((imageURL)=>{
        setImage(imageURL);
        // console.log(image)
        setIsImageLoading(false);
      })
    }
    )
  }

  const deleteIMG =( image)=>{
    const deleteRef = ref(storage, image);
    deleteObject(deleteRef).then(()=>{
      setImage(null);
    })
  }

  return (
    <div className='flex flex-col items-center  justify-center h-full' >
      {!image ? (      
      <label>
        <motion.div whileHover={{scale: 1.1}} className='flex flex-col  items-center justify-center cursor-pointer' >
          <p className='text-[3rem] text-red-600' >
              <BiCloudUpload /> 
          </p>
          <p className='text-lg text-red-600'>
              {`Click here to upload an Image`}
          </p>
         </motion.div>

        <input
          type="file"
          name='upload-file'
          accept= "image/*"
          className="w-0 h-0"
          onChange={uploadFile}
        />
      </label>) : (
        <div className='w-full h-full bg-slate-800 rounded-md'>
          <img src={image} className='h-full w-full rounded-xl p-1' />
          <motion.div whileHover={{scale: 1.1}} className='relative bottom-12 w-fit p-1 text-3xl rounded-full left-[92%] bg-red-600'>
            <MdDeleteForever onClick={()=>deleteIMG(image)} />
          </motion.div>
        </div>
      )}

    </div>
  )
}
const AudioInput =({ setIsAudioLoading, setAudioUploadingProgress, setAudio, audio })=>{
  
  const uploadFile = (e)=>{
    setIsAudioLoading(true);

    const uploadItem = e.target.files[0];
    const storageRef = ref(storage, `/Audio/${Date.now()}-${uploadItem.name}`)
    const uploadTask = uploadBytesResumable(storageRef, uploadItem);

    uploadTask.on("state_changed", (snapshot)=>{
      setAudioUploadingProgress(Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
    },
    (error)=>{
      console.log(error);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((songURL)=>{
        setAudio(songURL);
        setIsAudioLoading(false);
      })
    }
    );
  }

  const deleteAUDIO =(audio)=>{
    const deleteRef = ref(storage, audio);
    deleteObject(deleteRef).then(()=>{
      setAudio(null);
    })
  }

  return (
    <div className='flex flex-col items-center justify-center h-full' >
      {!audio ? (
        <label>
          <motion.div whileHover={{scale: 1.1}}  className='flex flex-col items-center justify-center cursor-pointer' >
            <p className='text-[3rem] text-red-600' >
                <BiCloudUpload /> 
            </p>
            <p className='text-lg text-red-600'>
                {`Click here to upload an Audio`}
            </p>
           </motion.div>
      
          <input
            type="file"
            name='upload-file'
            accept= "audio/*"
            className="w-0 h-0"
            onChange={uploadFile}
          />
        </label>
      ) : (
        <div className='w-full h-full bg-slate-800  rounded-md'>
          <div className='flex h-[80%] items-center justify-center pt-5' >
            <audio src={audio} controls />            
          </div>
          <motion.div whileHover={{scale: 1.1}} className='relative left-[92%] w-fit p-1 text-3xl rounded-full  bg-red-600'>
            <MdDeleteForever onClick={()=>deleteAUDIO(audio)} />
          </motion.div>
        </div>
      )}

    </div>
  )
}


const FileInputSection =(props)=>{
  let {
    name,
    setName,
    isImageLoading,
    setIsImageLoading,
    isAudioLoading,
    setIsAudioLoading,
    imageUploadingProgress,
    setImageUploadingProgress,
    audioUploadingProgress,
    setAudioUploadingProgress,
    image,
    setImage,
    audio,
    setAudio
  } = props;

  const {state, dispatch} = useContext(StateContext);
  const {allAlbums, allArtists, allSongs, languages, category} = state;
  useEffect(() => {
    fetchAllAlbums().then((res)=>{
      dispatch({type: actionType.SET_ALL_ALBUMNS, allAlbums: res.data});
    })

    fetchAllArtists().then((res)=>{
      dispatch({type: actionType.SET_ALL_ARTISTS, allArtists: res.data});
    })
    
  }, [])
  
  const [album, setAlbum] = useState(null);
  const [artist, setArtist] = useState(null);
  const [language, setLanguage] = useState(null);
  const [musicCategory, setMusicCategory] = useState(null);

  const uploadSong = ()=>{
    if(!album || !artist || !language || !musicCategory || !name || (name.length <4) || !image || !audio){
      alert("Fuckkk");
    }else{

      const songData = {
        name: name,  
        imageURL: image,
        songURL: audio,
        album: album,
        artist: artist,
        language: language,
        category: musicCategory,
      }

      uploadNewSong(songData).then((res)=>{
        fetchAllSongs().then((result)=>{
          dispatch({type: actionType.SET_ALL_SONGS, allSongs: result.data})
        })
      })

      setName("")
      setImage(null)
      setAudio(null)
    }
  }

  return(
    <div className=' p-2' >
      <div className='m-4'>
        <input type='name' required className='w-full h-8 rounded-md pl-2 text-slate-900 outline-none' placeholder='Type song name...' value={name} onChange={(e)=>setName(e.target.value)} />
      </div>

      <div className='flex'>
        {/* left */}
          <div className='w-[50%] p-4 rel ' >
            <div className='w-full mb-5 h-60 bg-slate-800 rounded-md border border-red-600'>
              { isImageLoading ? ( <UploadingUI fileUploadingProgress={imageUploadingProgress} /> ) : ( <ImageInput setIsImageLoading={setIsImageLoading} 
                                                                                                                    setImageUploadingProgress={setImageUploadingProgress}
                                                                                                                    setImage={setImage}
                                                                                                                    image={image}
                                                                                                                    /> )}
            </div>
              
              
              
            <div className='w-full h-60 bg-slate-800 rounded-md border border-red-600'>
              { isAudioLoading ? ( <UploadingUI fileUploadingProgress={audioUploadingProgress}  /> ) : ( <AudioInput  setIsAudioLoading={setIsAudioLoading}  
                                                                                                                      setAudioUploadingProgress={setAudioUploadingProgress} 
                                                                                                                      setAudio={setAudio} 
                                                                                                                      audio={audio}
                                                                                                                      /> )}
            </div>
          </div>

          <div className='w-[50%] p-4 h-full '>
            <SelectDetails selectItem={"Select Album : "}  selectionId={1} optionName={"Album"} selectByData={allAlbums} setAlbum={setAlbum} />
            <SelectDetails selectItem={"Select Artist : "} selectionId={2} optionName={"Artist"} selectByData={allArtists} setArtist={setArtist} />
            <SelectDetails selectItem={"Select Language : "} selectionId={3} optionName={"Language"} selectByData={languages} setLanguage={setLanguage} />
            <SelectDetails selectItem={"Select Category : "} selectionId={4} optionName={"Category"} selectByData={category} setMusicCategory={setMusicCategory} />
            
            <motion.div whileHover={{scale: 0.95}} 
                        className=' h-14 w-80 bg-red-600 rounded-md flex justify-center items-center cursor-pointer'
                        onClick={uploadSong}
                        >
                <h2 className='text-2xl' >Upload Song</h2>
            </motion.div>
          </div>

      </div>
    </div>
  )
}


{/* <div className='w-[50] h-full bg-cyan-500'>
<div className='flex justify-center items-center'>
  <h2>Select Album</h2>
  <div className=' w-[50%] h-10 bg-green-500'></div>
</div>
</div> */}
const DashboardNewSong = () => {

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [isAudioLoading, setIsAudioLoading] = useState(false)
  const [imageUploadingProgress, setImageUploadingProgress] = useState(0);
  const [audioUploadingProgress, setAudioUploadingProgress] = useState(0);


  return (
    <div className='w-full relative top-20 p-2 gap-5 flex justify-center items-center  h-auto'>
      {/* ================================================================================ */}
      <div className='w-[60%] h-[70%] border rounded-md border-red-600'>
        <FileInputSection 
          name={name}
          setName={setName}
          isImageLoading={isImageLoading}
          setIsImageLoading={setIsImageLoading}
          isAudioLoading={isAudioLoading}
          setIsAudioLoading={setIsAudioLoading}
          imageUploadingProgress={imageUploadingProgress}
          setImageUploadingProgress={setImageUploadingProgress}
          audioUploadingProgress={audioUploadingProgress}
          setAudioUploadingProgress={setAudioUploadingProgress}
          image={image}
          setImage={setImage}
          audio={audio}
          setAudio={setAudio}
         />
      </div>
      {/* ================================================================================ */}





      {/* ================================================================================ */}
      <div className='w-[40%] border border-red-600 h-32'>

      </div>
      {/* ================================================================================ */}

    </div>
  )
}

export default DashboardNewSong