import React from 'react'

export default function cardDetail(props){
    return(
    <div id="Information">
    <div id="Name">Name:{props.name}</div>
    <div id="Price">Price:{props.price}</div>
    </div>
    )
}