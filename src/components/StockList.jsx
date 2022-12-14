import { useEffect, useState, useContext } from 'react'
import finnHub from '../APIs/finnHub'
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs"
import { WatchListContext } from '../context/watchListContext'
import { useNavigate } from 'react-router-dom'

const StockList = () => {
    const [ stock, setStock ] = useState( [] )
    const { watchList, deleteStock } = useContext( WatchListContext )
    const navigate = useNavigate()
    
    const changeColor = ( change ) => {
        return change > 0 ? 'success' : 'danger'
    }
    const renderIcon=(change)=>{
        return change > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />
    }
    useEffect( () => {
        let isMounted = true
        const fetchData = async () => {
            
            try {
                const responses = await Promise.all( watchList.map( ( stock ) => {
                    return finnHub.get( '/quote', {
                        params: {
                            symbol: stock
                        }
                    })
                } ) )
                
                const data = responses.map( ( response ) => {
                    return {
                        data: response.data,
                        symbol: response.config.params.symbol
                    }
                } )
                console.log( data )
                if ( isMounted ) {
                    setStock( data )
                }
            } catch (error) {
                
            }
        }
        fetchData()
        return () => {
            isMounted = false
        }
    }, [ watchList ] )

    const handleStockSelect = ( symbol ) => {
        navigate( `details/${ symbol }` )
    }

    return (
        <div>
            <table className='table hover mt-5'>
                <thead style={ { color: 'rgb(79, 89, 102)' } }>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Current Price</th>
                        <th scope='col'>Change</th>
                        <th scope='col'>Change Percentage</th>
                        <th scope='col'>Today's Highest Price</th>
                        <th scope='col'>Today's Lowest Price</th>
                        <th scope='col'>Opening Price</th>
                        <th scope='col'>Previous Closing Price</th>
                    </tr>
                </thead>
                <tbody>
                    { stock.map( ( stockData ) => {
                        return (
                            <tr style={{cursor: 'pointer'}} className='table-row' key={ stockData.symbol } onClick={ () => {
                                handleStockSelect(stockData.symbol)
                            }}>
                                <td scope='row'>{ stockData.symbol }</td>
                                <td scope='row'>{ stockData.data.c }</td>
                                <td scope='row' className={`text-${changeColor(stockData.data.d)}`}>{ stockData.data.d }</td>
                                <td scope='row' className={ `text-${ changeColor( stockData.data.dp ) }` }>{ stockData.data.dp }{ renderIcon( stockData.data.dp ) }</td>
                                <td scope='row'>{ stockData.data.h }</td>
                                <td scope='row'>{ stockData.data.l }</td>
                                <td scope='row'>{ stockData.data.o }</td>
                                <td scope='row'>{ stockData.data.pc } <button className='btn btn-danger btn-sm ml-3 d-inline-block delete-btn' onClick={ ( e ) => {
                                    e.stopPropagation()
                                    deleteStock(stockData.symbol)
                                }} >Remove</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default StockList