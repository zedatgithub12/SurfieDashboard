import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Data from "../data/support";

import text from "../assets/text.png";
import Sidebar from "../components/Sidebar";

const Support = () => {
  const [modalContent, setModalContent] = React.useState({
    status: false,
    content: {},
  });

  const OpenModal = (item) => {
    setModalContent({
      status: true,
      content: item,
    });
  };
  return (
    <>
    <Sidebar/>
  
    <Container>
      <Row className="p-4 pb-0 ps-3">
        <h4 className="fw-semibold">Customer Support</h4>
      </Row>

      <Row className="m-auto">
        <Col sm={7} className="mt-3">
          <table className="table align-middle mb-0 bg-white table-striped">
            <thead class="bg-white">
              <tr>
                <th className="ps-4">Name</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Data.length < 1 ? (
                <div>
                  <p>There is no message from customer yet</p>
                </div>
              ) : (
                Data.map((item, index) => (
                  <tr key={index}>
                    <td onClick={() => OpenModal(item)}>
                      <div className="d-flex align-items-center">
                        <div className="ms-3">
                          <p className="fw-bold mb-1">{item.fullname}</p>
                          <p className="text-muted mb-0">{item.email}</p>
                        </div>
                      </div>
                    </td>
                    <td onClick={() => OpenModal(item)}>
                      <p className="fw-normal mb-1">{item.date}</p>
                    </td>
                    <td onClick={() => OpenModal(item)}>
                      <span className={item.status === "Open"?  "badge text-success rounded-pill d-inline": "badge text-danger rounded-pill d-inline"}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
              <div className="position-absolute end-0">
                <span className="fw-semibold text-muted">Status: </span>
                <span
                  className={
                    modalContent.content.status === "Open"
                      ? "me-4 pe-2 fw-bold text-success"
                      : " me-4 pe-2 fw-bold text-danger"
                  }
                >
                  {" "}
                  {modalContent.content.status}
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
                {modalContent.content.message}
              </p>
              <hr className="text-light" />
              <div className="d-flex justify-content-end align-items-center ">
                <Button
                  variant="white"
                  className="me-2 btn btn-md text-danger "
                >
                  close
                </Button>
                <Button
                  variant="white"
                  className="me-2 btn btn-md text-primary "
                >
                  Reply
                </Button>
              </div>
            </>
          ) : (
            <div className="align-items-center justify-content-center  ">
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src={text}
                  alt="textnode"
                  className="h-50 w-50 m-auto"
                  fluid
                />
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
