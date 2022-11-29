import './App.css';
import Header from './Header';
import { Container, Grid } from '@mui/material';
import React from 'react';
import HomePage from './modules/shell/pages/HomePage';
import ProfilePage from './modules/profile/pages/ProfilePage';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './sharedComponents/NotFoundPage';
import BottomNavBar from './sharedComponents/BottomNavBar';
import MarketPage from './modules/market/pages/MarketPage';
import SettingsPage from './modules/settings/pages/SettingsPage';

function App() {

  return (
    <Container className='App' maxWidth='sm' disableGutters>
      <Grid container direction='column'>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/market' element={<MarketPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <BottomNavBar />
      </Grid>
    </Container>
  );
}

export default App;