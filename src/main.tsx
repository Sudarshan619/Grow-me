import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(

  
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
