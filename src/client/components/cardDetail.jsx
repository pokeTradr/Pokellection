import React from 'react';
import { useSelector } from 'react-redux';

export default function cardDetail(props) {
  const cardVersions = useSelector((state) => state.currentCard.cardVersions);
  if (cardVersions.length === 0) {
    return <div>Test</div>;
  }

  if (cardVersions.length !== 0) {
    const cardNum = Math.floor(Math.random() * cardVersions.length);
    return (
      <div>
        Name: {cardVersions[cardNum].data.name}
        <img src={cardVersions[cardNum].data.images.small}></img>
        Price: {cardVersions[cardNum].data.cardmarket.prices.averageSellPrice}
        Types: {cardVersions[cardNum].data.types[0]}
      </div>
    );
  }
}

// import React, { useEffect, useRef } from 'react'
// import { useSelector } from 'react-redux';

// export default function cardDetail(props){
//     const cardVersions = useSelector(state => state.currentCard.cardVersions);
//     const value = useRef(true)

//     useEffect(() => {
//         if(value === true){
//             value.current = false;
//             return;
//         }

//         return ()=>{
//             <div>
//             Name: {cardVersions.data.name}
//             <img src = {cardVersions.data.images.small}></img>
//             Price: {cardVersions.data.cardmarket.prices.averageSellPrice}
//             Types: {cardVersions.data.cardmarket.types}

//         </div>
//         }
//     }, [cardVersions])

//     // if (cardVersions.length === 0) {
//     //     return <div>
//     //         Test
//     //     </div>
//     // }

//     // if (cardVersions.length !== 0) {
//     //     return <div>
//     //         Name: {cardVersions.data.name}
//     //         <img src = {cardVersions.data.images.small}></img>

//     //     </div>
//     // }
// }
