import React, { Component, useState} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";

const Formtwo =()=>  {
 
        const [license, setLicense] = useState();
        return (
            <div>
            <InputGroup className="mb-3 mt-5">
            <InputGroup.Text className="d-flex text-white fw-bold bg-success font-link border-success align-self-center">@</InputGroup.Text>
            <Form.Control className="me-2  font-link border-success" placeholder="Username" aria-label="Username" />
                 </InputGroup>
    
            <InputGroup className="mb-3 mt-3">
            <InputGroup.Text className="d-flex text-white fw-bold bg-success font-link border-success align-self-center">***</InputGroup.Text>
            <Form.Control type='password' className="me-2  font-link border-success" placeholder="Password" aria-label="Password" />
              <Form.Control type='password' className="me-2  font-link border-success" placeholder="Confirm Password" aria-label="Confirm Password" />
             
            </InputGroup>

            <InputGroup>

            <Dropdown>
                    <Dropdown.Toggle
                      variant="light"
                      title="1 License"
                      id="dropdown-basic"
                      className='text-success border m-0 me-5 fw-semibold font-link' 
                    >
                      {license} License
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="light">
                      <Dropdown.Item onClick={() => setLicense(1)}>
                        1 License
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setLicense(3)}>
                        3 License
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setLicense(5)}>
                        5 License
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setLicense(10)}>
                        10 License
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setLicense(20)}>
                        20 License
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  
            <Dropdown>
                    <Dropdown.Toggle
                      variant="light"
                      title="1 License"
                      id="dropdown-basic"
                      className='bg-success text-white fw-semibold font-link' 
                    >
                      {license} License
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="light" >
                      <Dropdown.Item  onClick={() => setLicense(1)}>
                        1 License
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setLicense(3)}>
                        3 License
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setLicense(5)}>
                        5 License
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setLicense(10)}>
                        10 License
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setLicense(20)}>
                        20 License
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  </InputGroup>
          </div>
        );
    }

export default Formtwo;