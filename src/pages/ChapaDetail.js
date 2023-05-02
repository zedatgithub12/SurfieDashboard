import React, { Component, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/Sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import Connection from "../constants/Connections";
import { Button } from "react-bootstrap";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Empty from "../assets/Empty.png";
import telebirr from "../assets/telebirr.png";
import chapa from "../assets/chapa.png";
import cash from "../assets/cash.png";

const ChapaDetail = () => {
  const { state } = useLocation();

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);

  const Date = (date) => {
    var duedate;

    if (date == null) {
      duedate = "Not payed!";
    } else {
      var year = date.slice(0, 4);
      var month = date.slice(5, 7);
      var day = date.slice(8, 10);
      duedate = day + "/" + month + "/" + year;
    }

    return duedate;
  };
  const paymentDate = (date) => {
    var duedate;

    if (date == null) {
      duedate = "Not payed!";
    } else {
      var year = date.slice(0, 4);
      var month = date.slice(5, 7);
      var day = date.slice(8, 10);
      duedate = day + "/" + month + "/" + year;
    }

    return duedate;
  };
  //calculate and return the license expire date
  const ExpireDate = (date) => {
    var duedate;

    if (date == null) {
      duedate = "Not payed!";
    } else {
      var year = date.slice(0, 4);
      var month = date.slice(5, 7);
      var day = date.slice(8, 10);
      duedate = day + "/" + month + "/" + year;
    }

    return duedate;
  };
  const Status = (status) => {
    var Status;

    switch (status) {
      case 1:
        Status = "Active";
        break;
      case 2:
        Status = "Expired";
        break;

      case 3:
        Status = "Terminated";
        break;
      default:
        Status = "Pending";
    }

    return Status;
  };

  useEffect(() => {
    const getCustomer = async () => {
      var Api = Connection.api + Connection.singleCustomer + state.customer_id;
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      fetch(Api, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((response) => {
          setCustomer(response);

          setLoading(false);
        })
        .catch((e) => {
          setLoading(true);
        });
    };

    getCustomer();
    return () => {};
  }, []);
  return (
    <>
      <Sidebar />
      <Container>
        <Row>
          <Col sm={5} className="shadow-sm mt-5 py-3 me-3 border-end rounded">
            <div className="card-body">
              <div className="row d-flex  justify-content-between mb-4 px-3">
                <div className="col-md-9">
                  <p className="text-dark">Total Amount</p>
                  <h1 className="fw-bold text-secondary">
                    {state.amount} {state.currency}
                  </h1>
                </div>
                <div className="col-md-3 end-0 ">
                  <span className="bg-success bg-opacity-10 text-success px-4 rounded text-center pb-1">
                    {state.status}
                  </span>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <ul className="list-group list-group-flush list my--3">
                    <li className="list-group-item bg-transparent">
                      <div className="row align-items-center">
                        <div className="col ml--2">
                          <p className="mb-0">Customer Name</p>
                        </div>
                        <div className="col-auto">
                          <p className="mb-0 fw-semibold text-capitalize">
                            {state.first_name} {state.last_name}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item bg-transparent">
                      <div className="row align-items-center">
                        <div className="col ml--2">
                          <p className="mb-0">Customer Email</p>
                        </div>
                        <div className="col-auto">
                          <p className="mb-0 fw-semibold text-capitalize">{state.email}</p>
                        </div>
                      </div>
                    </li>

                    <li className="list-group-item bg-transparent">
                      <div className="row align-items-center">
                        <div className="col ml--2">
                          <p className="mb-0">Transaction id</p>
                        </div>
                        <div className="col-auto">
                          <p
                            className="castro-copy mb-0 fw-semibold text-capitalize"
                            data-clipboard-text={state.txn_reference}
                          >
                            {state.txn_reference}
                            <i className="fal fa-copy"></i>
                          </p>
                        </div>
                      </div>
                    </li>

                    <li className="list-group-item bg-transparent">
                      <div className="row align-items-center">
                        <div className="col ml--2">
                          <p className="mb-0">Transaction Reference</p>
                        </div>
                        <div className="col-auto">
                          <p
                           className="mb-0 fw-semibold text-capitalize"
                            data-clipboard-text={state.txn_id}
                          >
                            {state.txn_id} <i className="fal fa-copy"></i>
                          </p>
                        </div>
                      </div>
                    </li>

                    <li className="list-group-item bg-transparent">
                      <div className="row align-items-center">
                        <div className="col ml--2">
                          <p className="mb-0">Paid at</p>
                        </div>
                        <div className="col-auto">
                          <p className="mb-0 fw-semibold text-capitalize">{paymentDate(state.created_at)}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 ms-3">
                  <Button
                    onClick={goBack}
                    variant="light"
                    className="d-flex btn btn-md btn-outline-secondary w-25 text-dark fw-semibold text-center justify-content-center mt-2 "
                  >
                    Back
                  </Button>
                </div>
              </div>
            </div>
          </Col>

          <Col
            sm={6}
            className="bg-success bg-opacity-10 ms-1 mt-5 py-3 rounded"
          >
            <p className=" fw-semibold ms-2 text-muted">Customer Detail</p>

            {loading ? (
              <Stack spacing={1}>
                {/* For variant="text", adjust the height via font-size */}
                <Skeleton
                  variant="rectangular"
                  width={210}
                  height={46}
                  className="rounded"
                />

                {/* For other variants, adjust the size with `width` and `height` */}
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />

                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />

                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />

                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </Stack>
            ) : (
              <div>
                {customer.length >= 1 ? (
                  customer.map((item, index) => (
                    <div key={index}>
                      <div className="card-body">
                        <div className="row d-flex  justify-content-between mb-4 px-3">
                          <div className="col-md-9">
                            <h1 className="fw-bold text-secondary">
                              {item.license} License
                            </h1>
                          </div>
                          <div className="col-md-2 end-0 ">
                            {item.payment_method == "1001" ? (
                              <>
                                <img
                                  src={chapa}
                                  width="50"
                                  height="50"
                                  alt="icon"
                                  className="rounded m-1"
                                />
                                <span className="small text-center fw-semibold">
                                  With Chapa
                                </span>
                              </>
                            ) : item.payment_method == "1002" ? (
                              <>
                                <img
                                  src={telebirr}
                                  width="50"
                                  height="50"
                                  alt="icon"
                                  className="rounded m-1"
                                />
                                <span className=" text-center fw-semibold ">
                                  Telebirr
                                </span>
                              </>
                            ) : (
                              <>
                                <img
                                  src={cash}
                                  width="50"
                                  height="50"
                                  alt="icon"
                                  className="rounded m-1"
                                />
                                <span className=" text-center fw-semibold ">
                                  With Cash
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <ul className="list-group list-group-flush list my--3">
                        <li className="list-group-item bg-transparent">
                          <div className="row align-items-center">
                            <div className="col ml--2">
                              <p className="mb-0">Customer Status</p>
                            </div>
                            <div className="col-auto">
                              <p className="mb-0 fw-semibold text-capitalize">
                                {item.status == 1 ? (
                                  <span class="badge bg-success bg-opacity-10 text-success px-4 rounded-1">
                                    {Status(item.status)}
                                  </span>
                                ) : item.status == 2 ? (
                                  <span class="badge bg-danger bg-opacity-10 text-danger px-4 rounded-1">
                                    {Status(item.status)}
                                  </span>
                                ) : item.status == 3 ? (
                                  <span class="badge bg-dark bg-opacity-10 text-dark px-4 rounded-1">
                                    {Status(item.status)}
                                  </span>
                                ) : (
                                  <span class="badge bg-secondary bg-opacity-10 text-secondary px-4 rounded-1">
                                    {Status(item.status)}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        </li>

                        <li className="list-group-item bg-transparent">
                          <div className="row align-items-center">
                            <div className="col ml--2">
                              <p className="mb-0">Subscription</p>
                            </div>
                            <div className="col-auto">
                              <p className="mb-0 fw-semibold text-capitalize">
                                {item.subscription}
                              </p>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item bg-transparent">
                          <div className="row align-items-center">
                            <div className="col ml--2">
                              <p className="mb-0">Expire at</p>
                            </div>
                            <div className="col-auto">
                              <p className="mb-0 fw-semibold text-capitalize">
                                {ExpireDate(item.duedate)}
                              </p>
                            </div>
                          </div>
                        </li>

                        <li className="list-group-item bg-transparent">
                          <div className="row align-items-center">
                            <div className="col ml--2">
                              <p className="mb-0">Customer Name</p>
                            </div>
                            <div className="col-auto">
                              <p className="mb-0 fw-semibold text-capitalize">
                                {item.first_name} {item.middle_name}
                              </p>
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item bg-transparent">
                          <div className="row align-items-center">
                            <div className="col ml--2">
                              <p className="mb-0">Customer Email</p>
                            </div>
                            <div className="col-auto">
                              <p className="mb-0 fw-semibold">{item.email}</p>
                            </div>
                          </div>
                        </li>

                        <li className="list-group-item bg-transparent">
                          <div className="row align-items-center">
                            <div className="col ml--2">
                              <p className="mb-0">Customer Phone</p>
                            </div>
                            <div className="col-auto">
                              <p className="mb-0 fw-semibold">{item.phone}</p>
                            </div>
                          </div>
                        </li>

                        <li className="list-group-item bg-transparent">
                          <div className="row align-items-center">
                            <div className="col ml--2">
                              <p className="mb-0">Subscription Date</p>
                            </div>
                            <div className="col-auto">
                              <p className="mb-0 fw-semibold">
                                {Date(item.created_at)}
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  ))
                ) : (
                  <div className="d-flex align-items-center justify-content-center m-auto m-4 p-4">
                    <div className="text-center">
                      <img
                        src={Empty}
                        alt="No Customers"
                        className="w-50 h-50 "
                      />
                      <p className="fs-5 fw-semibold w-75 m-auto ">
                        There is no customer associated with this payment.{" "}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChapaDetail;
