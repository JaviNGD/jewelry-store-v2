import React, { useEffect } from 'react'
import { getByCategory, getCategory, getItems, search } from '../../services/itemService';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import Search from '../../components/Search/Search';
import Category from '../../components/Category/Category';

const initialState = { items: [], categories: []};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {...state, items: action.payload};
    case 'SHOW_CATEGORY':
      return {...state, categories: action.payload};
    default:
      return state;
  }
}

export default function HomePage() {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const {items, categories} = state;
    const {searchTerm, categoryName} = useParams();

    // Get the items from the service
    useEffect(() => {
        // Get the categories and dispatch the action
        getCategory().then(categories => dispatch({type: 'SHOW_CATEGORY', payload: categories}));

        // Load the items based on the search term or category name 
        const loadItems = 
        categoryName? getByCategory(categoryName) : 
        searchTerm ? search(searchTerm) : getItems();

        // Load the items and dispatch the action
        loadItems.then(items => dispatch({type: 'ADD_ITEM', payload: items}));
    }
    , [searchTerm, categoryName]);

  return (
    <>
    <Search />
    <Category categories={categories}/>
    <Thumbnails items={items} />
    </>
  )
}
