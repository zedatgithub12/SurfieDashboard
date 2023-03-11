import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import { Button } from "react-bootstrap";

function CustomerTable({
  id,
  name,
  license,
  subscription,
  date,
  status,
  rowPressed,
  add,
  remove,
  detail,
  deactivate,
  detach,
  approve
}) {
  const [period, setPeriod] = useState("monthly");
  const DateSlice=(date)=>{
    var year = date.slice(0,4);
    var month = date.slice(5,7);
    var day = date.slice(8,10);
    return day +"/"+ month +"/"+ year;
    }
  return (
    <tr className=" align-items-center pt-2">
      <td onClick={rowPressed}>{id}</td>
      <td onClick={rowPressed}>
        <Row className="fs-6 fw-semibold text-start text-capitalize">
          {name}
        </Row>
      </td>
      <td onClick={rowPressed}> {license} Device </td>

      {subscription === "monthly" ? (
        <td onClick={rowPressed} className="text-primary">
         Monthly
        </td>
      ) : (
        <td onClick={rowPressed} className="text-success">
         Annual
        </td>
      )}

      <td onClick={rowPressed}>{DateSlice(date)}</td>
      <td className="text-end">
        {status == "0"?(
            <Button  onClick={approve} variant="white" className="btn btn-sm btn-outline-success border-0 my-1 text-end" >Activate</Button>
        ):(
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
        )}
        
      </td>
    </tr>
  );
}

// remove, deactivate, detach, Email

export default CustomerTable;
