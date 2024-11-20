// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import Landing from './components/LandingPage.jsx'


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Landing />
//   </StrictMode>,
// )
import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './routers/router.jsx'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)