import React from 'react'

import {Navbar, Footer} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Routes />
      </main>
      <Footer />
    </div>
  )
}

export default App
