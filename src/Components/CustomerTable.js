import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";

function CustomerTable({
  id,
  name,
  license,
  subscription,
  date,
  rowPressed,
  add,
  remove,
  detail,
  deactivate,
  detach,
}) {
  const [period, setPeriod] = useState("monthly");
  return (
    <tr className=" align-items-center pt-2">
      <td onClick={rowPressed}>{id}</td>
      <td onClick={rowPressed}>
        <Row className="fs-6 fw-semibold text-start text-capitalize">
          {name}
        </Row>
      </td>
      <td onClick={rowPressed}> {license} Device </td>

      {subscription === "1" ? (
        <td onClick={rowPressed} className="text-primary">
         Monthly
        </td>
      ) : (
        <td onClick={rowPressed} className="text-success">
         Annual
        </td>
      )}

      <td onClick={rowPressed}>{date}</td>
      <td className="text-end">
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            id="dropdown-basic"
          ></Dropdown.Toggle>

          <Dropdown.Menu variant="light">
            <Dropdown.Item onClick={add}>Add Subscription</Dropdown.Item>
            <Dropdown.Item onClick={remove}>Remove Subscription</Dropdown.Item>
            <Dropdown.Item onClick={deactivate}>
              Deactivate Account
            </Dropdown.Item>
            <Dropdown.Item onClick={detach}>Detach Account</Dropdown.Item>
            <Dropdown.Item href="/emails">Send Email</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
}

// remove, deactivate, detach, Email

export default CustomerTable;
