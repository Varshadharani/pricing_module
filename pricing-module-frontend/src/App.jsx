import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Home from '../src/pages/Home';
import CreateConfig from './pages/CreateConfigPage';
import CalculateFare from './pages/CalculateFarePage';

const App = () => (
  <Router>
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Pricing Module</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/create-config">Create Config</Nav.Link>
          <Nav.Link as={Link} to="/calculate">Calculate Fare</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <Container className="mt-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-config" element={<CreateConfig />} />
        <Route path="/calculate" element={<CalculateFare />} />
      </Routes>
    </Container>
  </Router>
);

export default App;
