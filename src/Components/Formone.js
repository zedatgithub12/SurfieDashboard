import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

class Formone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      mname: "",
      lname: "",
      email: "",
      phone: "",
      livingAddress: "",
    };
  }

  UpdateFname(event) {
    this.setState({ fname: event.target.value });
  }
  UpdateMname(event) {
    this.setState({ mname: event.target.value });
  }
  UpdateLname(event) {
    this.setState({ lname: event.target.value });
  }
  UpdateEmail(event) {

  //  var emails = document.getElementById("Email").value;
   
    this.setState({ email: event.target.value });

}
   
  

  UpdatePhone(event) {
    this.setState({ phone: event.target.value });
  }

  UpdateAddress(event) {
    this.setState({ livingAddress: event.target.value });
  }

  render() {
    return (
      <div>
        <InputGroup className="mb-3 mt-5">
          <Form.Control
            type="text"
            value={this.state.fname}
            onChange={this.UpdateFname.bind(this)}
            className="m-2 rounded font-link "
            placeholder="First name"
            aria-label="First name"
            required
          />
          <Form.Control
            value={this.state.mname}
            onChange={this.UpdateMname.bind(this)}
            className="m-2 rounded font-link "
            placeholder="Middle name"
            aria-label="Middle name"
            required
          />
          <Form.Control
            className="m-2 rounded font-link "
            placeholder="Last name"
            aria-label="Last name"
            value={this.state.lname}
            onChange={this.UpdateLname.bind(this)}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3 mt-3">
          <Form.Control
          id="Email"
          type="email"
            className="m-2 rounded font-link "
            placeholder="Email Address"
            aria-label="Email Address"
            value={this.state.email}
            onChange={this.UpdateEmail.bind(this)}
            required
          />
          <Form.Control
            className="m-2 rounded font-link "
            placeholder="Phone Number"
            aria-label="Phone"
            value={this.state.phone}
            onChange={this.UpdatePhone.bind(this)}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3 mt-3">
          <Form.Control
            className="m-2 rounded font-link "
            placeholder="Living Address"
            aria-label="First name"
            value={this.state.livingAddress}
            onChange={this.UpdateAddress.bind(this)}
            required
          />
        </InputGroup>
      </div>
    );
  }
}

export default Formone;
