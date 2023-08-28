import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAppSelector } from '../../hooks/redux';

export default function MainPage(): JSX.Element {
  const user = useAppSelector((state) => state.user);

  return (
    <Container>
      <Row>
        {user.status === 'success' && <Col>{`Hello, ${user.data.name}`}</Col>}
      </Row>
    </Container>
  );
}
