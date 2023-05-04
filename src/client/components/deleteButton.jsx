import React, { useState } from 'react'

function DeleteButton(props) {
    return (
        <button onClick={
            // remove itself from the list in state by using the index passed in as deleteIndex
            list.splice(props.deleteIndex, 1)
        }></button>
    )
}

export default DeleteButton;