import React, { useEffect } from 'react'
import { getItems, search } from '../../services/itemService';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import Search from '../../components/Search/Search';

const initialState = { items: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {...state, items: action.payload};
    default:
      return state;
  }
}

export default function HomePage() {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const {items} = state;
    const {searchTerm} = useParams();

    // Get the items from the service
    useEffect(() => {
        // If there is a search term, use the search service, otherwise use the getItems service
        const loadItems = searchTerm ? search(searchTerm) : getItems();

        // Load the items and dispatch the action
        loadItems.then(items => dispatch({type: 'ADD_ITEM', payload: items}));
    }
    , [searchTerm]);

  return (
    <>
    <Search />
    <Thumbnails items={items} />
    </>
  )
}
