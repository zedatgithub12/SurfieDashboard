import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const Customers = () => {
  return (
    <Container>
      <Row className="m-2 justify-content-md-center">
        <Col sm={2} className="card justify-content-md-center  bg-light shadow-sm border-0  m-2 pt-2">
          <div>
            <h5 className="text-center fw-bold">36</h5>
            <p className="text-center text-success">Active Customers</p>
          </div>
        </Col>

        <Col sm={2} className="card justify-content-md-center bg-light shadow-sm border-0 m-2  pt-2">
          <div>
          <h5 className="text-center fw-bold">26</h5>
            <p className="text-center text-secondary">Monthly Subscribers</p>
          </div>
        </Col>
        <Col sm={2} className="card justify-content-md-center bg-light shadow-sm border-0 m-2  pt-2">
          <div>
          <h5 className="text-center fw-bold">12</h5>
            <p className="text-center text-secondary">Annual Subcribers</p>
          </div>
        </Col>
        
      </Row>

      <Row className="m-auto justify-content-md-center pt-4 pb-0 ">
        <Col sm={2}></Col>
        <Col>
          <p>Customers</p>
        </Col>
        <Col sm={4}></Col>
        <Col>
        <Button
                variant="primary"
           
              >
                Create Account
              </Button>
        </Col>
      </Row>

      <Row>
        <Col sm={2}></Col>
        <Col>
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <Button
                variant="light"
                className="nav-link active"
                aria-current="page"
              >
                Terminated
              </Button>
            </li>
            <li class="nav-item">
              <Button variant="light" className="nav-link">
                Pending
              </Button>
            </li>
            <li class="nav-item">
              <Button variant="light" className="nav-link">
                Expired
              </Button>
            </li>
            <li class="nav-item">
              <Button variant="light" className="nav-link">
                Terminated
              </Button>
            </li>
          </ul>
        </Col>
        <Col sm={1}></Col>
      </Row>





    </Container>
  );
};
