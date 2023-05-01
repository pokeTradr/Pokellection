import React from 'react'

//show the image using the url fetched from server by fetching url, use img src tag
export default function (props){
    return(
    <img src={props.card} id="Image"/>
    )
}