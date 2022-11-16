import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StockDetailPage from './pages/StockDetailPage'
import StockOverviewPage from './pages/StockOverviewPage'
import './App.css'

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <StockOverviewPage /> } />
          <Route path='/details/:stock' element={ <StockDetailPage /> } />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
