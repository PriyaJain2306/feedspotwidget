import React from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
const About = () => {
  return (
    <ProtectedRoute>
    <div>Navigated to About Successfuly</div>
    </ProtectedRoute>
  )
}

export default About