import React from 'react';
import SearchBar from '../client/components/searchBar';
import CardDetail from '../client/components/cardDetail';
import PokemonCard from '../client/components/pokemonCard';
import List from '../client/components/List.jsx'
import Header from '../client/components/Header';



// Page displayed after user successfully logs in or creates a new user
const Home = () => {
    return (
        <div className='home_page_container'>
            <Header />
            <SearchBar />
            <CardDetail />
            <PokemonCard />
            <List/>
        </div>
    )
}


export default Home;