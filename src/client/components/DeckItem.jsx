import React, { useState } from 'react'

function DeckItem(props) {
    const [isHoveredOver, setIsHoveredOver] = useState(null)

    const onHoverHandler = (index) => {
      setIsHoveredOver(index)
    }

    const notOnHoverHandler = (index) => {
      setIsHoveredOver(index)
    }

  return (
    <div 
    key = {props.index}
    className = 'card'
    style = {{
      position: 'absolute',
      left : `${props.index * 50}px`,
      zIndex : isHoveredOver === props.index ? props.list.length : props.index
    }}
    onMouseOver = {() => onHoverHandler(props.index)}
    onMouseLeave = {() => notOnHoverHandler(props.index)}
    >
        
        <img src={props.pokemon.images.small}/>
    </div>
  )
}

export default DeckItem