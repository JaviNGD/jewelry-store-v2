import React, { useEffect } from 'react'
import searchClass from './search.module.css'
import { useNavigate, useParams } from 'react-router-dom';

export default function Search() {
    const [term, setTerm] = React.useState('');
    const navigate = useNavigate();
    const {searchTerm} = useParams();

    // If there is a search term in the URL, set it to the input field 
    // otherwise set the input field to an empty string
    useEffect(() => {
        setTerm(searchTerm ?? '');
    }, [searchTerm]);

    // If there is a search term, search for it, otherwise navigate to the home page
    const search = () => {
        term ? navigate(`/search/${term}`) : navigate('/');
    }

  return (
    <div className={searchClass.container}>
        <input 
            type="text" 
            value= {term}
            placeholder='What are you looking for ?' 
            onChange={e => setTerm(e.target.value)} 
            onKeyUp={e => e.key === 'Enter' && search()}
        />
        <button onClick={search}>Search</button>
    </div>
  )
}
