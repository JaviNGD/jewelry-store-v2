import React, { useEffect } from 'react'
import { getItems } from '../../services/itemService';
import Thumbnails from '../../components/Thumbnails/Thumbnails';

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

    // Get the items from the service
    useEffect(() => {
        getItems().then(items => {
            dispatch({type: 'ADD_ITEM', payload: items});
        });
    }
    , []);

  return (
    <Thumbnails items={items} />
  )
}
