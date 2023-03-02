import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import HightlightAccordion from "../components/Accordion";
import Status from "../assets/Status";
import CustomerTable from "../components/CustomerTable";
import Users from "../assets/Customers";
import Table from "react-bootstrap/Table";
// import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";

export const Customers = () => {
  const [activeTab, setActiveTab] = useState("Active");
  const [loading, setLoading] = useState(true);
  const [operate, setOperate] = useState(true);


  //modal dynamic attributes
  const [initialValue, setInitialValue] = useState({
    title: "",
    currentPlan: "",
    updatedInfo: "",
    operation: "",
  });



  const OpenDialog = (item, operation) => {
    var info = operation === "add" ? "Upgrade to" : "Downgrade to";
    if (operation === "remove") {
      setInitialValue({
        ...initialValue,
        title: "Remove Subscription",
        currentPlan: item.license,
        updatedInfo: info,
        operation: operation,
      });
      setLicense(item.license);
      handleShow();
    } else {
      setInitialValue({
        ...initialValue,
        title: "Add Subscription",
        currentPlan: item.license,
        updatedInfo: info,
        operation: operation,
      });
      setLicense(item.license);
      handleShow();
    }
  };

//modal dropdown license listing states
  const [license, setLicense] = useState();



  const Tabs = (name) => {
    setActiveTab(name);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // featch data from database

  const Customer = (status) => {
    var status = activeTab;
  };

  useEffect(() => {
    return () => {};
  }, [activeTab]);

  return (
    <Container>
      <Row className="mt-4 mb-3">
        <Col
          sm={2}
          className="card justify-content-md-center   shadow-sm border-0  pt-2 p-2 "
        >
          <div>
            <h5 className="text-center fw-bold">36</h5>
            <p className="text-center text-success responsive-font-example">
              Active Customers
            </p>
          </div>
        </Col>

        <Col
          sm={2}
          className="card justify-content-md-center  shadow-sm border-0 m-2 mt-0 mb-0  pt-2"
        >
          <div>
            <h5 className="text-center fw-bold">26</h5>
            <p className="text-center text-secondary">Monthly Subscribers</p>
          </div>
        </Col>
        <Col
          sm={2}
          className="card justify-content-md-center shadow-sm border-0 m-2 mt-0 mb-0  pt-2"
        >
          <div>
            <h5 className="text-center fw-bold">12</h5>
            <p className="text-center text-secondary">Annual Subcribers</p>
          </div>
        </Col>
      </Row>

      {/* Customers listing table */}
      <Row>
        <Col sm={9} className="border">
          <Row className="m-auto justify-content-md-center pt-4 pb-2 ">
            <Col>
              <h4>Customers</h4>
            </Col>
            <Col sm={8}></Col>
            <Col>
              <Button variant="primary">Create Account</Button>
            </Col>
          </Row>
          <Row className="bg-white p-2 rounded">
            <Row>
              <Col>
                <ul className="nav nav-tabs">
                  {Status.map((item, index) => (
                    <li className="nav-item" key={index}>
                      <Button
                        variant="light"
                        className="nav-link"
                        className={
                          activeTab === item.title
                            ? "bg-success text-white"
                            : "bg-white"
                        }
                        aria-current="page"
                        onClick={() => Tabs(item.title)}
                      >
                        {item.title}
                      </Button>
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>

            {loading ? (
              <>
                <Row className="justify-content-start">
                  <Col sm={6}>
                    <div className="input-group mb-3 mt-4 ">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                      />
                      <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">
                          Search
                        </span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="bg-white">
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Customer</th>
                          <th>Subscription</th>
                          <th>Due Date</th>
                          <th className="text-end">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Users.map((item, index) => (
                          <CustomerTable
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            license={item.license}
                            subscription={item.subscription}
                            date={item.date}
                            add={() => OpenDialog(item, "add")}
                            remove={() => OpenDialog(item, "remove")}
                            detail="/customerdetail?id=item.id"
                          />
                        ))}
                      </tbody>
                    </Table>
                    {/* Bottom Pagination */}
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <a className="page-link" href="#">
                            Previous
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            Next
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </Col>
                </Row>
              </>
            ) : (
              <div className="justify-content-center align-items-center m-auto p-4 ">
                <div class="spinner-border text-secondary" role="status"></div>
                <p>Loading...</p>
              </div>
            )}
          </Row>
        </Col>

        <Col sm={3}>
          <HightlightAccordion />
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{initialValue.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                <p >{initialValue.updatedInfo}:</p>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Back
          </Button>
          {initialValue.operation == "add" ?(
 <Button variant="primary" onClick={()=>alert("add")}>
 Confirm
</Button>
          ): initialValue.operation == "remove" ?(
<Button variant="primary" onClick={()=>alert("remove")}>
 Confirm
</Button>
          ): null
          }
         
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
