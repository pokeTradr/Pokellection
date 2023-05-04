import React, { useState } from 'react'
import deleteButton from 'deleteButton'

function DeckItem(props) {
    const { list } = useSelector(state => state.deckList);
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
        <button className='deleteButton' onClick={

          // remove itself from the list in state by using the index passed in as deleteIndex
          list.splice(props.deleteIndex, 1)

        }></button>
    </div>
  )
}

export default DeckItem