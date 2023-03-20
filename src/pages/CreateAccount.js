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
import Sidebar from "../components/Sidebar";
import Modal from "react-bootstrap/Modal";
import Constants from "../constants/Constants";

function CreateAccount() {
  const [loading, setLoading] = useState(false);
  const [license, setLicense] = useState("Select License");
  const [Period, setPeriod] = useState("monthly");
  const [showpass, setShowPass] = useState(false);
  const [selected, setSelected] = useState({
    checked: false,
    active: "",
  });

  const navigate = useNavigate();
  const [input, setInput] = useState({
    firstname: "",
    firsths: false,
    firstht: "",

    middlename: "",
    middlehs: false,
    middleht: "",

    lastname: "",
    latshs: false,
    lastht: "",

    emailaddress: "",
    emailhs: false,
    emailht: "",

    phone: "",
    phonehs: false,
    phoneht: "",

    address: "",
    addresshs: false,
    addressht: "",

    username: "",
    usernamehs: false,
    usernameht: "",

    password: "",
    passwordhs: false,
    passwordht: "",

    confirmpassword: "",
    confirmhs: false,
    confirmht: "",


    errormessage: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  // the phone number to be sent to puresight
  //which a character at the start of phone number shouldn't contain any special character

  const MakeitPhone = (phone) => {
    var FirstChar = phone.charAt(0);
    var Phoneno = phone;
    var ccode = "251";

    if (FirstChar === "+") {
      Phoneno = phone.slice(1, phone.length - 1);
    } else if (FirstChar === 0) {
      Phoneno = parseInt(ccode) + phone.slice(1, phone.length - 1);
    }

    return Phoneno;
  };


  const Pricing = (license)=>{
    var price;
    switch(license){
  
        case 10:
          price = 450;
          break;
          case 15:
          price=600;
           break;
           default: 
           price=300;
              break;
    }
    return price
  }
  //validate user input when user pressed submit button
  const ValidateInput = () => {
    var packages = `AFROMINA_${license}`; //packages id to be sent to puresight
 

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
    } else if (input.password !== input.confirmpassword) {
      setInput({
        ...input,
        errormessage: "Password you entered doesn't match",
        confirmhs: true,
        confirmht: "Password you entered doesn't match" 
      });
      document.getElementById("form8").focus();
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
      var RemoteApi = Connection.remote+ `CreateAccountWithPackageId.py?adminUser=${Constants.user}&adminPassword=${Constants.password}&email=${input.emailaddress}&phoneNumber=${MakeitPhone(input.phone)}&packageId=${packages}&subscriptionId=1&externalRef=AFROMINA`;

      fetch(RemoteApi,{
        mode: "no-cors",
      })
      .then((res)=>res.text())
      .then((res) => {
        let parser = new DOMParser();
        let xml = parser.parseFromString(res, "application/xml");
        // var status = xml.getElementsByTagName("AddSubscription").getElementById('id');
        console.log(xml);

          if (res.Status.id === 0) {
        setLoading(true);
      var Api = Connection.api + Connection.customers; // update this line of code to the something like 'http://localhost:3000/customers?_page=${currentPage}&_limit=${limit}
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };
      const data = {
        remote_id: res.Account.account_id,
        firstname: input.firstname,
        middlename: input.middlename,
        lastname: input.lastname,
        emailaddress: input.emailaddress,
        phone: MakeitPhone(input.phone),
        address: input.address,
        username: input.username,
        password: input.password,
        subscription: Period,
        license: license,
        price: Pricing(license),
        payment: selected.active,
        status: 0,
      };

      fetch(Api, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response === "succeed") {
            setInput({
              ...input,
              errormessage: "Successfully Created!",
            });
            handleShow();
            setLoading(false);
          } else {
            setInput({
              ...input,
              errormessage: "error creating account!",
            });
            
            setLoading(false);
          }
        });
      } else if (res.Status.id === 1001) {
        setInput({
          ...input,
          errormessage: "Error Missing Parameter!",
        });
       
      } else if (res.Status.id === 1002) {
        setInput({
          ...input,
          errormessage: "Invalid Username or Password!",
        });
     
      } else if (res.Status.id === 1004) {
         setInput({
          ...input,
          errormessage: "Invalid Package Id!",
        });
      }
      else if (res.Status.id === 2021) {
        setInput({
          ...input,
          errormessage: "Email already exist!",
        });
      }
       else if (res.Status.id === 2022) {
        setInput({
          ...input,
          errormessage: "Phone number already exist!",
        });
  
      } else {
       
        setInput({
          ...input,
          errormessage: "Invalid response!",
        });
      }
        }
      ).catch((e)=>{
        console.log(e);
      })
    }

    return true;
  };

  
  return (
    <>
      <Sidebar />
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

                              <MDBCol
                                sm="6"
                                className="d-flex position-relative"
                              >
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
                                      : license + " License"}
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu variant="light" id="licenses">
                                    <Dropdown.Item
                                      onClick={() => setLicense(0)}
                                    >
                                      Select Package
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => setLicense(5)}
                                    >
                                      5 License
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => setLicense(10)}
                                    >
                                      10 License
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => setLicense(15)}
                                    >
                                      15 License
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
                                      onClick={() => setPeriod("monthly")}
                                    >
                                      Monthly
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() => setPeriod("annual")}
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
                                      width="50"
                                      height="50"
                                      alt="icon"
                                      className="rounded m-1"
                                    />
                                    <div className="d-flex text-center cursor-pointer">
                                      <FormCheck
                                        aria-label="checkbox"
                                        checked={
                                          selected.active === item.id
                                            ? true
                                            : false
                                        }
                                        onChange={() => Select(item.id)}
                                        className="align-self-start me-2 "
                                      />
                                      {item.name}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </MDBRow>
                        </MDBCol>
                      </MDBRow>
                      <div className="d-flex justify-content-end align-items-center pt-3 p-3">
                        <p className="text-danger mx-4 text-center m-auto justify-content-center align-items-center">
                          {input.errormessage}
                        </p>

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
                          variant="light"
                          size="md"
                          className="ms-3 primary-bg border-0 px-5"
                          onClick={() => ValidateInput()}
                          disabled={loading ? true : false}
                        >
                          {loading ? (
                            <div
                              class="spinner-border spinner-border-sm text-secondary"
                              role="status"
                            >
                              <span class="visually-hidden">Loading...</span>
                            </div>
                          ) : (
                            <span>Create Account</span>
                          )}
                        </Button>
                      </div>
                    </form>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </Col>
        </Row>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton/>
          <Modal.Body>
     
          <Row>
          <Col
            sm={10}
            className=" text-center align-items-center justify-content-center  m-auto p-3  mt-2 mb-1 "
          >
            <BsCheckCircle size={66} className="text-success m-3" />
            <p className="fs-5 ">Successfully Created</p>
            <p className="fs-6 ">We have sent you an email check your inbox</p>
         
            <Row className="d-flex justify-content-evenly align-items-center m-auto mt-5 w-50">
              <Col>
                <Link
                  onClick={() => handleClose()}
                  to="/createaccount"
                  variant="light"
                  className="
                d-flex justify-content-center align-items-center
                btn btn-light
                text-decoration-none text-dark fw-semibold "
                >
                  Back
                </Link>
              </Col>

              <Col>
                <Link
                  to="/customers"
                  variant = "light"
                  className="
                d-flex justify-content-evenly align-self-center
                text-decoration-none text-dark btn primary-bg text-dark "
                >
                  Home
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
        </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default CreateAccount;
