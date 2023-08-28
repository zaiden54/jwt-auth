import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from '../ui/NavBar';

export default function Layout(): JSX.Element {
  return (
    <>
      <NavBar />

      <Container className="mt-3">
        <Outlet />
      </Container>
    </>
  );
}
