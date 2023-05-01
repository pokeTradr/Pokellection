import React, { useState } from 'react';

export default function (props) {
  const [searchInput, setSearchInput] = useState('');
  const handlerChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/getPokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: searchInput }),
    })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          return res.json();
        } else {
          return;
        }
      })
      .then((data) => {
        console.log('this is my data :', data);
        data && props.setData(data);
      });
    //fetch imaginary endpoint from server with searchInput as req body
    //promise chain
    // setData(res)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Start Searching...'
        onChange={handlerChange}
        value={searchInput}
      />
      <input type='submit' />
    </form>
  );
}
