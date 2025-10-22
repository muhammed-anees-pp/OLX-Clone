import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Cards from '../../Components/Cards/Cards'
import Footer from '../../Components/Footer/Footer'
import Categories from '../../Components/CategoryTab/Categories'

function Home() {
  return (
    <>
    <Navbar/>
    <Categories/>
    <Cards/>
    <Footer/>
    </>
  )
}

export default Home