import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {Route, BrowserRouter, Routes } from 'react-router-dom'
import VoteContextProvider from './context/voteContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VoteContextProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:token" element={<App />} />
    </Routes>
  </BrowserRouter>
  </VoteContextProvider>
  </React.StrictMode>,
)
