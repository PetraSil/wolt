import React, { useState, useContext } from 'react';
import { RestaurantContext } from '../../context/restaurantContext';
import { LocationContext } from '../../context/locationContext';
import axios from 'axios';
import Button from '../button/button';
import Input from '../input/input';
import Form from '../form/form';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { setRestaurantsList } = useContext(RestaurantContext);
  const { userLocation } = useContext(LocationContext);

  //Allow the search for restaurants with given parameters
  const onSubmitSearch = async (e) => {
    e.preventDefault();

    const name = searchValue;
    const userLon = userLocation[0];
    const userLat = userLocation[1];
    
    const response = await axios.get(`http://localhost:8080/api/getRestaurantsByName`, {
      params: {
        name,
        userLon,
        userLat,
      },
    });
    setRestaurantsList(response.data)
  }; 

  const onChange = (e) => {
    const { value } = e.target;
    setInputValue(value)
  }

  return (
    <Form onSubmit={onSubmitSearch} className={"search__form"} content={
      <>
        <Input 
          type={"text"} 
          value={inputValue} 
          placeholder={"Search..."} 
          change={onChange} 
          event={e => setSearchValue(e.target.value)}
          className={"search__input"}
        />
        <Button 
          type={"submit"} 
          text={"SEARCH"} 
          className={"search__button"}
        />
      </>
    }/>
  );
};

export default Search;