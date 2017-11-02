import React from 'react'
import { Link } from 'react-router-dom'

const AboutUs = () => (
  <div className="app">
    <div>this is the about page</div>
    <div>
      <Link to="/">Home</Link>
    </div>
    <div>
      <Link to="/contact">Contact</Link>
    </div>
  </div>
)

export default AboutUs
