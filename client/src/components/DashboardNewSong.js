import React, { useContext, useEffect, useState } from 'react'
import {BiCloudUpload} from 'react-icons/bi'
import {getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject} from 'firebase/storage'
import {storage} from '../config/firebase.config'
import {MdDeleteForever} from 'react-icons/md'
import {motion} from 'framer-motion'
import {IoCheckmarkDoneCircleOutline} from 'react-icons/io5'
import SelectDetails from './SelectDetails'
import { fetchAllAlbums, fetchAllArtists, fetchAllSongs, uploadNewAlbum, uploadNewArtist, uploadNewSong } from '../api/api'
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
          <motion.div whileHover={{scale: 1.1}} className='relative bottom-12 w-fit p-1 text-3xl rounded-full left-[1rem] bg-red-600'>
            <MdDeleteForever onClick={()=>deleteIMG(image)} />
          </motion.div>
        </div>
      )}

    </div>
  )
}
const AudioInput =({ setIsAudioLoading, setAudioUploadingProgress, setAudio, audio, setName })=>{
  
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
            setName(uploadItem.name);
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
          <motion.div whileHover={{scale: 1.1}} className='relative left-[1rem] w-fit p-1 text-3xl rounded-full  bg-red-600'>
            <MdDeleteForever onClick={()=>deleteAUDIO(audio)} />
          </motion.div>
        </div>
      )}

    </div>
  )
}









