import React, { useContext, useEffect, useState } from 'react'
import { Select } from '@chakra-ui/react'




// const NewForm = ()=>{

//     const [name, setName] = useState(null);
//     console.log(name)
//     return(
//         <>
//         <Select placeholder='Select option'>
//           <option value='option1' onClick={(e)=>setName()}>Option 1</option>
//           <option value='option2'  onClick={(e)=>setName(e.target.value)}>Option 2</option>
//           <option value='option3'  onClick={(e)=>setName(e.target.value)}>Option 3</option>
//         </Select>
//         </>
//     )
// }

// <NewForm />


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

        <h2 className='w-[50%] text-xl' >{selectItem}</h2>
        <Select placeholder={optionName} className=' pl-4 h-10 w-[90%] text-slate-200 rounded-md bg-slate-700 outline-none' onChange={(e)=>onChangeOption(e)} >
          {
            selectByData?.map((elm, i)=>{
                return(
                    <option key={i} value={elm.name}  >{elm.name}</option>
                )
            })
          }
        </Select>
    </div>
    </>
  )
}

export default SelectDetails


// {
//     allAlbums?.map((elm)=>{
//         <option value='option1'>{elm.name}</option>
//     })
//   }


 {/* <div className=' w-[50%] h-10 bg-slate-700 rounded-md '> */}
            {/* <HiOutlineChevronDown className='text-slate-200 relative left-[87%] text-2xl h-10 my-auto' onClick={()=>toggleDropDown()} /> */}
            