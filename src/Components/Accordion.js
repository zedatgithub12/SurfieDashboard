import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function HightlightAccordion({mfive, mten, mfifty, afive,aten,afifty}) {
  return (
    <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header className="font-link">Monthly Subscribers</Accordion.Header>

        <Accordion.Body className="bg-white">
          <Row className="justify-content-md-start align-items-center">
            <Col sm={8}>
              <p className="fs-6 font-link">5 Device Subscribers</p>
            </Col>
            <Col sm={4}>
              <p className="fs-6 font-link fw-bold text-secondary text-end">{mfive}</p>
            </Col>
          </Row>
          <Row className="justify-content-md-start align-items-center">
            <Col sm={8}>
              <p className="fs-6 font-link">10 Device Subscribers</p>
            </Col>
            <Col sm={4}>
              <p className="fs-6 font-link fw-bold text-secondary text-end">{mten}</p>
            </Col>
          </Row>
          <Row className="justify-content-md-start align-items-center mb-4">
            <Col sm={8}>
              <p className="fs-6 font-link">15 Device Subscribers</p>
            </Col>
            <Col sm={4} className="p-2 bd-highlight">
              <p className="fs-6 font-link fw-bold text-secondary text-end">{mfifty}</p>
            </Col>
          </Row>

          <p className="fs-6 font-link">Estimated Monthly Revenue (ETB)</p>
          <hr />
          <Row className="mb-0">
            <Col>
              <p className="font-link">{mfive >= '5' ?(<span>{mfive*200} K</span>) : (<span> {mfive*200} birr </span>) }</p>
            </Col>
            <Col>
              <p className="font-link">{mten >= '4' ?(<span>{mten*300} K</span>) : (<span> {mten*300} birr </span>) }</p>
            </Col>
            <Col>
              <p className="font-link">{mfifty >= '2' ?(<span>{mfifty*500} K</span>) : (<span> {mfifty*500} birr </span>) }</p>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header className="font-link">Annual Subscribers</Accordion.Header>
        <Accordion.Body>
        <Row className="justify-content-md-start align-items-center">
            <Col sm={8}>
              <p className="fs-6 font-link">5 Device Subscribers</p>
            </Col>
            <Col sm={4}>
              <p className="fs-6 font-link fw-bold text-secondary text-end">{afive}</p>
            </Col>
          </Row>
          <Row className="justify-content-md-start align-items-center">
            <Col sm={8}>
              <p className="fs-6 font-link">10 Device Subscribers</p>
            </Col>
            <Col sm={4}>
              <p className="fs-6 font-link fw-bold text-secondary text-end">{aten}</p>
            </Col>
          </Row>
          <Row className="justify-content-md-start align-items-center mb-4">
            <Col sm={8}>
              <p className="fs-6 font-link">15 Device Subscribers</p>
            </Col>
            <Col sm={4} className="p-2 bd-highlight">
              <p className="fs-6 font-link fw-bold text-secondary text-end">{afifty}</p>
            </Col>
          </Row>

          <p className="fs-6 font-link">Estimated Annual Revenue (ETB)</p>
          <hr />
          <Row className="mb-0">
            <Col>
              <p className="font-link">{afive >= '1' ?(<span>{afive*2200} K</span>) : (<span> {afive*2200} birr </span>) }</p>
            </Col>
            <Col>
              <p className="font-link">{afive >= '1' ?(<span>{afive*3300} K</span>) : (<span> {afive*3300} birr </span>) }</p>
            </Col>
            <Col>
              <p className="font-link">{afive >= '1' ?(<span>{afive*5500} K</span>) : (<span> {afive*5500} birr </span>) }</p>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default HightlightAccordion;
