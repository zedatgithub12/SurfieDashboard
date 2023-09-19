import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { HiOutlineInbox } from "react-icons/hi";
import { BsArchive } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "draft-js/dist/Draft.css";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Connection from "../constants/Connections";

const Emaills = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const goBack = () => {
    navigate(-1);
  };

  const [compose, setCompose] = React.useState({
    fullname: state == null ? "Anonimious" : state.fullname,
    to: state == null ? "" : state.email,
    subject: "",
    message: "",
    show: false,
    errmsg: "",
  });

  const [loading, setLoading] = React.useState(false);
  const To = (event) => {
    setCompose({
      ...compose,
      to: event.target.value,
    });
  };

  const Subject = (event) => {
    setCompose({
      ...compose,
      subject: event.target.value,
    });
  };

  const Message = (event) => {
    setCompose({
      ...compose,
      message: event.target.value,
    });
  };

  const getCsrfToken = async () => {
    var Api = Connection.api;
    const response = await fetch(Api + "/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include", // Include cookies in the request
    });
    if (response.ok) {
      const data = await response.json();
      return data.csrf_token;
    }
    throw new Error("Failed to retrieve CSRF token");
  };

  const SendMail = async () => {
    if (compose.to === "" || compose.subject === "" || compose.message === "") {
      setCompose({
        ...compose,
        show: true,
        errmsg: "Please fill all fields",
      });
    } else {
      setLoading(true);
      var Api = Connection.api + Connection.compose;

      const token = await getCsrfToken();
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": token,
      };

      var data = {
        fullname: compose.fullname,
        email: compose.to,
        subject: compose.subject,
        description: compose.message,
        status: 1,
      };

      fetch(Api, {
        method: "POST",
        credentials: "include",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response === "succeed") {
            setCompose({
              ...compose,
              show: true,
              errmsg: "Successfully sent!",
            });
            setLoading(false);
          } else {
            setCompose({
              ...compose,
              show: true,
              errmsg: "Unable to send the mail!",
            });
            setLoading(false);
          }
        })
        .catch((e) => {
          setCompose({
            ...compose,
            show: true,
            errmsg: "Error sending the mail!",
          });
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Sidebar />

      <Container className="m-auto mt-4 m-lg pt-2  rounded bg-white">
        <Row className="m-4 mb-0 p-4 pb-0 ">
          <Col sm={3} className="justify-content-end">
            <p className="fw-bold fs-4 primary-text mb-0">Surfie Ethiopia</p>
            <p className="text-secondary">Mailing System</p>
          </Col>
        </Row>
        <Row className="m-4 mt-0 p-4 ">
          <Col sm={3} className="bg-light rounded-0 rounded-start ">
            <span className="d-flex align-items-center pt-2">
              {" "}
              <Button className="btn btn-md border-0 bg-light text-primary fw-semibold ps-0 ">
                Compose Email
              </Button>{" "}
            </span>
            <hr />
            <p className="align-item-center justify-content-center">
              <span>
                <HiOutlineInbox size={16} />
              </span>{" "}
              Conversation
            </p>

            <hr />
            <p>
              {" "}
              <span>
                <BsArchive size={16} />
              </span>{" "}
              Archived
            </p>
          </Col>
          <Col
            sm={9}
            className="bg-white border border-2 border-light rounded-0 rounded-end"
          >
            <Row className="mt-2 p-4 pt-1">
              <p className="fs-5 ms-2">Compose Email</p>

              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="to"
                  placeholder="To"
                  className="m-1 mb-0 rounded bg-light border-0"
                  defaultValue={compose.to}
                  onChange={To}
                  required
                />
              </InputGroup>

              <InputGroup>
                <Form.Control
                  aria-label="Subject"
                  placeholder="Subject"
                  className="m-1 mt-0 rounded bg-light border-0"
                  defaultValue={compose.subject}
                  onChange={Subject}
                  required
                />
              </InputGroup>
              <InputGroup>
                <textarea
                  className="m-1 mt-3  form-control bg-light border-0"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  placeholder="Compose here..."
                  defaultValue={compose.message}
                  onChange={Message}
                  required
                ></textarea>
              </InputGroup>
            </Row>
            <Row className="justify-content-end align-items-center  my-2 py-2">
              <Col
                sm={5}
                className="d-flex justify-content-start align-items-center "
              >
                {compose.show ? (
                  <div className="d-flex align-items-start align-self-start border-0 rounded-1 px-5 py-1">
                    <span className="">{compose.errmsg}</span>{" "}
                  </div>
                ) : null}
              </Col>
              <Col sm={2} className="justify-content-center align-items-center">
                <Button
                  onClick={goBack}
                  variant="light"
                  className="d-flex btn btn-md-light text-dark fw-semibold text-center justify-content-center border-0 px-4 fw-semibold"
                >
                  Back
                </Button>
              </Col>
              <Col
                sm={3}
                className="d-flex justify-content-center align-items-center"
              >
                <Button
                  className="d-flex btn primary-bg  text-center justify-content-center text-dark border-0 px-4 fw-semibold"
                  variant="light"
                  onClick={() => SendMail()}
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
                    <span>Send</span>
                  )}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Emaills;
