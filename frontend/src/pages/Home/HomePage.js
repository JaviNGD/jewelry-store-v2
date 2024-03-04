import React, { useEffect } from 'react'
import { getByCategory, getCategory, getItems, search } from '../../services/itemService';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import Search from '../../components/Search/Search';
import Category from '../../components/Category/Category';
import NotFound from '../../components/NotFound/NotFound';

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
  const { items, categories } = state;
  const { searchTerm, categoryName } = useParams();

  useEffect(() => {
      // Fetch the categories
      const fetchCategories = async () => {
          try {
              const categories = await getCategory();
              dispatch({ type: 'SHOW_CATEGORY', payload: categories });
          } catch (error) {
              console.error('Error loading categories:', error);
          }
      };

      // Fetch the items
      const fetchItems = async () => {
          try {
              let loadedItems;
              if (categoryName) {
                  loadedItems = await getByCategory(categoryName);
              } else if (searchTerm) {
                  loadedItems = await search(searchTerm);
              } else {
                  loadedItems = await getItems();
              }
              dispatch({ type: 'ADD_ITEM', payload: loadedItems });
          } catch (error) {
              console.error('Error loading items:', error);
          }
      };

      fetchCategories();
      fetchItems();
  }, [searchTerm, categoryName]);

  return (
      <>
          <Search />
          <Category categories={categories} />
          <Thumbnails items={items} />
          {items.length === 0 && <NotFound />}
      </>
  );
}