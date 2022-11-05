import './App.css';
import Header from './Header';
import { Container } from '@mui/material';
import React from 'react';
import HomePage from './modules/shell/pages/HomePage';
import WalletInfoPage from './modules/wallet/pages/WalletInfoPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Router>
        <Container>
          <Header />
          <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route path='/wallet' element={<WalletInfoPage/>}/>
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;