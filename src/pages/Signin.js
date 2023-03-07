import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Signin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    emailvalid: "",
    emailerr: false,
    emailborder: "",
    emailerrmsg: "",

    password: "",
    passwordvalid: "",
    passworderr: false,
    passwordborder: "",
    passworderrmsg: "",

    serverresponse: "",
    showresponse: false,
  });


  const [remember, setRemember] = useState(false);



  const EmailAddress = (event) => {
    setCredentials({
      ...credentials,
      email: event.target.value,
    });
  };

  const Password = (event) => {
    setCredentials({
      ...credentials,
      password: event.target.value,
    });
  };

  const Validate = () => {
    console.log(credentials.email+ " "+ " " +credentials.password);
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center">
        <Col sm={4} className="m-auto bg-white shadow-sm p-4 mt-4 rounded">
          <form onSubmit={Validate}>
            <div className="form-outline mb-4">
              <input
                type="email"
                id="form1Example1"
                className="form-control"
                defaultValue={credentials.email}
                onChange={EmailAddress}
              />
              <label className="form-label" for="form1Example1">
                Email address
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                id="form1Example2"
                className="form-control"
                defaultValue={credentials.password}
                onChange={Password}
              />
              <label className="form-label" for="form1Example2">
                Password
              </label>
            </div>

            <div className="row mb-4">
              <div className="col d-flex justify-content-center">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form1Example3"
                    checked={remember}
                    onChange={()=>setRemember(!remember)}
                  />
                  <label className="form-check-label" for="form1Example3">
                    {" "}
                    Remember me{" "}
                  </label>
                </div>
              </div>

              <div className="col">
                <a href="#!">Forgot password?</a>
              </div>
            </div>

            <button type="submit"  className="btn btn-primary btn-block">
              Sign in
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;
