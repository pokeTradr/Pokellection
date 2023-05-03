import React from 'react'
import DeckItem from './DeckItem'
import {useSelector} from 'react-redux'


function List() {
    const { list } = useSelector(state => state.deckList);

    return (
    <div className='collection'>
        {list.map(el => <DeckItem pokemon={el}/>)}
    </div>
    )
}


export default List