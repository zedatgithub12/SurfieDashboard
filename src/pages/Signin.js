import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Logo from "../assets/logo.png";
import Connection from "../constants/Connections";
import { AuthContext } from "../components/Context";

const Signin = () => {
  const { SignIn } = React.useContext(AuthContext);
  const loginState = (user, token) => {
    SignIn(user, token);
  }; // the axios methos imported from AuthUser Function inside the component folder
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

  const [loading, setLoading] = useState(false);

  //server reponse states
  const [serverresponse, setServerResponse] = useState({
    visible: false,
    errorMsg: false,
    successMsg: false,
    message: "",
  });
  // const [remember, setRemember] = useState(false); //user session managing state

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

  const getCsrfToken = async () => {
    var Api = Connection.api;
    const response = await fetch(Api + "/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include", // Include cookies in the request
    });
    if (response.ok) {
      const data = await response.json();
      return data.csrf_token;
    }
    throw new Error("Failed to retrieve CSRF token");
  };

  const Validate = async (e) => {
    e.preventDefault();
    setLoading(true);

    var Api = Connection.api + Connection.login;

    const token = await getCsrfToken();
    var headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": token,
    };

    var data = {
      email: credentials.email,
      password: credentials.password,
    };
    fetch(Api, {
      method: "POST",
      credentials: "include",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "succeed") {
          loginState(response.user, response.access_token);
          setServerResponse({
            ...serverresponse,
            visible: true,
            successMsg: true,
            errorMsg: false,
            message: "Successfully signed in!",
          });
          setLoading(false);
        } else if (response.error === "Unauthorized") {
          // setToken(response.user, response.access_token);
          setServerResponse({
            ...serverresponse,
            visible: true,
            successMsg: false,
            errorMsg: true,
            message: "Incorrect username or password!",
          });
          setLoading(false);
        }
      })
      .catch((e) => {
        setServerResponse({
          ...serverresponse,
          visible: true,
          successMsg: false,
          errorMsg: true,
          message: "Error signing, retry later!",
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Container className="m-auto p-5 mt-4 ">
      <Row className="m-auto justify-content-center align-items-center">
        <Col sm={4} className="bg-white shadow-sm p-4 mt-4 rounded">
          <div className="d-flex justify-content-center align-items-center p-4 pt-0">
            <img src={Logo} className="img-fluid w-50 h-50" alt="logo" />
          </div>
          {serverresponse.visible ? (
            <div>
              {serverresponse.successMsg ? (
                <p className="fs-6 fw-normal text-success text-center  p-2 pb-2 pt-2 rounded bg-success bg-opacity-10">
                  {serverresponse.message}
                </p>
              ) : serverresponse.errorMsg ? (
                <p className="fs-6 fw-normal text-danger text-center  p-2 pb-1 pt-1 rounded bg-danger bg-opacity-10">
                  {serverresponse.message}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="form-outline mb-4">
            <label className="form-label" for="form1Example1">
              Email address
            </label>
            <input
              type="email"
              id="form1Example1"
              className="form-control"
              defaultValue={credentials.email}
              onChange={EmailAddress}
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" for="form1Example2">
              Password
            </label>
            <input
              type="password"
              id="form1Example2"
              className="form-control"
              defaultValue={credentials.password}
              onChange={Password}
            />
          </div>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <div
                className="spinner-grow spinner-grow-sm primary-bg "
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <div
                className="spinner-grow spinner-grow-sm primary-bg "
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <div
                className="spinner-grow spinner-grow-sm primary-bg "
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <button
              type="submit"
              variant="primary"
              onClick={Validate}
              className="btn btn-md btn-light primary-bg w-100 fw-semibold"
            >
              Sign in
            </button>
          )}

          <div className="row mt-3">
            {/* <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="form1Example3"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                <label className="form-check-label" for="form1Example3">
                  Remember me
                </label>
              </div>
            </div> */}

            <div className="col">
              <a href="#!">Forgot password?</a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;
