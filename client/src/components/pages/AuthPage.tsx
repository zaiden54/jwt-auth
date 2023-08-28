import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';

function AuthPage(): JSX.Element {
  const { type } = useParams();
  return (
    <Form>
      {type === 'signup' && (
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Username</Form.Label>
          <Form.Control type="name" name="name" placeholder="Enter username" />
        </Form.Group>
      )}

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default AuthPage;
