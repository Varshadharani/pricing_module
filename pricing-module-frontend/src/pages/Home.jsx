// src/pages/Home.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Welcome to the Ride Fare Pricing Module</h1>

      <Row className="mb-5">
        <Col md={6} className="mb-3">
          <Card className="shadow-lg h-100">
            <Card.Body>
              <Card.Title>Create Day-Based Configuration</Card.Title>
              <Card.Text>
                Set base fares, distance pricing, time multipliers, and waiting charges for each day.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/create-config')}>
                Create Config
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-3">
          <Card className="shadow-lg h-100">
            <Card.Body>
              <Card.Title>Calculate Ride Fare</Card.Title>
              <Card.Text>
                Calculate a passenger's total fare by inputting day, distance, time, and waiting duration.
              </Card.Text>
              <Button variant="success" onClick={() => navigate('/calculate')}>
                Calculate Fare
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <h3 className="mb-3">How Pricing Works:</h3>
          <ul>
            <li><strong>Distance Base Price (DBP):</strong> Varies by day, e.g., ₹80 up to 3KM (Tue–Thu), ₹90 up to 3.5KM (Sat–Mon), ₹95 on Sun</li>
            <li><strong>Distance Additional Price (DAP):</strong> After DBP limit, ₹28–30 per KM</li>
            <li><strong>Time Multiplier Factor (TMF):</strong> 1x for first hour, 1.25x for next hour, 2.2x up to 3 hours</li>
            <li><strong>Waiting Charges (WC):</strong> First 3 minutes free, ₹5 every 3 minutes thereafter</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
