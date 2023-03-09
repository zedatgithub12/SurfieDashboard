import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import HightlightAccordion from "../components/Accordion";
import Status from "../assets/Status";
import CustomerTable from "../components/CustomerTable";
import Users from "../assets/Customers";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { AiOutlineSearch } from "react-icons/ai";
import Connection from "../constants/Connections";
import Empty from "../assets/Empty.png";
import ReactPaginate from "react-paginate";
import Sidebar from "../components/Sidebar";

export const Customers = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState();
  const [license, setLicense] = useState(); //modal dropdown license listing states
  const [notFound, setNotFound] = useState("There is not customer data here!");
  const [pageCount, setPageCount] = useState(0);

  //modal dynamic attributes
  const [initialValue, setInitialValue] = useState({
    title: "",
    currentPlan: "",
    updatedInfo: "",
    operation: "",
    cofirmationtxt: "",
  });

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

  const Tabs = (name) => {
    setActiveTab(name);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // onchange in the search input field
  const SearchText = (event) => {
    setSearch(event.target.value);
  };

  const FindCustomer = () => {
    var Api = Connection.api + Connection.search;
    var headers = {
      accept: "application/json",
      "Content-Type": "application/json",
  
    };

    var data = {
      status: activeTab,
      Query: search,
    };

    fetch(Api, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    }).then((response) => response.json())
    .then((response)=>{

      if(response.status==="succeed"){

      }else{

      }

      
    }).catch((e)=>{
      console.log("no matching data found");
    })

  };

  //fetch customer while use clicked the next button every time

  const fetchCustomer = async (currentPage) => {
    
    var Api = Connection.api + Connection.customers; // update this line of code to the something like 'http://localhost:3000/customers?_page=${currentPage}&_limit=${limit}
    var headers = {
      accept: "application/json",
      "Content-Type": "application/json",
    };

    fetch(Api, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((response) => {
        var data = response.Customers;
        if (response.status === "succeed") {
          setCustomers(response);
          console.log("featched be tsebay");
        } else {
          setCustomers(response);
          console.log("featched be else");
        }
      });
  };

  // const getCustomers = async () => {
  //   var Api = Connection.api + Connection.customers; // update this line of code to the something like 'http://localhost:3000/customers?_page=1&_limit=${limit}
  //   var headers = {
  //     accept: "application/json",
  //     "Content-Type": "application/json",
  //   };

  //   fetch(Api, {
  //     method: "GET",
  //     headers: headers,
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {

  //       var data = response.data;
  //       if (response.status === "200") {
  //         setCustomers(response.data);

  //         console.log("reposnse" + response);
  //       } else {
  //         console.log("else" + data);
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
  // getCustomers();
  //bottom paginatiing function

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    console.log(currentPage);

    const customerFromServer = await fetchCustomer(currentPage);
    // the line of code below will be uncommmented and the next will be cleaned
    setCustomers(customerFromServer);
    // setCustomers(customers);
  };

  let limit = 15;

  useEffect(() => {
    fetchCustomer();
    return () => {};
  }, [activeTab]);

  return (
    <>
      <Sidebar />
      <Container>
        <Row className="mt-5 mb-3">
          <Col
            sm={2}
            className="card justify-content-md-center   shadow-sm border-0  pt-2 p-2 "
          >
            <div>
              <h5 className="text-center font-link fw-bold">36</h5>
              <p className="text-center font-link text-success responsive-font-example">
                Active Customers
              </p>
            </div>
          </Col>

          <Col
            sm={2}
            className="card justify-content-md-center  shadow-sm border-0 m-2 mt-0 mb-0  pt-2"
          >
            <div>
              <h5 className="text-center font-link fw-bold">26</h5>
              <p className="text-center font-link text-secondary">
                Monthly Subscribers
              </p>
            </div>
          </Col>
          <Col
            sm={2}
            className="card justify-content-md-center shadow-sm border-0 m-2 mt-0 mb-0  pt-2"
          >
            <div>
              <h5 className="text-center font-link fw-bold">12</h5>
              <p className="text-center font-link text-secondary ">
                Annual Subcribers
              </p>
            </div>
          </Col>
        </Row>

        {/* Customers listing table */}
        <Row>
          <Col sm={9} className="border">
            <Row className="m-auto justify-content-md-center pt-4 pb-2 ">
              <Col>
                <h5 className="font-link">Customers</h5>
              </Col>
              <Col sm={7}></Col>
              <Col className="d-flex justify-content-end">
                <Link
                  to="/createaccount"
                  variant="primary"
                  className="font-link text-decoration-none fw-semibold"
                >
                  Create Account
                </Link>
              </Col>
            </Row>
            <Row className="bg-white p-2 rounded">
              <Row>
                <Col>
                  <ul className="nav nav-tabs">
                    {Status.map((item, index) => (
                      <li className="nav-item font-link" key={index}>
                        <Button
                          variant="success"
                          className={
                            activeTab === item.id
                              ? "primary-bg text-white font-link border-0 rounded mb-1 p-4 pb-0 pt-0"
                              : "bg-white font-link text-secondary border-0  rounded-pill p-4 pb-0 pt-0"
                          }
                          aria-current="page"
                          onClick={() => Tabs(item.id)}
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
                  <Row className="d-flex justify-content-start align-items-center">
                    <Col sm={8} className="pt-2 pb-2">
                      <div className="input-group mb-4 mt-4">
                        <input
                          type="text"
                          className="form-control small ps-3 "
                          placeholder="Search..."
                          aria-label="Search"
                          aria-describedby="basic-addon2"
                          defaultValue={search}
                          onChange={SearchText}
                        />
                        <div className="input-group-append">
                          <Button
                            onClick={() => FindCustomer()}
                            variant="light"
                            className=" border rounded-0 rounded-end bg-light text-center pb-2 "
                          >
                            <AiOutlineSearch size={20} color="#10a698" />
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="bg-white">
                      {customers.length ? (
                        <Table
                          hover
                          responsive
                          striped
                          className="align-middle"
                        >
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Customer</th>
                              <th>License</th>
                              <th>Subscription</th>
                              <th>Due Date</th>
                              <th className="text-end">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {customers
                              .filter((items) => items.status == activeTab)
                              .map((item, index) => (
                                <CustomerTable
                                  key={index}
                                  id={item.id}
                                  name={
                                    item.first_name + " " + item.middle_name
                                  }
                                  license={item.license}
                                  subscription={item.subscription}
                                  date={item.updated_at}
                                  add={() => OpenDialog(item, "add")}
                                  remove={() => OpenDialog(item, "remove")}
                                  deactivate={() =>
                                    OpenDialog(item, "deactivate")
                                  }
                                  detach={() => OpenDialog(item, "detach")}
                                  detail="/customerdetail?id=item.id"
                                  rowPressed={() =>
                                    navigate("/customerdetail", {
                                      state: { ...item },
                                    })
                                  }
                                />
                              ))}
                          </tbody>
                        </Table>
                      ) : (
                        <div className="d-flex align-items-center justify-content-center m-auto m-4 p-4">
                          <div className="d-flex align-items-center justify-content-center m-auto m-4 p-4">
                            <img
                              src={Empty}
                              alt="No Customers"
                              className="w-25 h-25 "
                            />
                            <h5>{notFound}</h5>
                          </div>
                        </div>
                      )}

                      {/* Bottom Pagination */}

                      <ReactPaginate
                        previousLabel={"previous"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={3}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination justify-content-end"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                      />
                      {/* <nav aria-label="Page navigation example">
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
                    </nav> */}
                    </Col>
                  </Row>
                </>
              ) : (
                <div className="justify-content-center align-items-center m-auto p-4 ">
                  <div
                    class="spinner-border text-secondary"
                    role="status"
                  ></div>
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
