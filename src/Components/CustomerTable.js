import React from "react";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import { Button } from "react-bootstrap";
import { RxLoop,RxCheck } from "react-icons/rx";

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
  deactivate,
  detach,
  approve,
  reactivate
}) {

     //calculate and return the license expire date
  const ExpireDate = (date, plan) => {
    var year = date.slice(0, 4);
    var month = date.slice(5, 7);
    var day = date.slice(8, 10);

    if (plan === "monthly") {
      month = parseInt(month) + 1;
    } else {
      year = parseInt(year) + 1;
    }

    return day + "/" + month + "/" + year;
  };

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

      <td onClick={rowPressed}>{ExpireDate(date, subscription)}</td>
      <td className="text-end">
        {status == 0 ?(
            <Button  onClick={approve} variant="white" className="btn btn-sm btn-outline-success border-0 my-1 text-end" > Activate <RxCheck size={18} className="pe-1 pb-1"/></Button>
        ): status == 3?(
          <Button  onClick={reactivate} variant="white" className="btn btn-sm btn-outline-success border-0 my-1 text-end" ><RxLoop size={18} className="pe-1 pb-1"/>Reactivate</Button>
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
