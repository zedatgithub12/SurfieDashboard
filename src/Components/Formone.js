import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from "react-bootstrap/InputGroup";

class Formone extends Component {
  render() {
    return (
      <div>
        <InputGroup className="mb-3 mt-5">
        <Form.Control className="m-2 rounded font-link border-success" placeholder="First name" aria-label="First name" />
          <Form.Control className="m-2 rounded font-link border-success" placeholder="Middle name" aria-label="Middle name" />
          <Form.Control className="m-2 rounded font-link border-success" placeholder="Last name" aria-label="Last name" />
        </InputGroup>

        <InputGroup className="mb-3 mt-3">
        <Form.Control className="m-2 rounded font-link border-success" placeholder="Email Address" aria-label="First name" />
          <Form.Control className="m-2 rounded font-link border-success" placeholder="Phone Number" aria-label="Middle name" />
         
        </InputGroup>

        <InputGroup className="mb-3 mt-3">
        <Form.Control className="m-2 rounded font-link border-success" placeholder="Living Address" aria-label="First name" />
        </InputGroup>
      
      </div>
    );
  }
}

export default Formone;
