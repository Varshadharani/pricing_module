// src/pages/CreateConfigPage.jsx
import React, { useState } from 'react';
import { createConfig } from '../services/api';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';

const CreateConfigPage = () => {
  const [formData, setFormData] = useState({
    day: '',
    basePrice: '',
    additionalPrice: '',
    timeMultiplier: '',
    waitingCharge: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      await createConfig(formData);
      setSuccess('Day-based config created successfully');
      setFormData({
        day: '',
        basePrice: '',
        additionalPrice: '',
        timeMultiplier: '',
        waitingCharge: ''
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Error creating config');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h3 className="mb-4">Create Day-Based Pricing Config</h3>
        <Form onSubmit={handleSubmit}>
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
                <Form.Label>Base Price (INR)</Form.Label>
                <Form.Control
                  type="number"
                  name="basePrice"
                  value={formData.basePrice}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Additional Price per KM (INR)</Form.Label>
                <Form.Control
                  type="number"
                  name="additionalPrice"
                  value={formData.additionalPrice}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Time Multiplier Factor</Form.Label>
                <Form.Control
                  type="number"
                  name="timeMultiplier"
                  value={formData.timeMultiplier}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Waiting Charge (INR per 3 min)</Form.Label>
                <Form.Control
                  type="number"
                  name="waitingCharge"
                  value={formData.waitingCharge}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant="success">Submit Config</Button>
        </Form>

        {success && <Alert variant="success" className="mt-3">{success}</Alert>}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Card>
    </Container>
  );
};

export default CreateConfigPage;
