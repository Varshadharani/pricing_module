// src/pages/CalculateFarePage.jsx
import React, { useState } from 'react';
import { calculatePrice } from '../services/api';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';

const CalculateFarePage = () => {
  const [formData, setFormData] = useState({
    day: '',
    distanceKM: '',
    duration: '',
    waitingTime: '',
    name: '',
    mobile: '',
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

    const { day, distanceKM, duration, waitingTime } = formData;

    try {
      const res = await calculatePrice({ day, distanceKM, duration, waitingTime });
      if (res.data?.price !== undefined) {console.log("Backend response:", res.data);

        setPrice(res.data.price);
      } else {
        setError('Price not returned from server');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error calculating fare');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h3 className="mb-4">Ride Fare Calculator</h3>
        <Form onSubmit={handleCalc}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Rider Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Day</Form.Label>
                <Form.Control as="select" name="day" value={formData.day} onChange={handleChange} required>
                  <option value="">Select Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Distance (KM)</Form.Label>
                <Form.Control
                  type="number"
                  name="distanceKM"
                  value={formData.distanceKM}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Duration (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Waiting Time (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  name="waitingTime"
                  value={formData.waitingTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Calculate Fare
          </Button>
        </Form>

        {price !== null && !isNaN(price) && (
  <Alert variant="success" className="mt-4">
    <h4>Total Fare for {formData.name}: ₹{Number(price).toFixed(2)}</h4>
    <p><strong>Mobile:</strong> {formData.mobile}</p>
  </Alert>
)}

        {error && (
          <Alert variant="danger" className="mt-4">
            {error}
          </Alert>
        )}
      </Card>
    </Container>
  );
};

export default CalculateFarePage;
