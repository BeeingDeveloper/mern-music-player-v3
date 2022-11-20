import React from 'react'
import { Select } from '@chakra-ui/react'


const SelectDetails = ({selectItem, optionName, selectByData, selectionId, setAlbum, setArtist, setLanguage, setMusicCategory}) => {

    const onChangeOption = (e)=>{
        if(selectionId === 1){
            setAlbum(e.target.value);
        }
        if(selectionId === 2){
            setArtist(e.target.value);
        }
        if(selectionId === 3){
            setLanguage(e.target.value);
        }
        if(selectionId === 4){
            setMusicCategory(e.target.value);
        }
    }

  return (
    <>
    <div className='flex w-[100%] text-left gap-10  pb-10 justify-around items-center'>

        <h2 className='w-[52%] text-xl' >{selectItem}</h2>
        <Select placeholder={optionName} className=' pl-4 h-10 w-[95%] hover:shadow-lg hover:shadow-red-600 text-slate-200 rounded-md bg-slate-900 outline-none' onChange={(e)=>onChangeOption(e)} >
          {
            selectByData?.map((elm, i)=>{
                return(
                    <option className=' backdrop-blur-sm bg-transparent' key={i} value={elm.name}  >{elm.name}</option>
                )
            })
          }
        </Select>
    </div>
    </>
  )
}

export default SelectDetails