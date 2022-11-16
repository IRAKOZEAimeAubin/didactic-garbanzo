import { useEffect, useState } from 'react'
import finnHub from '../APIs/finnHub'

const StockList = () => {
    const [ stock, setStock ] = useState()
    const [ watchList, setWatchList ] = useState( [ 'GOOGL', 'MSFT', 'AMZN' ] )
    useEffect( () => {
        let isMounted = true
        const fetchData = async() => {
            try {
                const response = await finnHub.get( '/quote', {
                    params: {
                        symbol: 'GOOGL'
                    }
                })
                console.log( response )
                if ( isMounted ) {
                    setStock(response.data)
                }
            } catch (error) {
                
            }
        }
        fetchData()
        return () => {
            isMounted = false
        }
    },[])
    
    return (
        <h1>StockList</h1>
    )
}

export default StockList