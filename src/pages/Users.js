import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import HightlightAccordion from "../components/Accordion";
import Status from "../assets/Status";
import CustomerTable from "../components/CustomerTable";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { AiOutlineSearch } from "react-icons/ai";
import Connection from "../constants/Connections";
import Empty from "../assets/Empty.png";
import ReactPaginate from "react-paginate";
import { BsCheckCircle } from "react-icons/bs";

export const Users = () => {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState("1");
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState();
  const [license, setLicense] = useState(); //modal dropdown license listing states
  const [notFound, setNotFound] = useState("No customer with this status!");
  const [paging, setPaging] = useState({
    initialPage: "",
    totalCount: "",
  });

  const [initialValue, setInitialValue] = useState({
    title: "",
    currentPlan: "",
    updatedInfo: "",
    operation: "",
    cofirmationtxt: "",
    errormsg: "",
    lid: "",
    cid: "",
  });
  const Tabs = (id) => {
    setActiveTab(id);
  };
  const FindCustomer = (currentPage) => {
    if (search !== "") {
      var Api =
        Connection.api +
        Connection.search +
        `?name=${search}&page=${currentPage}&status=${activeTab}`;
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
          if ([response].length > 0) {
            setCustomers(response);
          } else {
            setNotFound("No result found");
          }
        })
        .catch((e) => {
          setNotFound("No result found");
        });
    } else {
      fetchCustomer();
    }
  };
  const fetchCustomer = async (currentPage) => {
    var Api =
      Connection.api +
      Connection.customers +
      `?page=${currentPage}&status=${activeTab}`; // update this line of code to the something like 'http://localhost:3000/customers?_page=${currentPage}&_limit=${limit}
    var headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  
    const data = await fetch(Api, {
      method: "GET",
      headers: headers,
    });
    const response = await data.json();
    return response.data;
  };

   //activate pending users
   const Approve = (id) => {
    var Api = Connection.api + Connection.activate + id; // update this line of code to the something like 'http://localhost:3000/customers?_page=1&_limit=${limit}
    var headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    var Data = {
      status: 1,
    };

    fetch(Api, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response === "activated") {
   
        }
      });
  };
    // onchange in the search input field
    const SearchText = (event) => {
      setSearch(event.target.value);
    };

      //pagination buttons onclick handler

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const customerFromServer = await fetchCustomer(currentPage);
    // the line of code below will be uncommmented and the next will be cleaned
    setCustomers(customerFromServer);
    // setCustomers(customers);
  };
  
  return (
    <>
    <Sidebar/>
   
    <Container className="d-flex justify-content-center align-items-center">
        

        {/* Customers listing table */}
        <Row className="d-flex justify-content-center align-items-center mt-4">
          <Col sm={10} className="border">
            <Row className="m-auto justify-content-md-center pt-4 pb-2 ">
              <Col>
                <h5 className="font-link">Surfie Ethiopia Staffs</h5>
              </Col>
              <Col sm={7}></Col>
              <Col className="d-flex justify-content-end">
                <Link
                  to="/createaccount"
                  variant="primary"
                  className="font-link text-decoration-none fw-semibold"
                >
                  Add Staff
                </Link>
              </Col>
            </Row>
            <Row className="bg-white p-2 pt-0 rounded">
          
                  <Row className="d-flex justify-content-start align-items-center">
                    <Col sm={8} className="pt-1 pb-2">
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
                  {loading ? (
                <>
                  <Row>
                    <Col className="bg-white">
                      {customers.length >= 1 ? (
                        <Table
                          hover
                          responsive
                          striped
                          className="align-middle"
                        >
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Fullname</th>
                              <th>Email</th>
                              <th>Role</th>
                              <th>Due Date</th>
                              <th className="text-end">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {customers.map((item, index) => (
                              <CustomerTable
                                key={index}
                                id={item.id}
                                name={item.first_name + " " + item.middle_name}
                                license={item.license}
                                subscription={item.subscription}
                                date={item.updated_at}
                                status={item.status}
                                rowPressed={() =>
                                  navigate("/customerdetail", {
                                    state: { ...item },
                                  })
                                }
                                approve={() => Approve(item.id)}
                                reactivate={() => Approve(item.id)}
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
                        pageCount={Math.ceil(paging.totalCount)}
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
                    </Col>
                  </Row>
                </>
              ) : (
                <div className="d-flex justify-content-center align-items-center m-auto h-100 w-100 p-5 bg-opacity-10">
                  <div
                    class="spinner-border primary-text spinner-border-sm"
                    role="status"
                  ></div>
                  <p className="m-1 text-center">Loading...</p>
                </div>
              )}
            </Row>
          </Col>

        </Row>

        {/* <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{initialValue.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {confirm == 3 ? (
              <div className=" text-center align-items-center justify-content-center h-100  m-auto p-4  mt-3 mb-2">
                <BsCheckCircle size={66} className="text-success m-3" />
                <p>{initialValue.cofirmationtxt}</p>
              </div>
            ) : confirm == 2 ? (
              <div className="p-2 pt-0 pb-3">
                <p className="fw-semibold">{initialValue.cofirmationtxt}</p>

                <Row className="mb-2 mt-2">
                  <Col sm={8}>
                    <input
                      type="text"
                      required
                      value={initialValue.cid}
                      onChange={UpdateID}
                      className="form-control border-secondary "
                      placeholder="Enter customer ID"
                    />
                  </Col>
                </Row>
              </div>
            ) : (
              <Form>
                <Row>
                  <Col sm={3} className="align-items-center">
                    <p>Current Plan:</p>
                  </Col>
                  <Col sm={6} className="align-items-center">
                    <p className="primary-text fw-semibold align-items-center">
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
                        <Dropdown.Item onClick={() => setLicense(5)}>
                          5 License
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setLicense(10)}>
                          10 License
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setLicense(15)}>
                          15 License
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
                <Row className="mb-2 mt-2">
                  <Col sm={8}>
                    <input
                      type="text"
                      required
                      value={initialValue.cid}
                      onChange={UpdateID}
                      className="form-control border-secondary "
                      placeholder="Customer ID"
                    />
                  </Col>
                </Row>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="position-relative  ms-0 rounded  px-2 ps-0 text-start">
              <p className="text-danger text-center pt-2">
                {initialValue.errormsg}
              </p>
            </div>

            <Button variant="light" onClick={handleClose}>
              Back
            </Button>
            {initialValue.operation === "add" ? (
              <Button
                variant="light"
                className="primary-bg border-0"
                onClick={() => AddSubscription()}
              >
                Confirm
              </Button>
            ) : initialValue.operation === "remove" ? (
              <Button
                variant="light"
                className="primary-bg border-0"
                onClick={() => RemoveSubscription()}
              >
                Confirm
              </Button>
            ) : initialValue.operation === "deactivate" ? (
              <Button variant="danger" onClick={() => Deactivate()}>
                Deactivate
              </Button>
            ) : initialValue.operation === "detach" ? (
              <Button variant="danger" onClick={() => Detach()}>
                Detach
              </Button>
            ) : null}
          </Modal.Footer>
        </Modal> */}

      </Container>
    </>
  );
};
 
 