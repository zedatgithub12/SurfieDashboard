import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Formone from "../components/Formone";
import Formtwo from "../components/Formtwo";
import Formthree from "../components/Formthree";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function CreateAccount() {
  const [index, setIndex] = useState(1);

  return (
    <Container>
      <Row>
        <Col sm={9} className="bg-white m-auto p-4 mt-4 rounded shadow-sm">
          <Row>
            <Col sm={3}>
              <h5 className="text-secondary font-link"> Create Account</h5>
            </Col>
            <Col
              sm={6}
              className="d-flex justify-content-center align-items-end"
            >
              {" "}
              <Row>
                <span>
                  <span className="border font-link rounded-circle p-3 fs-6 fw-bold">
                    1
                  </span>
                  <span>---------------</span>
                  <span>2</span>
                  <span>---------------</span>
                  <span>3</span>
                </span>
              </Row>
            </Col>

            <Col className="d-flex justify-content-end align-items-end  ">
              <Link to="/" className="font-link text-decoration-none fw-semibold">
                Sign in
              </Link>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              {index == 1 ? (
                <Formone />
              ) : index == 2 ? (
                <Formtwo />
              ) : (
                <Formthree />
              )}
            </Col>
          </Row>

          <Row className="d-flex justify-content-end">
            {index > 1 ? (
              <Col sm={2} className="d-flex justify-content-end m-2 mt-0">
                <Button className="btn btn-md btn-light font-link" onClick={() => setIndex(index - 1)}>Back</Button>
              </Col>
            ) : null}


            <Col sm={1} className="d-flex m-2 mt-0 justify-content-end font-link">
              <Button onClick={() => setIndex(index + 1)}>Next</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateAccount;
