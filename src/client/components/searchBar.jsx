import React from 'react'



export default function (){
    const handlerChange(e) => {
        e.preventDefault();
        setSearchInput(e.target.value)
    } 

    return(
    <input 
    type= "text"
    placeholder="startSearching"
    onChange={handlerChange}
    value={searchInput}
    />
    )
}