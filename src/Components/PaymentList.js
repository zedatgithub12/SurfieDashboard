
import React from "react";
import Row from "react-bootstrap/Row";


const PaymentList=({
    reference,
    name,
    email,
    amount,
    date,
    status,
    rowPressed,
    currency,
  })=> {
  
   
     
  
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
           
    <tr className=" align-items-center py-3">
      <td onClick={rowPressed} className="small fw-semibold text-muted">{reference}</td>
      <td onClick={rowPressed}>
        <p className="fs-6 fw-normal text-start text-capitalize small">
          {name}
        </p>
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