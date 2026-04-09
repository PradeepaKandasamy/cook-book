import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Features from '../components/Features'
import PopularRecipes from '../components/PopularRecipes'

const Home = () => {
  return (
    <div>
        <Hero />
        <About />
        <Features />
        <PopularRecipes />
    </div>
  )
}

export default Home