import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

const ChangePassword =()=> {
    
    const navigate=useNavigate();
    const goBack = () => {
      navigate(-1);
    }
    return (
      <Container className="m-3">
        <Row className="m-auto">
          <Col sm={5} className="m-auto p-2 ps-4  bg-white shadow-sm rounded">
            <div>
              <p className="fs-5 fw-bold">Change Password</p>
            </div>

            <form className="m-4">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                 Old Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" class="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                Confirm  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              </form>
              <div className="mb-3 ms-4">
              <button  variant="light" class="btn border-0 bg-light"  onClick={goBack}>
                Back
              </button>
              <button type="submit" variant="success" class="btn ms-3 border-0 bg-success">
                Submit
              </button>
              </div>
          </Col>
        </Row>
      </Container>
    );
  }


export default ChangePassword;
