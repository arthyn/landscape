import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'
import './styles/index.css'

export const useMockData = import.meta.env.VITE_MOCK_DATA === 'true'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>, 
  document.getElementById('app')
)
