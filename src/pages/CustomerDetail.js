import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar";


const CustomerDetail = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const { state } = useLocation();

  //modal dynamic attributes
  const [initialValue, setInitialValue] = useState({
    title: "",
    currentPlan: "",
    updatedInfo: "",
    operation: "",
    cofirmationtxt: "",
  });

  //modal dropdown license listing states
  const [license, setLicense] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [confirm, setConfirm] = useState(false);

  const DateSlice = (date) => {
    var year = date.slice(0, 4);
    var month = date.slice(5, 7);
    var day = date.slice(8, 10);
    return day + "/" + month + "/" + year;
  };

  //calculate and return the license expire date
  const ExpireDate = (date, plan) => {
    var year = date.slice(0, 4);
    var month = date.slice(5, 7);
    var day = date.slice(8, 10);

    if (plan == 1) {
      month = parseInt(month) +1;
    } else {
       year = parseInt(year) +1;
    }

    return day + "/" + month + "/" + year;
  };

const Payment=(mode)=>{
   var gateway;

  switch(mode){
    case 1000:
      gateway="With Cash";
      break;
      case 1001:
        gateway = "Chapa";
        break;
        case 1002:
          gateway= "Telebirr";
          break;
          default: 
          gateway="With Cash";
  }


  return gateway;
}
  

  const OpenDialog = (item, operation) => {
    var info = operation === "add" ? "Upgrade to" : "Downgrade to";

    if (operation === "add") {
      setConfirm(false);
      setInitialValue({
        ...initialValue,
        title: "Add Subscription",
        currentPlan: item.license,
        updatedInfo: info,
        operation: operation,
      });
      setLicense(item.license);
      handleShow();
    } else if (operation === "remove") {
      setConfirm(false);
      setInitialValue({
        ...initialValue,
        title: "Remove Subscription",
        currentPlan: item.license,
        updatedInfo: info,
        operation: operation,
      });
      setLicense(item.license);
      handleShow();
    }
    //when the user clicked deactivate account button from dropdown
    else if (operation === "deactivate") {
      setConfirm(true);
      setInitialValue({
        ...initialValue,
        title: "Deactivate Account!",
        cofirmationtxt:
          "Are you sure do you want to deactivate this user account!",
        operation: operation,
      });
      setLicense(item.license);
      handleShow();
    } else {
      setConfirm(true);
      setInitialValue({
        ...initialValue,
        title: "Detach Credentials",
        cofirmationtxt:
          "Are you sure do you want to Detach this user credentials!",
        operation: operation,
      });
      setLicense(item.license);
      handleShow();
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <Sidebar />
      <Container>
        <Row className="m-auto p-4">
          <Col sm={9} className="bg-white mt-3  m-auto rounded p-4 shadow-sm ">
            <Row className="border rounded m-2">
              <h4 className="mb-2 ps-2 m-2 mt-3 text-uppercase fw-bold">
                Customer Detail
              </h4>
              <Col sm={8} className="mt-2">
                <Row className="">
                  <Col className="ms-4 ps-2  align-items.center justify-content-center">
                    <Row>
                      <span className="primary-text fw-semibold fs-5 mt-1 text-capitalize">
                        {state.first_name+ " " + state.middle_name + " "+ state.last_name} 
                      </span>
                    </Row>
                    <Row>
                      <span className="text-dark mt-0 fw-semibold ">
                        {state.license} device license
                      </span>
                    </Row>
                  </Col>
                </Row>

                <Row className="p-2 ps-1 m-1 mt-4">
                  <Col sm={4} className="alighn-items-start">
                    {" "}
                    <span className="text-secondary  fw-normal">Customer ID:</span>
                  </Col>

                  <Col className="alighn-items-start">
                    <span className="text-dark fw-semibold">{state.id}</span>
                  </Col>
                </Row>

                <Row className="p-2 ps-1 m-1 mt-1">
                  <Col sm={4} className="alighn-items-start">
                    
                    <span className="text-secondary  fw-normal">
                      Email Address:
                    </span>
                  </Col>

                  <Col className="alighn-items-start">
                    <span className="text-dark fw-semibold">{state.email}</span>
                  </Col>
                </Row>

                <Row className="p-2 ps-1  m-1">
                  <Col sm={4} className="alighn-items-start">
                   
                    <span className="text-secondary  fw-normal">
                      Phone Number:
                    </span>
                  </Col>

                  <Col className="alighn-items-start">
                    <span className="text-dark fw-semibold">{state.phone}</span>
                  </Col>
                </Row>

                <Row className="p-2 ps-1  m-1">
                  <Col sm={4} className="alighn-items-start">
                  
                    <span className="text-secondary  fw-normal">
                      Living Address:
                    </span>
                  </Col>

                  <Col className="alighn-items-start">
                    <span className="text-dark fw-semibold">
                      {state.living_address}
                    </span>
                  </Col>
                </Row>

             

                <Row className="p-2 ps-1  m-1">
                  <Col sm={4} className="alighn-items-start">
                    <span className="text-secondary  fw-normal">
                      Subscription Date:
                    </span>
                  </Col>

                  <Col className="alighn-items-start">
                    <span className="text-dark fw-semibold">
                      {DateSlice(state.created_at)} 
                    </span>
                  </Col>
                </Row>
                <Row className="p-2 ps-1  m-1">
                  <Col sm={4} className="alighn-items-start">
                    <span className="text-secondary  fw-normal">
                      Subscription Plan:
                    </span>
                  </Col>

                  <Col className="alighn-items-start">
                    {state.subscription === "monthly" ? (
                      <span className="text-dark fw-semibold">Monthly</span>
                    ) : (
                      <span className="text-dark fw-semibold">Annual</span>
                    )}
                  </Col>
                </Row>
                <Row className="p-2 ps-1  m-1">
                  <Col sm={4} className="alighn-items-start">
                    <span className="text-secondary  fw-normal">
                      Expire Date:
                    </span>
                  </Col>

                  <Col className="alighn-items-start">
                    <span className="text-dark fw-semibold">
                      {ExpireDate(state.created_at, state.subscription)} 
                    </span>
                  </Col>
                </Row>

                <Row className="p-2 ps-1  m-1">
                  <Col sm={4} className="alighn-items-start">
                    
                    <span className="text-secondary  fw-normal">
                      Payment Method:
                    </span>
                  </Col>

                  <Col className="alighn-items-start">
                    <span className="text-dark fw-semibold">
                      {Payment(state.payment_method)}
                    </span>
                  </Col>
                </Row>
              </Col>

              <Col sm={3}>
                <Button
                  to="/"
                  onClick={() => OpenDialog(state, "add")}
                  className="btn btn-light text-dark  m-1"
                >
                  Add Subscription
                </Button>
                <Button
                  to="/"
                  onClick={() => OpenDialog(state, "remove")}
                  className="btn btn-light text-dark  m-1"
                >
                  Remove Subscription
                </Button>
                <Button
                  to="/"
                  onClick={() => OpenDialog(state, "deactivate")}
                  className="btn btn-light text-dark  m-1"
                >
                  Deactivate Account
                </Button>
                <Button
                  to="/"
                  onClick={() => OpenDialog(state, "detach")}
                  className="btn btn-light text-dark  m-1"
                >
                  Detach Credentials
                </Button>

                <Link
                  to="/emails"
                  variant="primary"
                  className="btn btn-md btn-light primary-bg text-dark border-0 rounded-1 m-1"
                >
                  Send Email
                </Link>
              </Col>
              <Row className=" d-flex justify-content-start align-items-start ms-0 m-3 mb-2">
                <Col sm={2} className=" align-items-end  ms-1 m-3 mb-2">
                  <Button
                    onClick={goBack}
                    
                    variant="light"
                    className="d-flex btn btn-md btn-light w-100 text-dark fw-semibold text-center justify-content-center mt-2 "
                  >
                    Back
                  </Button>
                </Col>
              </Row>
            </Row>
          </Col>
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{initialValue.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {confirm ? (
              <p>{initialValue.cofirmationtxt}</p>
            ) : (
              <Form>
                <Row>
                  <Col sm={3} className="align-items-center">
                    <p>Current Plan:</p>
                  </Col>
                  <Col sm={6} className="align-items-center">
                    <p className="text-primary fw-bold align-items-center">
                      {initialValue.currentPlan} Device License
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col sm={3}>
                    <p>{initialValue.updatedInfo}:</p>
                  </Col>
                  <Col sm={8} className="justify-content-start">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="light"
                        title="1 License"
                        id="dropdown-basic"
                      >
                        {license} License
                      </Dropdown.Toggle>

                      <Dropdown.Menu variant="light">
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
                  </Col>
                </Row>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={handleClose}>
              Back
            </Button>
            {initialValue.operation === "add" ? (
              <Button variant="primary" onClick={() => alert("add")}>
                Confirm
              </Button>
            ) : initialValue.operation === "remove" ? (
              <Button variant="primary" onClick={() => alert("remove")}>
                Confirm
              </Button>
            ) : initialValue.operation === "deactivate" ? (
              <Button variant="danger" onClick={() => alert("deactivate")}>
                Deactivate
              </Button>
            ) : initialValue.operation === "detach" ? (
              <Button variant="danger" onClick={() => alert("Detach")}>
                Detach
              </Button>
            ) : null}
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default CustomerDetail;