// ============================================================================ LEFT SIDE INPUT ===============================================================================
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

      setName("");
      setImage(null);
      setAudio(null);
      setAlbum(false);
      setArtist(false);
      setLanguage(false);
      setMusicCategory(false);
    }
  }
  return(
    <div className=' p-2' >
      <div className='m-4'>
        <input  type='name' 
                required 
                className='w-full h-8 rounded-md pl-2 text-slate-900 outline-none
                 focus-within:shadow-lg  focus-within:shadow-slate-500' 
                placeholder='Type song name...' 
                value={name} 
                onChange={(e)=>setName(e.target.value)} 
              />
      </div>

      <div className='flex'>
          <div className='w-[50%] p-4 rel ' >
            <div id='IMAGE-INPUT-SECTION' className='w-full mb-5 h-64 bg-slate-900 rounded-md border border-red-600'>
              { isImageLoading ? ( <UploadingUI fileUploadingProgress={imageUploadingProgress} /> ) : ( <ImageInput setIsImageLoading={setIsImageLoading} 
                                                                                                                    setImageUploadingProgress={setImageUploadingProgress}
                                                                                                                    setImage={setImage}
                                                                                                                    image={image}
                                                                                                                    /> )
              }
            </div>
              
              
              
            <div id='AUDIO-INPUT-SECTION' className='w-full h-64 bg-slate-900 rounded-md border border-red-600'>
              { isAudioLoading ? ( <UploadingUI fileUploadingProgress={audioUploadingProgress}  /> ) : ( <AudioInput  setIsAudioLoading={setIsAudioLoading}  
                                                                                                                      setAudioUploadingProgress={setAudioUploadingProgress} 
                                                                                                                      setAudio={setAudio} 
                                                                                                                      audio={audio}
                                                                                                                      setName={setName}
                                                                                                                      /> )
              }
            </div>
          </div>

          <div className='w-[50%] p-2 h-full '>
            <SelectDetails selectItem={"Select Album : "}                      selectionId={1} optionName={"Album"} selectByData={allAlbums} setAlbum={setAlbum} />
            <SelectDetails selectItem={"Select Artist : "}                 selectionId={2} optionName={"Artist"} selectByData={allArtists} setArtist={setArtist} />
            <SelectDetails selectItem={"Select Language : "}          selectionId={3} optionName={"Language"} selectByData={languages} setLanguage={setLanguage} />
            <SelectDetails selectItem={"Select Category : "} selectionId={4} optionName={"Category"} selectByData={category} setMusicCategory={setMusicCategory} />

            <div className='w-full text-slate-900 h-32  ml-0 grid grid-cols-3 ' >
                <div className={`bg-green-500 ${image ? "flex" : "hidden"} h-fit w-40 justify-between m-1 px-2 text-slate-900 items-center rounded-3xl text-xl`}>
                  <h2>Cover</h2>
                  <IoCheckmarkDoneCircleOutline className='text-2xl' />
                </div>
                <div className={`bg-green-500 ${name ? "flex" : "hidden"} h-fit w-40 justify-between m-1 px-2 text-slate-900 items-center rounded-3xl text-xl`}>
                  <h2>Song Name</h2>
                  <IoCheckmarkDoneCircleOutline className='text-2xl' />
                </div>
                <div className={`bg-green-500 ${audio ? "flex" : "hidden"} h-fit w-40 justify-between m-1 px-2 text-slate-900 items-center rounded-3xl text-xl`}>
                  <h2>Audio</h2>
                  <IoCheckmarkDoneCircleOutline className='text-2xl' />
                </div>
                <div className={`bg-green-500 ${album ? "flex" : "hidden"} h-fit w-40 justify-between m-1 px-2 text-slate-900 items-center rounded-3xl text-xl`}>
                  <h2>Album</h2>
                  <IoCheckmarkDoneCircleOutline className='text-2xl' />
                </div>
                <div className={`bg-green-500 ${artist ? "flex" : "hidden"} h-fit w-40 justify-between m-1 px-2 text-slate-900 items-center rounded-3xl text-xl`}>
                  <h2>Artist</h2>
                  <IoCheckmarkDoneCircleOutline className='text-2xl' />
                </div>
                <div className={`bg-green-500 ${language ? "flex" : "hidden"} h-fit w-40 justify-between m-1 px-2 text-slate-900 items-center rounded-3xl text-xl`}>
                  <h2>Language</h2>
                  <IoCheckmarkDoneCircleOutline className='text-2xl' />
                </div>
                <div className={`bg-green-500 ${musicCategory ? "flex" : "hidden"} h-fit w-40 justify-between m-1 px-2 text-slate-900 items-center rounded-3xl text-xl`}>
                  <h2>Category</h2>
                  <IoCheckmarkDoneCircleOutline className='text-2xl' />
                </div>
            </div>

            <motion.div whileHover={{scale: 0.95}} 
                        className=' h-12 w-80 bg-red-600 hover:shadow-lg hover:shadow-red-600  rounded-full hover:rounded-full flex justify-center items-center cursor-pointer'
                        onClick={uploadSong}
                        >
                <h2 className='text-2xl'>Upload Song</h2>
            </motion.div>
          </div>

      </div>
    </div>
  )
}
// ============================================================================ LEFT SIDE INPUT ===============================================================================














