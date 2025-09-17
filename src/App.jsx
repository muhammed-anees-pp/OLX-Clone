import React from 'react'
import Login from './Pages/Login/Login'
import Footer from './Components/Footer/Footer'
import Navbar from './Components/Navbar/Navbar'
import Categories from './Components/CategoryTab/Categories'
import Cards from './Components/Cards/Cards'

function App() {
  return (
    <div>
      <Navbar/>
      <Categories/>
      <Cards/>
      <Footer/>

    </div>
  )
}

export default App
