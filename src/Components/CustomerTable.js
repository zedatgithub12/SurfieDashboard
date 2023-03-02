import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

function CustomerTable({id, name, license, subscription, date, add, remove, detail }) {
  return (
   
        <tr >
          <td>{id}</td>
          <td>
          <Link to={detail}>
            <Row className="fs-6 fw-semibold text-start">{name}</Row>
            </Link>
            <Row className="text-secondary fs-6 text-start">{license} Device License</Row>

             </td>

          <td>{subscription}</td>
          <td>{date}</td>
          <td className="text-end">
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
              ></Dropdown.Toggle>

              <Dropdown.Menu variant="light">
                <Dropdown.Item onClick={add}>Add Subscription</Dropdown.Item>
                <Dropdown.Item onClick={remove}>Remove Subscription</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Deactivate Account</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Detach Account</Dropdown.Item>
                <Dropdown.Item href="/emails">Send Email</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>
      
  );
}

// remove, deactivate, detach, Email

export default CustomerTable;
