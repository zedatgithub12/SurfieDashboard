import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import text from "../assets/text.png";
import Sidebar from "../components/Sidebar";
import Connection from "../constants/Connections";
import support from "../assets/support.png";
import { useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";

const Support = () => {
  const navigate = useNavigate();

  const [queries, setQueries] = useState([]);
  const [prompt, setPrompt] = useState({
    show: false,
    content: "",
  });
  const [modalContent, setModalContent] = useState({
    status: false,
    content: {},
  });

  const OpenModal = (item) => {
    setModalContent({
      status: true,
      content: item,
    });
  };

  const DateSlice = (date) => {
    var year = date.slice(0, 4);
    var month = date.slice(5, 7);
    var day = date.slice(8, 10);
    return day + "/" + month + "/" + year;
  };

  // Close answered ticket
  const CloseTicket = (id) => {
    var Api = Connection.api + Connection.closeTicket + id;
    var headers = {
      accept: "application/json",
      "Content-Type": "application/json",
    };

    var Data = {
      id: id,
    };

    fetch(Api, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then((response) => response.json())
      .then((response) => {
        // the action will be taken depending on the server response

        if (response === "done") {
          setPrompt({
            ...prompt,
            show: true,
            content: "Ticket get closed!",
          });
        } else {
          setPrompt({
            ...prompt,
            show: true,
            content: "Unable to close ticket at the moment!",
          });
        }
      })
      .catch((e) => {
        setPrompt({
          ...prompt,
          show: true,
          content: "Error Closing ticket!",
        });
      });
  };

  //fetch all queries from database on the startup of the system
  const FetchQueries = () => {
    var Api = Connection.api + Connection.support;
    var headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    fetch(Api, {
      method: "GET",
      headers: headers,
      // Body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        setQueries(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    FetchQueries();
    return () => {};
  }, []);
  return (
    <>
      <Sidebar />

      <Container>
        <Row className="p-4 pb-0 ps-3">
          <h4 className="fw-semibold">Customer Support</h4>
        </Row>

        <Row className="m-auto">
          <Col sm={7} className="mt-3">
            {queries.length < 1 ? (
              <div className="d-flex align-items-center justify-content-center m-auto m-4 p-4 bg-white  rounded">
                <div className=" align-items-center justify-content-center m-auto m-4 p-4 text-center">
                  <img
                    src={support}
                    alt="No Customers"
                    className="w-50 h-50 "
                  />
                  <h3>There is no support ticket yet!</h3>
                </div>
              </div>
            ) : (
              <Table hover responsive striped className="align-middle">
                <thead className="bg-white">
                  <tr>
                    <th className="ps-4">Name</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {queries.map((item, index) => (
                  <tbody>
                    <tr key={item.id}>
                      <td onClick={() => OpenModal(item)}>
                        <div className="d-flex align-items-center">
                          <div className="ms-3">
                            <p className="fw-bold mb-1">{item.fullname}</p>
                            <p className="text-muted mb-0">{item.email}</p>
                          </div>
                        </div>
                      </td>
                      <td onClick={() => OpenModal(item)}>
                        <p className="fw-normal mb-1">
                          {DateSlice(item.created_at)}
                        </p>
                      </td>
                      <td onClick={() => OpenModal(item)}>
                        {item.status == "1" ? (
                          <span className="bg-opacity-10 bg-success px-4 py-1 text-success rounded-pill d-inline">
                            Replied
                          </span>
                        ) : item.status == "2" ? (
                          <span className="bg-opacity-10 bg-secondary px-4 py-1 text-secondary rounded-pill d-inline">
                            Closed
                          </span>
                        ) : (
                          <span className="bg-opacity-10 bg-danger px-4 py-1 text-danger rounded-pill d-inline">
                            Open
                          </span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            )}
          </Col>

          <Col
            sm={4}
            className="mt-3 shadow-sm  ms-1 p-4 pt-2 bg-white rounded position-relative"
          >
            <div>
              <p className="fw-semibold mt-0 fs-6 text-secondary">
                Message Preview
              </p>
            </div>
            {modalContent.status ? (
              <>
                <div className="position-absolute end-0 me-3">
                  <span className="fw-semibold text-muted">Status: </span>
                  <span>
                    {modalContent.content.status == "1" ? (
                      <span className="bg-opacity-10 bg-success px-4 py-1 text-success rounded-pill d-inline">
                        Replied
                      </span>
                    ) : modalContent.content.status == "2" ? (
                      <span className="bg-opacity-10 bg-secondary px-4 py-1 text-secondary rounded-pill d-inline">
                        Closed
                      </span>
                    ) : (
                      <span className="bg-opacity-10 bg-danger px-4 py-1 text-danger rounded-pill d-inline">
                        Open
                      </span>
                    )}
                  </span>
                </div>
                <p className="text-dark fw-bold fs-6 mb-0 mt-0">
                  {modalContent.content.fullname}
                </p>
                <p className="primary-text fw-semibold fs-6 mb-0 mt-0">
                  {modalContent.content.email}
                </p>
                <p className="text-muted fw-semibold fs-6 form-helper mb-4 mt-0">
                  {modalContent.content.date}
                </p>
                <p className="text-muted  fs-6 form-helper mb-0 mt-0 ">
                  {modalContent.content.description}
                </p>
                <hr className="text-light" />
                <div className="d-flex justify-content-end align-items-center ">
                  <Button
                    variant="light"
                    className={
                      modalContent.content.status == "2"
                        ? "disabled btn  text-secondary px-4  border-0 me-2"
                        : " btn  text-danger px-4  border-0 me-2"
                    }
                    onClick={() => CloseTicket(modalContent.content.id)}
                  >
                    {modalContent.content.status == "2" ? "Closed" : "Close"}
                  </Button>
                  <Button
                    variant="light"
                    className="btn  text-primary px-4  border-0"
                    onClick={() =>
                      navigate("/emails", {
                        state: { ...modalContent.content },
                      })
                    }
                  >
                    Reply
                  </Button>
                </div>
                {prompt.show ? <div className="d-flex justify-content-between align-items-center mb-0 mt-5 bg-success bg-opacity-10 rounded  px-3 ">   <span>{prompt.content}</span>  <BsCheckCircle size={18} className="text-success my-3" /></div> : null}
              </>
            ) : (
              <div className="align-items-center justify-content-center  ">
                <div className="d-flex align-items-center justify-content-center">
                  <img src={text} alt="textnode" className="h-50 w-50 m-auto" />
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Support;
