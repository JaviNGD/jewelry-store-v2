import React from 'react'
import SearchClass from './search.module.css'
import { useNavigate, useParams } from 'react-router-dom';

export default function Search() {
    const [term, setTerm] = React.useState('');
    const navigate = useNavigate();
    const {searchTerm} = useParams();

    // If there is a search term, search for it, otherwise navigate to the home page
    const search = () => {
        term ? navigate(`/search/${term}`) : navigate('/');
    }

  return (
    <div className={SearchClass.container}>
        <input 
            type="text" 
            defaultValue={searchTerm} 
            placeholder='What are you looking for ?' 
            onChange={e => setTerm(e.target.value)} 
            onKeyUp={e => e.key === 'Enter' && search()}
        />
        <button onClick={search}>Search</button>
    </div>
  )
}
