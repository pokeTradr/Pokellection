import React, { useState } from "react";
import SearchBar from "../components/searchBar"
import PokemonCard from "../components/pokemonCard"
import CardDetail from "../cardDetail"

export default function MainContainer(props) {
  
  const fakeProps = {
    name: 'Ampharos',
    types: ['Lightning'],
    hp: '130',
    cardmarket: {
        url: 'https://prices.pokemontcg.io/cardmarket/pl1-1',
        updatedAt: '2023/04/29',
        prices: {
          averageSellPrice: 2.71,
          lowPrice: 0.15,
          trendPrice: 3.29,
          germanProLow: 0.0,
          suggestedPrice: 0.0,
          reverseHoloSell: 1.75,
          reverseHoloLow: 0.15,
          reverseHoloTrend: 3.23,
          lowPriceExPlus: 1.49,
          avg1: 1.25,
          avg7: 3.62,
          avg30: 3.1,
          reverseHoloAvg1: 1.75,
          reverseHoloAvg7: 2.83,
          reverseHoloAvg30: 2.49,
        },
      },
      images: {
        small: 'https://images.pokemontcg.io/det1/1.png',
        large: 'https://images.pokemontcg.io/det1/1_hires.png',
      }
    };
  //initialize state to one pokemon fetched from server
  const [data, setData] = useState(fakeProps);
  //update state whenever data is fetched from server
  return(
  <div id="main">
    <SearchBar data={data} setData={setData}/> 
    <div id="pokemonInfo">
      <PokemonCard card={data.images.small}/>
      <CardDetail name={data.name}price={data.cardmarket.prices.averageSellPrice}/>
    </div>
  </div>
  )
}

// const fakeProps = {
//   name: 'Ampharos',
//   types: ['Lightning'],
//   hp: '130',
//   cardmarket: {
//       url: 'https://prices.pokemontcg.io/cardmarket/pl1-1',
//       updatedAt: '2023/04/29',
//       prices: {
//         averageSellPrice: 2.71,
//         lowPrice: 0.15,
//         trendPrice: 3.29,
//         germanProLow: 0.0,
//         suggestedPrice: 0.0,
//         reverseHoloSell: 1.75,
//         reverseHoloLow: 0.15,
//         reverseHoloTrend: 3.23,
//         lowPriceExPlus: 1.49,
//         avg1: 1.25,
//         avg7: 3.62,
//         avg30: 3.1,
//         reverseHoloAvg1: 1.75,
//         reverseHoloAvg7: 2.83,
//         reverseHoloAvg30: 2.49,
//       },
//     },
//     images: {
//       small: 'https://images.pokemontcg.io/det1/1.png',
//       large: 'https://images.pokemontcg.io/det1/1_hires.png',
//     }
//   }