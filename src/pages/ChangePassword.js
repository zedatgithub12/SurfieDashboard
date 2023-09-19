import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Connection from "../constants/Connections";

const ChangePassword = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [state, setState] = useState({
    loading: false,

    oldpassword: "",
    oldPassState: false,
    oldPassb: false,
    oldPasserrmsg: "",

    newpassword: "",
    newPassb: false,
    newPassState: false,
    newPasserrmsg: "",

    confirmpassword: "",
    confirmPassb: false,
    confirmPassState: false,
    confirmPasserrmsg: "",

    error: false,
    errorMessage: "",
  });

  //update  old password field
  const UpdateOldPassword = (event) => {
    setState({
      ...state,
      oldpassword: event.target.value,
    });
  };

  //update  password field
  const UpdatePassword = (event) => {
    setState({
      ...state,
      newpassword: event.target.value,
    });
  };

  //update Confirm password field
  const UpdateConfirmPass = (event) => {
    setState({
      ...state,
      confirmpassword: event.target.value,
    });
    if (state.confirmpassword === state.newpassword) {
      setState({
        ...state,
        confirmPassState: false,
        confirmPassb: false,
        confirmPasserrmsg: "",
      });
    }
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

  const SubmitChange = async () => {
    if (state.oldpassword === "") {
      setState({
        ...state,
        oldPassState: true,
        oldPassb: true,
        oldPasserrmsg: "Please enter your previous password!",
      });
      return false;
    } else if (state.newpassword === "") {
      setState({
        ...state,
        newPassState: true,
        newPassb: true,
        newPasserrmsg: "Enter new password!",
      });
      return false;
    } else if (state.confirmpassword === "") {
      setState({
        ...state,
        confirmPassState: true,
        confirmPassb: true,
        confirmPasserrmsg: "Confirm new password!",
      });
      return false;
    } else if (state.newpassword !== state.confirmpassword) {
      setState({
        ...state,
        confirmPassState: true,
        confirmPassb: true,
        confirmPasserrmsg: "Password Doesn't match!",
      });
      return false;
    } else if (
      state.oldpassword !== "" &&
      state.newpassword === state.confirmpassword
    ) {
      setState({
        ...state,
        confirmPassState: false,
        confirmPassb: false,
        confirmPasserrmsg: "",
      });

      // the api call code is going to be written here

      alert("all is well");
    }
  };

  const [showpass, setShowPass] = useState(false);
  return (
    <>
      <Sidebar />
      <Container className="m-auto mt-4 ">
        <Row className="m-auto ">
          <Col
            sm={5}
            className="m-auto  p-2 ps-2  bg-white shadow-sm border rounded"
          >
            <div>
              <p className="fs-5 fw-bold ms-4 mt-2">Change Password</p>
            </div>
            {state.error ? (
              <div id="emailHelp" className="text-danger form-text ms-4 mt-3">
                {state.errorMessage}
              </div>
            ) : null}

            <form className="m-4 needs-validation" novalidate>
              <div class="mb-3">
                <label
                  for="exampleInputEmail1"
                  className="form-label form-text"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  className={
                    state.oldPassb
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  defaultValue={state.oldpassword}
                  onChange={UpdateOldPassword}
                  required
                />
                {state.oldPassState ? (
                  <div id="emailHelp" className="text-danger form-text">
                    {state.oldPasserrmsg}
                  </div>
                ) : null}
              </div>

              <div class="mb-3">
                <label
                  for="exampleInputPassword2"
                  className="form-label form-text"
                >
                  New Password
                </label>
                <input
                  className={
                    state.newPassb
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  id="exampleInputPassword2"
                  type={showpass ? "text" : "password"}
                  required
                  defaultValue={state.newpassword}
                  onChange={UpdatePassword}
                />

                {state.newPassState ? (
                  <div id="emailHelp" className="text-danger form-text">
                    {state.newPasserrmsg}
                  </div>
                ) : null}
              </div>

              <label for="exampleInputPassword3" class="form-label form-text">
                Confirm Password
              </label>
              <div class="mb-3 input-group">
                <input
                  className={
                    state.confirmPassb
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  id="exampleInputPassword3"
                  type={showpass ? "text" : "password"}
                  required
                  defaultValue={state.confirmpassword}
                  onChange={UpdateConfirmPass}
                />

                <Button
                  title="show password"
                  onClick={() => setShowPass(!showpass)}
                  variant="white"
                  className="text-center  bg-success bg-gradient text-white rounded-0 rounded-end border-3  me-2 "
                >
                  {showpass ? (
                    <AiOutlineEye size={18} className="me-1 pb-1" />
                  ) : (
                    <AiOutlineEyeInvisible size={18} className="me-1 pb-1" />
                  )}
                </Button>
              </div>
              {state.confirmPassState ? (
                <div id="emailHelp" className="text-danger form-text">
                  {state.confirmPasserrmsg}
                </div>
              ) : null}
              <div className="mb-2 mt-4">
                <Button
                  variant="light"
                  className="btn border-0 bg-light"
                  onClick={goBack}
                >
                  Back
                </Button>
                <Button
                  size="md"
                  variant="light"
                  className="btn ms-3 border-0 bg-success"
                  onClick={() => SubmitChange()}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChangePassword;
