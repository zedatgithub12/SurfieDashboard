import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AuthUser from "../components/AuthUser";

const Signin = () => {
  const { http } = AuthUser(); // the axios methos imported from AuthUser Function inside the component folder
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
    // http.post('/login',
    // {email: credentials.email,
    //   password: credentials.password,
    // }).then((res)=>{
    //   console.log(res.data);
    // }) .catch(function (error) {
    //   console.log(error);
    // });

    var Api = "http://127.0.0.1:8000/api/login";
    var headers = {
      accept: "application/json",
      "Content-Type": "application/json",
    };

    var data = {
      email: credentials.email,
      password: credentials.password,
    };
    fetch(Api, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "200") {
          console.log("reposnse" + response.status);
        } else {
          console.log(response.status);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    console.log(credentials.email + " " + " " + credentials.password);
  };

  return (
    <Container className="m-4">
      <Row className="justify-content-center pt-5">
        <Col sm={4} className="m-auto bg-white shadow-sm p-4 mt-4 rounded">
          <div className="form-outline mb-4">
            <input
              type="email"
              id="form1Example1"
              className="form-control"
              defaultValue={credentials.email}
              onChange={EmailAddress}
            />
            {/* <label className="form-label" for="form1Example1">
                Email address
              </label> */}
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="form1Example2"
              className="form-control"
              defaultValue={credentials.password}
              onChange={Password}
            />
            {/* <label className="form-label" for="form1Example2">
                Password
              </label> */}
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
                  onChange={() => setRemember(!remember)}
                />
                {/* <label className="form-check-label" for="form1Example3">
                    {" "}
                    Remember me{" "}
                  </label> */}
              </div>
            </div>

            <div className="col">
              <a href="#!">Forgot password?</a>
            </div>
          </div>

          <button
            type="button"
            onClick={Validate}
            className="btn btn-primary btn-block"
          >
            Sign in
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;
