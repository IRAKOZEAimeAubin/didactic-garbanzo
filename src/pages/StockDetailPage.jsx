import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import finnHub from '../APIs/finnHub'

const StockDetailPage = () => {
  const { symbol } = useParams()
  useEffect( () => {
    const fetchData = async () => {
      const date = new Date()
      const currentTime = Math.floor( date.getTime() / 1000 )
      let oneDay
      if ( date.getDay() === 6 ) {
        oneDay = currentTime - 2 * 24 * 60 * 60
      } else if ( date.getDay() === 0 ) {
        oneDay = currentTime - 3 * 24 * 60 * 60
      } else {
        oneDay = currentTime - 24 * 60 * 60
      }
      const response = await finnHub.get( '/stock/candle', {
        params: {
          symbol,
          from: oneDay,
          to: currentTime,
          resolution: 1
        }
      })
    }
  })
  return (
    <div>StockDetailPage { symbol }</div>
  )
}

export default StockDetailPage