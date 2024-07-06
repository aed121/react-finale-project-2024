import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Favorites from './components/Favorites';
import WorkerDetails from './components/WorkerDetails';  
import { Navbar, Nav, Image } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar className="navbar-custom" expand="lg">
          <Navbar.Brand as={Link} to="/">Employee Directory</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Image src="/worker.png" roundedCircle width="40" height="40" alt="worker" />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/employee/:id" element={<WorkerDetails />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
