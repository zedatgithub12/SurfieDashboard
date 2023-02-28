import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Customers = () => {
  return (
    <Container>
      <Row className="m-4">
        <Col sm={3} className="card justify-content-md-center m-2 p-3">
          <div>
            <h2 className="text-center fw-bold">36</h2>
            <p className="text-center">Active Clients</p>
          </div>
        </Col>

        <Col sm={3} className="card justify-content-md-center m-2 o p-3">
          <div>
            <h2 className="text-center fw-bold">23</h2>
            <p className="text-center">Monthly Subscribers</p>
          </div>
        </Col>
        <Col sm={3} className="card justify-content-md-center m-2  p-3">
          <div>
            <h2 className="text-center fw-bold">12</h2>
            <p className="text-center">Annual Subcribers</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
