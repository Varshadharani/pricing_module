// src/components/PriceCalculator.jsx
import React, { useState } from 'react';
import { calculatePrice } from '../services/api';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';

const PriceCalculator = () => {
  const [formData, setFormData] = useState({
    riderName: '',
    riderPhone: '',
    day: '',
    distanceKM: '',
    duration: '',
    waitingTime: ''
  });

  const [price, setPrice] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCalc = async (e) => {
    e.preventDefault();
    setError('');
    setPrice(null);

    try {
      const { day, distanceKM, duration, waitingTime } = formData;
      const payload = { day, distanceKM: +distanceKM, duration: +duration, waitingTime: +waitingTime };
      const response = await calculatePrice(payload);

      if (response.data?.price !== undefined) {
        setPrice(response.data.price);
      } else {
        setError('Price not returned from server');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Calculation failed');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="text-center mb-4">Dynamic Fare Calculator</h2>
        <Form onSubmit={handleCalc}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="riderName">
                <Form.Label>Rider Name</Form.Label>
                <Form.Control name="riderName" value={formData.riderName} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="riderPhone">
                <Form.Label>Rider Phone</Form.Label>
                <Form.Control name="riderPhone" value={formData.riderPhone} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="day">
                <Form.Label>Day</Form.Label>
                <Form.Select name="day" value={formData.day} onChange={handleChange} required>
                  <option value="">Select Day</option>
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="distanceKM">
                <Form.Label>Distance (KM)</Form.Label>
                <Form.Control type="number" name="distanceKM" value={formData.distanceKM} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="duration">
                <Form.Label>Duration (Minutes)</Form.Label>
                <Form.Control type="number" name="duration" value={formData.duration} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="waitingTime">
                <Form.Label>Waiting Time (Minutes)</Form.Label>
                <Form.Control type="number" name="waitingTime" value={formData.waitingTime} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={8} className="d-flex align-items-end">
              <Button variant="primary" type="submit" className="w-100">Calculate Fare</Button>
            </Col>
          </Row>
        </Form>

        {price !== null && (
          <Alert variant="success" className="mt-3">
            <h4>Total Fare: ₹{price.toFixed(2)}</h4>
          </Alert>
        )}
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Card>
    </Container>
  );
};

export default PriceCalculator;
