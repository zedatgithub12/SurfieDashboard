import React, { useState } from "react";
import { Col, FormCheck, Row } from "react-bootstrap";
import Gateways from "../data/PaymentGateways";

const Formthree = () => {
  const [selected, setSelected] = useState({
    checked: false,
    active: "",

  });

  const Select = (id) => {
    setSelected({
      ...selected,
      active: id,
    });

  };

  return (
    <Row>
      <Col>
        <div className="m-auto d-flex justify-content-center">
          <p>Choose payment method</p>
        </div>
      </Col>

      <div className="m-4 d-flex justify-content-center">
        {Gateways.map((item) => (
          <div
            key={item.id}
            className={
              selected.active === item.id
                ? "d-inline-flex m-1 border rounded p-2 pt-0 pb-0 border-success align-items-center justify-content-center cursor-pointer"
                : "d-inline-flex m-1 border rounded p-2 pt-0 pb-0  align-items-center justify-content-center cursor-pointer "
            }
            onClick={() => Select(item.id)}
          >
            <FormCheck
              aria-label="Radio button for following text input"
              checked={selected.active === item.id ? true : false}
              onChange={() => Select(item.id)}
              className="align-self-start"
            />

            <div className="m-2 justify-content-end">
              <img src={item.icon} width="60" height="60" alt="icon" />
              <p className="d-flex justify-content-end">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </Row>
  );
};

export default Formthree;
