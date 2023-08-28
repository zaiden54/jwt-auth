import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import Layout from './components/pages/Layout';
import AuthPage from './components/pages/AuthPage';

function App(): JSX.Element {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth/:type" element={<AuthPage />} />
      </Route>
    </Routes>
  );
}

export default App;
