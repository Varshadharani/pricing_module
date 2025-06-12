import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="mt-5 text-center">
      <h1 className="mb-4">🚗 Smart Ride Pricing System</h1>
      <p className="lead">A dynamic pricing system inspired by Uber/Ola.</p>

      <Row className="mt-4">
        <Col md={4}>
          <Card className="shadow-sm p-3">
            <Card.Body>
              <Card.Title>Distance Base Price (DBP)</Card.Title>
              <Card.Text>Flat fee up to X KMs based on day.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm p-3">
            <Card.Body>
              <Card.Title>Time Multiplier Factor (TMF)</Card.Title>
              <Card.Text>Price increases based on trip duration tiers.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm p-3">
            <Card.Body>
              <Card.Title>Waiting Charges (WC)</Card.Title>
              <Card.Text>Extra charges after initial free minutes.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
