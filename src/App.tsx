import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserForm from './components/userform'
import { Routes, Route, Navigate } from 'react-router-dom';
import SecondPage from './components/secondpage'

const App: React.FC = () => {
  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const userDetails = localStorage.getItem('userDetails');
    console.log(children)
    return userDetails ? children : <Navigate to="/" />;
  };

  return (
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/second" element={<PrivateRoute><SecondPage /></PrivateRoute>} />
    </Routes>
  );
};

export default App
