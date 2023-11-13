import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Results from './pages/Results'
import Detail from './pages/Detail'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result/:title" element={<Results />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
