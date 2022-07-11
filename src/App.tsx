import * as React from 'react'
import Start from './Components/Start/Start'
import NoMatch from './Components/NoMatch/NoMatch'
import Shuffle from './Components/Shuffle/Shuffle'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/shuffle' element={<Shuffle />} />
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
