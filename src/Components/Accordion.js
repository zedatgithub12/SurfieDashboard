import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function HightlightAccordion() {
  return (
    <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header >Monthly Subscribers</Accordion.Header>

        <Accordion.Body className="bg-white">
          <Row className="justify-content-md-start align-items-center">
            <Col sm={8}>
              <p className="fs-6">1 Device Subscribers</p>
            </Col>
            <Col sm={4}>
              <p className="fs-6 fw-bold text-secondary text-end">319846</p>
            </Col>
          </Row>
          <Row className="justify-content-md-start align-items-center">
            <Col sm={8}>
              <p className="fs-6">3 Device Subscribers</p>
            </Col>
            <Col sm={4}>
              <p className="fs-6 fw-bold text-secondary text-end">2314</p>
            </Col>
          </Row>
          <Row className="justify-content-md-start align-items-center mb-4">
            <Col sm={8}>
              <p className="fs-6">5 Device Subscribers</p>
            </Col>
            <Col sm={4} className="p-2 bd-highlight">
              <p className="fs-6 fw-bold text-secondary text-end">1341</p>
            </Col>
          </Row>

          <p className="fs-6">Estimated Monthly Revenue (ETB)</p>
          <hr />
          <Row className="mb-0">
            <Col>
              <p>143K</p>
            </Col>
            <Col>
              <p>143K</p>
            </Col>
            <Col>
              <p>143K</p>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Annual Subscribers</Accordion.Header>
        <Accordion.Body>
        <Row className="justify-content-md-start align-items-center">
            <Col sm={8}>
              <p className="fs-6">1 Device Subscribers</p>
            </Col>
            <Col sm={4}>
              <p className="fs-6 fw-bold text-secondary text-end">319846</p>
            </Col>
          </Row>
          <Row className="justify-content-md-start align-items-center">
            <Col sm={8}>
              <p className="fs-6">3 Device Subscribers</p>
            </Col>
            <Col sm={4}>
              <p className="fs-6 fw-bold text-secondary text-end">2314</p>
            </Col>
          </Row>
          <Row className="justify-content-md-start align-items-center mb-4">
            <Col sm={8}>
              <p className="fs-6">5 Device Subscribers</p>
            </Col>
            <Col sm={4} className="p-2 bd-highlight">
              <p className="fs-6 fw-bold text-secondary text-end">1341</p>
            </Col>
          </Row>

          <p className="fs-6">Estimated Annual Revenue (ETB)</p>
          <hr />
          <Row className="mb-0">
            <Col>
              <p>143K</p>
            </Col>
            <Col>
              <p>143K</p>
            </Col>
            <Col>
              <p>143K</p>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default HightlightAccordion;
