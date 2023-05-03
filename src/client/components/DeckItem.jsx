import React from 'react'

function DeckItem(props) {
    console.log(props.pokemon)
  return (
    <div>
        <img src={props.pokemon.images.small}/>
    </div>
  )
}

export default DeckItem