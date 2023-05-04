import React, { useState } from 'react'

function DeckItem(props) {
    const [isHoveredOver, setIsHoveredOver] = useState(null)

    const onHoverHandler = (index) => {
      console.log(props.listLength)
      console.log('in the OnHoverHandler')
      setIsHoveredOver(index)
    }

    const notOnHoverHandler = (index) => {
      console.log('in the notOnHoverHandler')
      setIsHoveredOver(null)
    }

  return (
    <div 
    className='card'
    key = {props.index}
    style = {{
      position: 'absolute',
      left : props.index === 1 ? `${props.index * 20}px` : `${props.index * 50}px`,
      zIndex : isHoveredOver === props.index ? props.listLength + 1: props.index
    }}
    onMouseOver = {() => onHoverHandler(props.index)}
    onMouseLeave = {() => notOnHoverHandler(props.index)}
    >
        {props.pokemon.images.large ? 
          <img className = 'card' src={props.pokemon.images.large}/>
        :
          <img className = 'card' src={props.pokemon.images.small}/>
        }
      
        
    </div>
  )
}

export default DeckItem