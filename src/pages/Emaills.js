import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { HiOutlineInbox, HiOutlinePencilAlt } from "react-icons/hi";
import { TbBrandTelegram } from "react-icons/tb";
import { MdOutlineOutbox } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import { BsArchive } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ReactDOM from "react-dom";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { Link } from "react-router-dom";

const Emaills = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  return (
    <Container className="m-auto mt-4 m-lg  rounded bg-light">
      <Row className="m-4 mb-0 p-4 pb-0 bg-wa">
        <Col sm={3} className="justify-content-end">
          <p className="btn btn-md btn-primary justify-content-end">Compose</p>
        </Col>
        <Col sm={9}>
          <p>Mailer</p>
        </Col>
      </Row>
      <Row className="m-4 mt-0 p-4 ">
        <Col sm={3} className="bg-light rounded">
          <p className="fs-6 fw-bold pt-3">Mailbox</p>
          <hr />
          <p className="align-item-center justify-content-center">
            <span>
              <HiOutlineInbox />
            </span>{" "}
            Inbox
          </p>
          <hr />
          <p>
            <span>
              <TbBrandTelegram />
            </span>{" "}
            Sent
          </p>
          <hr />
          <p>
            <span>
              <HiOutlinePencilAlt />
            </span>{" "}
            Draft
          </p>
          <hr />
          <p>
            {" "}
            <span>
              <MdOutlineOutbox />
            </span>{" "}
            Outbox
          </p>
          <p className="fs-6 fw-bold">Filtered</p>
          <p>
            <span>
              <AiOutlineStar />
            </span>{" "}
            Starred
          </p>
          <hr />
          <p>
            {" "}
            <span>
              <BsArchive />
            </span>{" "}
            Archived
          </p>
        </Col>
        <Col sm={9} className="bg-white border rounded">
          <Row className="mt-4 p-4 pt-1">
            <h4>Compose Email</h4>
            <InputGroup className="mb-3">
              <Form.Control
                aria-label="to"
                placeholder="To"
                className="m-1 rounded"
              />
              <Form.Control
                aria-label="CC"
                placeholder="CC"
                className="m-1 rounded"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <Form.Control
                aria-label="BCC"
                placeholder="BCC"
                className="m-1 rounded"
              />
            </InputGroup>

            <InputGroup>
              <Form.Control
                aria-label="Subject"
                placeholder="Subject"
                className="m-1 rounded"
              />
            </InputGroup>
            <div className="border b-color-danger  bg-white rounded m-auto mt-3 ">
              <Editor
                placeholder="Compose email"
                editorState={editorState}
                onChange={setEditorState}
                className="border"
              >
                <Form.Control
                  aria-label="Body"
                  placeholder="Compose email"
                  className="m-1 rounded"
                />
              </Editor>
            </div>
          </Row>
          <Row className="justify-content-end align-items-center  m-2 p-2">
            <Col sm={2} className="justify-content-end align-items-end ">
            <Link
                to="/customers"
                className="d-flex btn btn-secondary text-white text-center justify-content-center "
              >
                Back
              </Link>
            </Col>
            <Col sm={2} className="d-flex justify-content-start align-items-start ">
              <Button
                className="d-flex btn btn-primary text-white text-center justify-content-center"
                variant="bg-white"
              >
                Send
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Emaills;
