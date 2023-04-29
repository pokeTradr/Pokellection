import React, { useState } from 'react';

export default function(props){
    const [searchInput, setSearchInput] = useState("");
    const handlerChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        //fetch imaginary endpoint from server with searchInput as req body
        //promise chain 
        // setData(res)
    }

    return(
        <form onsubmit={handleSubmit}>
    <input 
    type= "text"
    placeholder="Start Searching..."
    onChange={handlerChange}
    value={searchInput}
    />
    <input type="submit"/>
    </form>
    )
}