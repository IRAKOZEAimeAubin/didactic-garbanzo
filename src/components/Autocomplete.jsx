import { useState, useEffect, useContext } from 'react'
import finnHub from '../APIs/finnHub'
import { WatchListContext } from '../context/watchListContext'

const Autocomplete = () => {
  const [ search, setSearch ] = useState( '' )
  const [ results, setResults ] = useState( [] )
  const { addStock } = useContext( WatchListContext )
  
  const renderDropdown = () => {
    const dropdownClass = search ? 'show' : null
    return (
      <ul className={ `dropdown-menu ${ dropdownClass }` } style={ {
        height: '500px',
        overflowY: 'scroll',
        overflowX: 'hidden',
        cursor: 'pointer'
      }}>
        { results.map( ( result ) => {
          return (
            <li key={ result.symbol } className='dropdown-item' onClick={ () => {
              addStock( result.symbol )
              setSearch('')
            } }>{ result.description } ({ result.symbol })</li>
          )
        })}
      </ul>
    )
  }
  useEffect( () => {
    let isMounted = true
    const fetchData = async () => {
      try {
        const response = await finnHub.get( '/search', {
          params: {
            q: search
          }
        } )
        console.log( response.data.result )
        if ( isMounted ) {
          setResults( response.data.result )
        }
      } catch (error) {
        
      }
    }
    if ( search.length > 0 ) {
      fetchData()
    } else {
      setResults( [] )
    }
    return () => {
      isMounted = false
    }
  }, [ search ] )
  
  return (
    <div className='w-50 p-5 rounded mx-auto'>
      <div className='form-floating dropdown'>
        <input type='text' style={ { backgroundColor: 'rgba(145, 158, 171, 0.04)' } } className='form-control' placeholder='Search' id='search' autoComplete='off' value={ search } onChange={ ( e ) => {
          setSearch(e.target.value)
        }} />
        <label htmlFor='search'>Search</label>
        {renderDropdown()}
      </div>
    </div>
  )
}

export default Autocomplete