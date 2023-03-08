import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Button, FormCheck } from "react-bootstrap";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

import Dropdown from "react-bootstrap/Dropdown";
import Gateways from "../data/PaymentGateways";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import Connection from "../constants/Connections";

function CreateAccount() {
  const [created, setCreated] = useState(false);
  const [index, setIndex] = useState(1);
  const [license, setLicense] = useState("Select License");
  const [Period, setPeriod] = useState("Monthly");
  const [showpass, setShowPass] = useState(false);
  const [selected, setSelected] = useState({
    checked: false,
    active: "",
  });

  const navigate = useNavigate();

  const [input, setInput] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    emailaddress: "",
    phone: "",
    address: "",
    username: "",
    password: "",
    confirmpassword: "",

    errormessage: "",
  });

  //update first name
  const UpdateFname = (event) => {
    setInput({
      ...input,
      firstname: event.target.value,
    });
  };

  //update middle name
  const UpdateMname = (event) => {
    setInput({
      ...input,
      middlename: event.target.value,
    });
  };

  //update first name
  const UpdateLname = (event) => {
    setInput({
      ...input,
      lastname: event.target.value,
    });
  };

  //update email address
  const UpdateEmail = (event) => {
    setInput({
      ...input,
      emailaddress: event.target.value,
    });
  };

  //update phone name
  const UpdatePhone = (event) => {
    setInput({
      ...input,
      phone: event.target.value,
    });
  };

  //update address
  const UpdateAddress = (event) => {
    setInput({
      ...input,
      address: event.target.value,
    });
  };

  //update username
  const UpdateUsername = (event) => {
    setInput({
      ...input,
      username: event.target.value,
    });
  };

  //update  password
  const UpdatePassword = (event) => {
    setInput({
      ...input,
      password: event.target.value,
    });
  };

  //update phone name
  const UpdateConfirmPass = (event) => {
    setInput({
      ...input,
      confirmpassword: event.target.value,
    });
  };

  const Select = (id) => {
    setSelected({
      ...selected,
      active: id,
    });
  };

  //validate user input when user pressed submit button

  const ValidateInput = () => {
    if (
      input.firstname === "" ||
      input.middlename === "" ||
      input.lastname === "" ||
      input.emailaddress === "" ||
      input.phone === "" ||
      input.username === "" ||
      input.password === "" ||
      input.confirmpassword === ""
    ) {
      setInput({
        ...input,
        errormessage: "Please fill all form",
      });
      return false;
    } else if (input.password != input.confirmpassword) {
      setInput({
        ...input,
        errormessage: "Password you entered doesn't match",
      });
      var Focus = document.getElementById("form8").focus();
      return false;
    } else if (license === "Select License") {
      setInput({
        ...input,
        errormessage: "Please Select License",
      });

      document.getElementById("licenses").focus();

      return false;
    } else if (selected.active === "") {
      setInput({
        ...input,
        errormessage: "Please select payment option!",
      });

      return false;
    } else {
      var Api = Connection.api + Connection.customers; // update this line of code to the something like 'http://localhost:3000/customers?_page=${currentPage}&_limit=${limit}
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };
      const data = {
        firstname: input.firstname,
        middlename: input.middlename,
        lastname: input.lastname,
        emailaddress: input.emailaddress,
        phone: input.phone,
        address: input.address,
        username: input.username,
        password: input.password,
        subscription: Period,
        license: license,
        payment: selected.active,
        status: 1,
      };
      console.log(data);
      fetch(Api, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.Status === "200") {
            setInput({
              ...input,
              errormessage: "Successfully Created!",
            });
            console.log("reposnse" + response);
          } else {
            setInput({
              ...input,
              errormessage: "We have issue creating account",
            });
            console.log("else" + response);
          }
        });
    }
    return true;
  };

  if (created) {
    return (
      <Container>
        <Row>
          <Col
            sm={10}
            className=" text-center align-items-center justify-content-center h-100 bg-white m-auto p-4  mt-4 mb-3 rounded shadow-sm"
          >
            <BsCheckCircle size={66} className="text-success m-3" />
            <p className="fs-5 ">Successfully Created</p>

            <Row className="d-flex justify-content-evenly align-items-center m-auto mt-5 w-50">
              <Col>
                <Link
                  onClick={() => setCreated(!created)}
                  to="/createaccount"
                  variant="light"
                  className="
                d-flex justify-content-center align-items-center
                btn btn-light
                text-decoration-none text-success fw-semibold "
                >
                  Back
                </Link>
              </Col>

              <Col>
                <Link
                  to="/customers"
                  className="
                d-flex justify-content-evenly align-self-center
                text-decoration-none text-dark btn btn-success text-white bg-gradient "
                >
                  Home
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col
          sm={10}
          className="bg-white m-auto p-4 pb-0 mt-4 mb-3 rounded shadow-sm"
        >
          <MDBContainer className="bg-white">
            <MDBRow
              sm={10}
              className="d-flex justify-content-center align-items-center h-100 "
            >
              <MDBCol>
                <MDBCard className="my-4 ">
                  <form className="needs-validation">
                    <MDBRow className="g-0">
                      <MDBCol sd="6">
                        <MDBCardBody className="text-black d-flex flex-column justify-content-center ">
                          <h4 className="mb-4 text-uppercase fw-bold">
                            Create Account
                          </h4>

                          <MDBRow>
                            <p className="fw-semibold text-primary">
                              Add User Information
                            </p>
                            <MDBCol sm="6">
                              <MDBInput
                                wrapperClass="mb-2"
                                label="First Name"
                                size="md"
                                id="form1"
                                type="text"
                                required
                                defaultValue={input.firstname}
                                onChange={UpdateFname}
                              />
                            </MDBCol>

                            <MDBCol sm="6">
                              <MDBInput
                                wrapperClass="mb-2"
                                label="Middle Name"
                                size="md"
                                id="form2"
                                type="text"
                                required
                                defaultValue={input.middlename}
                                onChange={UpdateMname}
                              />
                            </MDBCol>
                          </MDBRow>
                          <MDBInput
                            wrapperClass="mb-2"
                            label="Last Name"
                            size="md"
                            id="form9"
                            type="text"
                            required
                            defaultValue={input.lastname}
                            onChange={UpdateLname}
                          />
                          <MDBRow>
                            <MDBCol sm="6">
                              <MDBInput
                                wrapperClass="mb-2"
                                label="Email Address"
                                size="md"
                                id="form3"
                                type="email"
                                required
                                defaultValue={input.emailaddress}
                                onChange={UpdateEmail}
                              />
                            </MDBCol>

                            <MDBCol sm="6">
                              <MDBInput
                                wrapperClass="mb-2"
                                label="Phone"
                                size="md"
                                id="form4"
                                type="phone"
                                required
                                defaultValue={input.phone}
                                onChange={UpdatePhone}
                              />
                            </MDBCol>
                          </MDBRow>

                          <MDBInput
                            wrapperClass="mb-2"
                            label="Living Address"
                            size="md"
                            id="form5"
                            type="address"
                            defaultValue={input.address}
                            onChange={UpdateAddress}
                          />

                          <p className="fw-semibold text-primary mt-3">
                            User Credentials
                          </p>
                          <hr className="text-primary mt-0" />

                          <MDBInput
                            wrapperClass="mt-2 mb-1"
                            label="Username"
                            size="md"
                            id="form6"
                            type="text"
                            required
                            defaultValue={input.username}
                            onChange={UpdateUsername}
                          />
                          <MDBRow>
                            <MDBCol sm="6">
                              <MDBInput
                                wrapperClass="mb-2"
                                label="Password"
                                size="md"
                                id="form7"
                                type={showpass ? "text" : "password"}
                                required
                                defaultValue={input.password}
                                onChange={UpdatePassword}
                              />
                            </MDBCol>

                            <MDBCol sm="6" className="d-flex position-relative">
                              <MDBInput
                                wrapperClass={input.passmatch + "mb-4"}
                                label="Confirm Password"
                                size="md"
                                id="form8"
                                type={showpass ? "text" : "password"}
                                required
                                defaultValue={input.confirmpassword}
                                onChange={UpdateConfirmPass}
                              />
                              <Button
                                title="show password"
                                onClick={() => setShowPass(!showpass)}
                                variant="white"
                                className="position-absolute end-0 text-center  bg-success bg-gradient text-white rounded-0 rounded-end border-3  me-2 "
                              >
                                {showpass ? (
                                  <AiOutlineEye
                                    size={18}
                                    className="me-1 pb-1"
                                  />
                                ) : (
                                  <AiOutlineEyeInvisible
                                    size={18}
                                    className="me-1 pb-1"
                                  />
                                )}
                              </Button>
                            </MDBCol>
                          </MDBRow>

                          <MDBRow>
                            <MDBCol>
                              <Dropdown size="md">
                                <Dropdown.Toggle
                                  variant="light"
                                  title="Licenses"
                                  className="text-dark border m-0 me-5 fw-semibold font-link"
                                >
                                  {license === "Select License"
                                    ? "Select License"
                                    : license + " " + "License"}
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="light" id="licenses">
                                  <Dropdown.Item onClick={() => setLicense(0)}>
                                    Select Package
                                  </Dropdown.Item>
                                  <Dropdown.Item onClick={() => setLicense(1)}>
                                    1 License
                                  </Dropdown.Item>
                                  <Dropdown.Item onClick={() => setLicense(3)}>
                                    3 License
                                  </Dropdown.Item>
                                  <Dropdown.Item onClick={() => setLicense(5)}>
                                    5 License
                                  </Dropdown.Item>
                                  <Dropdown.Item onClick={() => setLicense(10)}>
                                    10 License
                                  </Dropdown.Item>
                                  <Dropdown.Item onClick={() => setLicense(20)}>
                                    20 License
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </MDBCol>

                            <MDBCol>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="light"
                                  title="1 License"
                                  id="dropdown-basic"
                                  className="bg-success bg-gradient border-0 text-white fw-medium font-link"
                                >
                                  {Period}
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="light">
                                  <Dropdown.Item
                                    onClick={() => setPeriod("Monthly")}
                                  >
                                    Monthly
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() => setPeriod("Annual")}
                                  >
                                    Annual
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </MDBCol>
                          </MDBRow>
                        </MDBCardBody>
                      </MDBCol>

                      <MDBCol
                        md="10"
                        lg="6"
                        className="order-1 order-lg-2 border-start-1 align-items-center"
                      >
                        <MDBRow className="mt-5 pt-5">
                          <MDBCardImage
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                            className="img-fluid"
                          />
                        </MDBRow>

                        <MDBRow className="mt-5 pt-1">
                          <MDBCol>
                            <p className="fw-semibold text-primary ps-3">
                              Choose payment method
                            </p>
                            <hr className="text-primary mt-0 ms-3" />
                          </MDBCol>
                        </MDBRow>

                        <MDBRow>
                          <div className="m-4 d-flex justify-content-center align-items-center">
                            {Gateways.map((item) => (
                              <div
                                key={item.id}
                                className={
                                  selected.active === item.id
                                    ? " d-flex m-1 border rounded p-2 pt-2 pb-0 border-success align-items-center justify-content-center cursor-pointer"
                                    : "d-flex   m-1 border rounded p-2 pt-2 pb-0  align-items-center justify-content-center cursor-pointer "
                                }
                                onClick={() => Select(item.id)}
                              >
                                <div className="m-2 mt-0 mb-0 justify-content-center ">
                                  <img
                                    src={item.icon}
                                    fluid
                                    width="50"
                                    height="50"
                                    alt="icon"
                                    className="rounded m-1"
                                  />
                                  <p className="d-flex text-center cursor-pointer">
                                    <FormCheck
                                      aria-label="Radio button for following text input"
                                      checked={
                                        selected.active === item.id
                                          ? true
                                          : false
                                      }
                                      onChange={() => Select(item.id)}
                                      className="align-self-start me-2 "
                                    />
                                    {item.name}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </MDBRow>
                      </MDBCol>
                    </MDBRow>
                    <div className="d-flex justify-content-end align-items-center pt-3 p-3">
                      <div className="d-flex justify-content-center align-items-center pt-3 p-3 mt-1">
                        <caption className="text-danger">
                          {input.errormessage}
                        </caption>
                      </div>
                      <Button
                        variant="light"
                        size="md"
                        onClick={() => navigate("/customers")}
                      >
                        <Link
                          to="/customers"
                          variant="success"
                          className="font-link text-dark text-decoration-none  "
                        >
                          Back
                        </Link>
                      </Button>

                      <Button
                        type="button"
                        variant="warning"
                        size="md"
                        className="ms-3"
                        onClick={() => ValidateInput()}
                      >
                        Create Account
                      </Button>
                    </div>
                  </form>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateAccount;
