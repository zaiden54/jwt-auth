import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import Layout from './components/pages/Layout';
import AuthPage from './components/pages/AuthPage';
import useAuth from './hooks/useAuth';
import PrivateRouter from './components/PrivateRouter';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import checkAuthThunk from './features/redux/actions/authThunk';

function App(): JSX.Element {
  const { signInHandler, signUpHandler } = useAuth();

  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(checkAuthThunk());
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          element={
            <PrivateRouter redirectTo="/auth/signup" isAllowed={user.status === 'success'} />
          }
        >
          <Route path="/" element={<MainPage />} />
        </Route>

        <Route element={<PrivateRouter redirectTo="/" isAllowed={user.status !== 'success'} />}>
          <Route
            path="/auth/:type"
            element={<AuthPage signInHandler={signInHandler} signUpHandler={signUpHandler} />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
