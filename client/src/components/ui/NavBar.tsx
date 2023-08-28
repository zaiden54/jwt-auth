import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import useAuth from '../../hooks/useAuth';

function NavBar(): JSX.Element {
  const { logoutHandler } = useAuth();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </Nav>
          <Nav>
            <Link to="/auth/signup" className="nav-link">
              SignUp
            </Link>
            <Link to="/auth/signin" className="nav-link">
              SignIn
            </Link>
            <Button className="nav-link" onClick={logoutHandler}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
