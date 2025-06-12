import React, { useState } from 'react';
import { createConfig } from '../services/api';
import { Form, Button, Alert, Container } from 'react-bootstrap';

const CreateConfig = () => {
  const [data, setData] = useState({ day: '', baseAmount: '', baseKM: '', additionalPerKM: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      const configData = {
        day: data.day,
        distanceBasePrice: { amount: Number(data.baseAmount), uptoKM: Number(data.baseKM) },
        distanceAdditionalPrice: { perKM: Number(data.additionalPerKM) }
      };

      await createConfig(configData);
      setSuccess('Configuration created successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create config.');
    }
  };

  return (
    <Container className="mt-4">
      <h3>Create Day-Based Configuration</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Day</Form.Label>
          <Form.Control as="select" name="day" value={data.day} onChange={handleChange} required>
            <option value="">Select Day</option>
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day =>
              <option key={day} value={day}>{day}</option>
            )}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Base Price (INR)</Form.Label>
          <Form.Control type="number" name="baseAmount" value={data.baseAmount} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Up to KM</Form.Label>
          <Form.Control type="number" name="baseKM" value={data.baseKM} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Additional Price Per KM</Form.Label>
          <Form.Control type="number" name="additionalPerKM" value={data.additionalPerKM} onChange={handleChange} required />
        </Form.Group>

        <Button variant="success" type="submit">Submit Config</Button>

        {success && <Alert variant="success" className="mt-3">{success}</Alert>}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Form>
    </Container>
  );
};

export default CreateConfig;