const DashboardNewSong = () => {

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [isAudioLoading, setIsAudioLoading] = useState(false)
  const [imageUploadingProgress, setImageUploadingProgress] = useState(0);
  const [audioUploadingProgress, setAudioUploadingProgress] = useState(0);


  const [artistName, setArtistName] = useState("");
  const [artistIMG, setArtistIMG] = useState(null);
  const [isArtistImgLoading, setIsArtistImgLoading] = useState(false);
  const [artistImgUploadingProgress, setArtistImgUploadingProgress] = useState(false);

  const [albumName, setAlbumName] = useState("");
  const [albumImg, setAlbumImg] = useState(null);
  const [isAlbumImgLoading, setisAlbumImgLoading] = useState(false);
  const [albumImgUploadingProgress, setAlbumImgUploadingProgress] = useState(0);

  const {state, dispatch} = useContext(StateContext);
  const {allAlbums, allArtists} = state;

  const saveNewArtist =()=>{
    if(!artistName || !artistIMG || (artistName.length < 3)){
      alert("ERROR");
    }else{
      const artistData = {
        name: artistName,
        imageURL: artistIMG
      }
  
      uploadNewArtist(artistData).then((res)=>{
        fetchAllArtists().then((result)=>{
          dispatch({type: actionType.SET_ALL_ARTISTS, allArtists: result.data})
        })
      });
  
      setArtistName("");
      setArtistIMG(null);
    }
  }


  
  const saveNewAlbum = ()=>{
    if(!albumName || !albumImg || (albumName.length <3)){
      alert("ERROR");
    }else{
      const albumData = {
        name: albumName,
        imageURL: albumImg
      }

      uploadNewAlbum(albumData).then((res)=>{
        fetchAllAlbums().then((result)=>{
          dispatch({type: actionType.SET_ALL_ALBUMNS, allAlbums: result.data});
        })
      });

      setAlbumName("");
      setAlbumImg(null);
    }
  }


  return (
    <div className='w-full p-2 pt-5 pb-20 gap-5 flex justify-center items-center  h-auto'>
      {/* ================================================================================ */}
      <div className='w-[55%] h-[70%] border rounded-md bg-slate-800 border-red-600'>
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
      <div className='w-[40%] border p-2 border-red-600 bg-slate-800 rounded-md h-auto'>
        <div className='p-2 w-full'>


        {/* =============================================================SAVE ARTIST SECTION========================================================================= */}
          <div className='flex w-full h-[50%]'>
              <div className='w-[60%] h-60 bg-slate-900 rounded-md border border-red-600 m-4'>
                {isArtistImgLoading ? (<UploadingUI fileUploadingProgress={artistImgUploadingProgress} />) : (<ImageInput  setIsImageLoading={setIsArtistImgLoading} 
                                                                                                                  setImageUploadingProgress={setArtistImgUploadingProgress} 
                                                                                                                  image={artistIMG} 
                                                                                                                  setImage={setArtistIMG} />)}  
              </div>


              <div className='w-[40%] h-[100%] m-2' >
                <h2 className='text-2xl py-2 text-left pt-5' >Create New Artist</h2>
                <input  className='w-full h-8 rounded-md pl-2 text-slate-900 outline-none focus-within:shadow-lg  focus-within:shadow-slate-500 my-4' 
                        value={artistName} 
                        onChange={(e)=>setArtistName(e.target.value)}
                        placeholder="Type artist name..."
                        />
                <motion.div 
                  whileHover={{scale: 0.95}} 
                  className='bg-red-600 p-2 rounded-3xl cursor-pointer hover:shadow-lg hover:shadow-red-600' 
                  onClick={saveNewArtist}
                  >
                  Save Artist
                </motion.div>
              </div>
          </div>
        {/* =============================================================SAVE ARTIST SECTION========================================================================= */}








        {/* =============================================================SAVE ALBUM SECTION========================================================================= */}
          <div className='flex w-full h-[50%]'>
              <div className='w-[60%] h-60 bg-slate-900 rounded-md border border-red-600 m-4'>
                {isAlbumImgLoading ? (<UploadingUI fileUploadingProgress={albumImgUploadingProgress} />) : (<ImageInput  setIsImageLoading={setisAlbumImgLoading} 
                                                                                                                setImageUploadingProgress={setAlbumImgUploadingProgress} 
                                                                                                                image={albumImg} 
                                                                                                                setImage={setAlbumImg} />)}  
              </div>
              
              
              <div className='w-[40%] h-[100%] m-2' >
                <h2 className='text-2xl py-2 text-left pt-5' >Create New Album</h2>
                <input  className='w-full h-8 rounded-md pl-2 text-slate-900 outline-none focus-within:shadow-lg  focus-within:shadow-slate-500 my-4' 
                        value={albumName} 
                        onChange={(e)=>setAlbumName(e.target.value)}
                        placeholder="Type album name..."
                        />
                <motion.div 
                  whileHover={{scale: 0.95}} 
                  className='bg-red-600 p-2 rounded-3xl cursor-pointer hover:shadow-lg hover:shadow-red-600' 
                  onClick={saveNewAlbum}
                  >
                  Save Album
                </motion.div>
              </div>
          </div>
        {/* =============================================================SAVE ALBUM SECTION========================================================================= */}



        </div>
      </div>
    </div>
  )
}

export default DashboardNewSong;