import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const CustomerDetail = () => {
  return (
    <Container>
      <Row className="m-auto p-4">
        <Col sm={9} className="bg-white m-auto rounded p-3">
          <p className=" fs-5 text-secondary">Customer Detail</p>
          <Row>
            <Col sm={8}>
              <Row className="align-items-center m-2">
                <Col sm={2} className="m-auto">
                  <span className="bg-light p-3 m-auto rounded-circle border">
                    Z
                  </span>
                </Col>
                <Col className="m-0">
                  <p className="text-dark fw-semibold">Zerihun Tegenu</p>
                  <span className="text-secondary">5 device license</span>
                </Col>
              </Row>
              <Row className="p-2 m-1">
                <Col sm={4} className="alighn-items-start">
                  {" "}
                  <span className="text-secondary fw-semibold">
                    Email Address:
                  </span>
                </Col>

                <Col className="alighn-items-start">
                  <span className="text-dark fw-semibold">
                    zerihuntegenu5@gmail.com
                  </span>
                </Col>
              </Row>

              <Row className="p-2 m-1">
                <Col sm={4} className="alighn-items-start">
                  {" "}
                  <span className="text-secondary fw-semibold">
                    Phone Number:
                  </span>
                </Col>

                <Col className="alighn-items-start">
                  <span className="text-dark fw-semibold">+251949000343</span>
                </Col>
              </Row>

              <Row className="p-2 m-1">
                <Col sm={4} className="alighn-items-start">
                  {" "}
                  <span className="text-secondary fw-semibold">
                    Living Address:
                  </span>
                </Col>

                <Col className="alighn-items-start">
                  <span className="text-dark fw-semibold">
                    Bole 22, Addis Ababa, Ethiopia
                  </span>
                </Col>
              </Row>

              <Row className="p-2 m-1">
                <Col sm={4} className="alighn-items-start">
                  {" "}
                  <span className="text-secondary fw-semibold">
                    Subscription Plan:
                  </span>
                </Col>

                <Col className="alighn-items-start">
                  <span className="text-dark fw-semibold">Annual</span>
                </Col>
              </Row>

              <Row className="p-2 m-1">
                <Col sm={4} className="alighn-items-start">
                  {" "}
                  <span className="text-secondary fw-semibold">
                    Subscription Date:
                  </span>
                </Col>

                <Col className="alighn-items-start">
                  <span className="text-dark fw-semibold">12/1/2024 GC</span>
                </Col>
              </Row>

              <Row className="p-2 m-1">
                <Col sm={4} className="alighn-items-start">
                  {" "}
                  <span className="text-secondary fw-semibold">
                    Expire Date:
                  </span>
                </Col>

                <Col className="alighn-items-start">
                  <span className="text-dark fw-semibold">12/1/2024 GC</span>
                </Col>
              </Row>

              <Row className="p-2 m-1">
                <Col sm={4} className="alighn-items-start">
                  {" "}
                  <span className="text-secondary fw-semibold">
                    Payment Method:
                  </span>
                </Col>

                <Col className="alighn-items-start">
                  <span className="text-dark fw-semibold">Cash</span>
                </Col>
              </Row>
            </Col>

            <Col sm={4}>
              <Link to="/" className="btn btn-light text-dark  m-1">
                Add Subscription
              </Link>
              <Link to="/" className="btn btn-light text-dark  m-1">
                Remove Subscription
              </Link>
              <Link to="/" className="btn btn-light text-dark  m-1">
                Deactivate Account
              </Link>
              <Link to="/" className="btn btn-light text-dark btn-block m-1">
                Detach Credentials
              </Link>
              <Link to="/emails" className="btn btn-primary text-white m-1">
                Send Email
              </Link>
            </Col>
          </Row>
          <Row className=" d-flex justify-content-end align-items-end  m-3">
            <Col sm={2} className=" align-items-end  m-3">
              <Link
                to="/customers"
                className="d-flex btn btn-secondary text-white text-center justify-content-center "
              >
                Back
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerDetail;
