import React from 'react'
import { Link } from 'react-router-dom'

const ContactUs = () => (
  <div className="app">
    <div>this is the contact page</div>
    <div>
      <Link to="/">Home</Link>
    </div>
    <div>
      <Link to="/about">about</Link>
    </div>
  </div>
)

export default ContactUs
