
import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import { Button } from "react-bootstrap";
import { RxLoop,RxCheck } from "react-icons/rx";
import Connection from "../constants/Connections";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
const PaymentList=({
    id,
    reference,
    name,
    email,
    amount,
    date,
    status,
    rowPressed,
    add,
    remove,
    deactivate,
    detach,
    currency,
  })=> {
  
    const [loading, setLoading] = useState(false);

    //modal dynamic attributes
    const [initialValue, setInitialValue] = useState({
      title: "",
      currentPlan: "",
      updatedInfo: "",
      operation: "",
      cofirmationtxt: "",
      errormsg: "",
      lid: "",
      cid: "",
    });
  
    const [open, setOpen] = React.useState(false);
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
       //calculate and return the license expire date
    const ExpireDate = (date) => {
      var duedate;
  
      if(date == null){
         duedate = "Not payed!";
      }
      else{
  
      
      var year = date.slice(0, 4);
      var month = date.slice(5, 7);
      var day = date.slice(8, 10);
      duedate = day + "/" + month + "/" + year;
      }
  
      return duedate;
    };
  
     
        return (
           <>
           
    <tr className=" align-items-center pt-2">
      <td onClick={rowPressed} className="small fw-semibold">{reference}</td>
      <td onClick={rowPressed}>
        <Row className="fs-6 fw-normal text-start text-capitalize ">
          {name}
        </Row>
      </td>
      <td onClick={rowPressed}>
        <Row className="fs-6 fw-normal text-start text-capitalize ">
          {email}
        </Row>
      </td>
      <td onClick={rowPressed} className="small fw-semibold"> {amount} {currency} </td>

      {status === "success" ? (
          <td onClick={rowPressed} >
            <span className="text-success bg-success bg-opacity-10 px-3 rounded text-center badge">
              Paid
            </span>
         </td>
      ) : (
        <span className="text-danger bg-danger bg-opacity-10 px-3 rounded text-center badge">
        Failed
      </span>
      )}
          <td onClick={rowPressed}>{ExpireDate(date)}</td>
           </tr>
           </>
        );
    
}

export default PaymentList;