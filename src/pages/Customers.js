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
import { BsCheckCircle } from "react-icons/bs";

export const Customers = () => {
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
  const [count, setCount] = useState({
    pendings: "0",
    active: "0",
    monthly: "0",
    annual: "0",
    mfive: "0",
    mten: "0",
    mfifty: "0",
    afive: "0",
    aten: "0",
    afifty: "0",
  });
  //modal dynamic attributes
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

  const OpenDialog = (item, operation) => {
    var info = operation === "add" ? "Upgrade to" : "Downgrade to";

    if (operation === "add") {
      setConfirm("1");
      setInitialValue({
        ...initialValue,
        title: "Add Subscription",
        currentPlan: item.license,
        updatedInfo: info,
        operation: operation,
        lid: item.id,
        errormsg: "",
      });
      setLicense(item.license);
      handleShow();
    } else if (operation === "remove") {
      setConfirm("1");
      setInitialValue({
        ...initialValue,
        title: "Remove Subscription",
        currentPlan: item.license,
        updatedInfo: info,
        operation: operation,
        lid: item.id,
        errormsg: "",
      });
      setLicense(item.license);
      handleShow();
    }
    //when the user clicked deactivate account button from dropdown
    else if (operation === "deactivate") {
      setConfirm("2");
      setInitialValue({
        ...initialValue,
        title: "Deactivate Account!",
        cofirmationtxt:
          "Are you sure do you want to deactivate this user account!",
        operation: operation,
        lid: item.id,
        errormsg: "",
      });
      setLicense(item.license);
      handleShow();
    } else {
      setConfirm("2");
      setInitialValue({
        ...initialValue,
        title: "Detach Credentials",
        cofirmationtxt:
          "Are you sure do you want to Detach this user credentials!",
        operation: operation,
        lid: item.id,
        errormsg: "",
      });
      setLicense(item.license);
      handleShow();
    }
  };

  const Tabs = (id) => {
    setActiveTab(id);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // onchange in the search input field
  const SearchText = (event) => {
    setSearch(event.target.value);
  };

  // add License functionality
  //adding license to databse go performed here
  const UpdateID = (event) => {
    setInitialValue({
      ...initialValue,
      cid: event.target.value,
      errormsg: "",
    });
  };

  const AddSubscription = () => {
    if (initialValue.currentPlan == 15) {
      setInitialValue({
        ...initialValue,
        errormsg: "You are using the maximum plan of Surfi Ethiopia!",
      });
    } else if (license <= initialValue.currentPlan) {
      setInitialValue({
        ...initialValue,
        errormsg: "Selected a license supports same or less devices!",
      });
    } else if (initialValue.cid !== "" && initialValue.currentPlan < 15) {
      var Api = Connection.api + Connection.addlicense + initialValue.lid;
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };

      var Data = {
        reomteid: initialValue.cid,
        localid: initialValue.lid,
        license: license,
      };

      fetch(Api, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          // the action will be taken depending on the server response

          if (response === "succeed") {
            console.log("well done!");
            setConfirm("3");
            setInitialValue({
              ...initialValue,
              cofirmationtxt: `Succeessfully Upgraded to ${license} device license`,

              errormsg: "",
            });
          } else {
            setInitialValue({
              ...initialValue,
              cofirmationtxt: "",
              lid: "",
              cid: "",
              errormsg: "Failed to to upgrade license",
            });
          }
        });
    } else {
      setInitialValue({
        ...initialValue,
        errormsg: "Please enter remote customer id!",
      });
    }
  };

  // remove the subscription
  const RemoveSubscription = () => {
    if (initialValue.currentPlan == 5) {
      setInitialValue({
        ...initialValue,
        errormsg: "You are using the minimum plan of Surfi Ethiopia!",
      });
    } else if (license >= initialValue.currentPlan) {
      setInitialValue({
        ...initialValue,
        errormsg: "Selected a license supports same or more devices!",
      });
    } else if (initialValue.cid !== "" && initialValue.currentPlan > 5) {
      var Api = Connection.api + Connection.removeLicense + initialValue.lid;
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };

      var Data = {
        reomteid: initialValue.cid,
        localid: initialValue.lid,
        license: license,
      };

      fetch(Api, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          // the action will be taken depending on the server response

          if (response === "succeed") {
            setConfirm("3");
            setInitialValue({
              ...initialValue,
              cofirmationtxt: `Succeessfully Downgraded license to ${license} device license`,
              errormsg: "",
            });
          } else {
            setInitialValue({
              ...initialValue,
              cofirmationtxt: "",
              lid: "",
              cid: "",
              errormsg: "Failed to to downgrade license",
            });
          }
        })
        .catch((e) => {
          setInitialValue({
            ...initialValue,
            errormsg: "Error downgrade license",
          });
        });
    } else {
      setInitialValue({
        ...initialValue,
        errormsg: "Please enter remote customer id!",
      });
    }
  };

  // deactivate customer account
  const Deactivate = () => {
    if (initialValue.cid !== "") {
      var Api = Connection.api + Connection.deactivate + initialValue.lid;
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };

      var Data = {
        reomteid: initialValue.cid,
        localid: initialValue.lid,
        cstatus: 3,
      };

      fetch(Api, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          // the action will be taken depending on the server response

          if (response === "deactivated") {
            setConfirm("3");
            setInitialValue({
              ...initialValue,
              cofirmationtxt: `Succeessfully Deactivated!`,
              errormsg: "",
            });
          } else {
            setInitialValue({
              ...initialValue,
              cofirmationtxt: "",
              lid: "",
              cid: "",
              errormsg: "Failed to deactivate customer credentials",
            });
          }
        })
        .catch((e) => {
          setInitialValue({
            ...initialValue,
            errormsg: "Error deactivating customer credentials",
          });
        });
    } else {
      setInitialValue({
        ...initialValue,
        errormsg: "Please enter remote customer id!",
      });
    }
  };

  // deactivate customer account
  const Detach = () => {
    if (initialValue.cid !== "") {
      var Api = Connection.api + Connection.detach + initialValue.lid;
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };

      var Data = {
        reomteid: initialValue.cid,
        localid: initialValue.lid,
        cstatus: 3,
      };

      fetch(Api, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          // the action will be taken depending on the server response

          if (response === "detached") {
            setConfirm("3");
            setInitialValue({
              ...initialValue,
              cofirmationtxt: `Succeessfully Detached!`,
              errormsg: "",
            });
          } else {
            setInitialValue({
              ...initialValue,
              cofirmationtxt: "",
              lid: "",
              cid: "",
              errormsg: "Failed to detach User credentials",
            });
          }
        })
        .catch((e) => {
          setInitialValue({
            ...initialValue,
            errormsg: "Error detaching user credentials",
          });
        });
    } else {
      setInitialValue({
        ...initialValue,
        errormsg: "Please enter remote customer id!",
      });
    }
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

  //fetch customer while use clicked the next button every time

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
    var request = {
      status: activeTab,
    };
    const data = await fetch(Api, {
      method: "GET",
      headers: headers,
    });
    const response = await data.json();
    console.log(response.data);
    return response.data;
  };

  //pagination buttons onclick handler

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const customerFromServer = await fetchCustomer(currentPage);
    // the line of code below will be uncommmented and the next will be cleaned
    setCustomers(customerFromServer);
    // setCustomers(customers);
  };

  const PendingCount = () => {
    var Api = Connection.api + Connection.pending; // update this line of code to the something like 'http://localhost:3000/customers?_page=1&_limit=${limit}
    var headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    fetch(Api, {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((response) => {
        setCount({
          ...count,
          pendings: response.pendings,
          active: response.actives,
          monthly:response.monthly,
          annual: response.annual,
          mfive: response.mfive,
          mten: response.mten,
          mfifty: response.mfifty,
          afive: response.afive,
          aten: response.aten,
          afifty: response.afifty,
        });

        
      });
  };

  const getCustomers = async (currentPage) => {
    var Api =
      Connection.api +
      Connection.customers +
      `?page=${currentPage}&status=${activeTab}`; // update this line of code to the something like 'http://localhost:3000/customers?_page=1&_limit=${limit}
    var headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    // var data = {
    //   status: parseInt(activeTab),
    // };

    fetch(Api, {
      method: "GET",
      headers: headers,
      // Body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        setCustomers(response.data);
        setPaging({
          ...paging,
          initialPage: response.from,
          totalCount: response.last_page,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //use effect function
  //when the functional component cames to life we will getcustomers by deafult
  useEffect(() => {
    getCustomers();
    PendingCount();
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
              <h5 className="text-center font-link fw-bold">{count.active}</h5>
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
              <h5 className="text-center font-link fw-bold">{count.monthly}</h5>
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
              <h5 className="text-center font-link fw-bold">{count.annual}</h5>
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
                          variant="light"
                          className={
                            activeTab === item.id
                              ? "primary-bg  font-link border-0 rounded mb-1 p-4 pb-1 pt-1 mx-2 position-relative overflow-visible"
                              : "bg-white font-link text-secondary border-0  rounded-pill mx-2 p-4 pb-0 pt-0 position-relative overflow-visible"
                          }
                          aria-current="page"
                          onClick={() => Tabs(item.id)}
                        >
                          {item.title}
                          {item.id === "0" ? (
                            <span className="position-absolute top-0 start-100  translate-middle badge rounded-pill bg-danger  ">
                              {count.pendings}
                            </span>
                          ) : null}
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
                              <th>Customer</th>
                              <th>License</th>
                              <th>Subscription</th>
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
            <HightlightAccordion
              mfive={count.mfive}
              mten={count.mten}
              mfifty={count.mfifty}
              afive={count.afive}
              aten={count.aten}
              afifty={count.afifty}
            />
          </Col>
        </Row>

        <Modal show={show} onHide={handleClose}>
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
        </Modal>
      </Container>
    </>
  );
};
