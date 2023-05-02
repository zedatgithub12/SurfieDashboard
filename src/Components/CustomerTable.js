import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import { Button } from "react-bootstrap";
import { RxLoop, RxCheck } from "react-icons/rx";
import Connection from "../constants/Connections";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CustomerTable({
  id,
  remid,
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
}) {
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
  const [severity, setSeverity] = React.useState("info");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //calculate and return the license expire date
  const ExpireDate = (date) => {
    var duedate;

    if (date == null) {
      duedate = "Not payed!";
    } else {
      var year = date.slice(0, 4);
      var month = date.slice(5, 7);
      var day = date.slice(8, 10);
      duedate = day + "/" + month + "/" + year;
    }

    return duedate;
  };

  //activate pending users
  const Approve = (id) => {
    setLoading(true);
    var Api = Connection.api + Connection.activate + id; // update this line of code to the something like 'http://localhost:3000/customers?_page=1&_limit=${limit}
    var headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    var Data = {
      status: 1,
    };

    fetch(Api, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response == 0) {
          setLoading(false);
          setInitialValue({
            ...initialValue,
            errormsg: "Successfully Activated!",
          });
          setOpen(true);
          setSeverity("success");
        } else if (response == 1021) {
          setInitialValue({
            ...initialValue,
            errormsg: "The email is already registered!",
          });
          setLoading(false);
          setOpen(true);
          setSeverity("error");
        } else if (response == 1001) {
          setInitialValue({
            ...initialValue,
            errormsg: "Error Missing Parameter!",
          });
          setLoading(false);
          setOpen(true);
          setSeverity("error");
        } else if (response == 1002) {
          setInitialValue({
            ...initialValue,
            errormsg: "Invalid Username or Password!",
          });
          setLoading(false);
          setOpen(true);
          setSeverity("error");
        } else if (response == 1006) {
          setInitialValue({
            ...initialValue,
            errormsg: "Account id doesn't exist!",
          });
          setLoading(false);
          setOpen(true);
          setSeverity("error");
        } else if (response == 2002) {
          setInitialValue({
            ...initialValue,
            errormsg: "Account is already active!",
          });
          setLoading(false);
          setOpen(true);
          setSeverity("error");
        } else {
          setInitialValue({
            ...initialValue,
            errormsg: "Invalid response!",
          });
          setLoading(false);
          setOpen(true);
          setSeverity("error");
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  //reactivate terminated customer account
  const Reactivate = (id, remoteid) => {
    setLoading(true);
    var Api = Connection.api + Connection.reactivate + id; // update this line of code to the something like 'http://localhost:3000/customers?_page=1&_limit=${limit}
    var headers = {
      accept: "application/json",
      "Content-Type": "application/json",
    };

    var Data = {
      remote_id: remoteid,
      status: 1,
    };

    fetch(Api, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response == 0) {
          setLoading(false);
          setInitialValue({
            ...initialValue,
            errormsg: "Successfully Activated!",
          });
          setOpen(true);
          setSeverity("success");
        } else if (response == 1001) {
          setInitialValue({
            ...initialValue,
            errormsg: "Error Missing Parameter!",
          });
          setLoading(false);
          setOpen(true);
          setSeverity("error");
        } else if (response == 1002) {
          setInitialValue({
            ...initialValue,
            errormsg: "Invalid Username or Password!",
          });
          setLoading(false);
          setOpen(true);
          setSeverity("error");
        } else if (response == 1006) {
          setInitialValue({
            ...initialValue,
            errormsg: "Account id doesn't exist!",
          });
          setLoading(false);
          setOpen(true);
          setSeverity("error");
        } else if (response == 2002) {
          setInitialValue({
            ...initialValue,
            errormsg: "Account is already active!",
          });
          setLoading(false);
          setOpen(true);
          setSeverity("error");
        } else {
          setInitialValue({
            ...initialValue,
            errormsg: "Invalid response!",
          });
          setLoading(false);
          setOpen(true);
          setSeverity("error");
        }
      })
      .catch((e) => {
        setInitialValue({
          ...initialValue,
          errormsg: "There is an error activating account",
        });
        setLoading(false);
        setOpen(true);
        setSeverity("error");
      });
  };

  return (
    <>
      <tr className=" align-items-center pt-2">
        <td onClick={rowPressed}>{remid}</td>
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

        <td onClick={rowPressed}>{ExpireDate(date)}</td>
        <td className="text-end">
          {status == 0 ? (
            <Button
              onClick={() => Approve(id)}
              variant="white"
              className="btn btn-sm btn-outline-success border-0 my-1 text-end"
            >
              {" "}
              Activate{" "}
              {loading ? (
                <div
                  class="spinner-border spinner-border-sm text-white"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                <RxCheck size={18} className="pe-1 pb-1" />
              )}{" "}
            </Button>
          ) : status == 3 ? (
            <Button
              onClick={() => Reactivate(id, remid)}
              variant="white"
              className="btn btn-sm btn-outline-success border-0 my-1 text-end"
            >
              {" "}
              Reactivate
              {loading ? (
                <div
                  class="spinner-border spinner-border-sm text-white"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                <RxLoop size={18} className="pe-1 pb-1" />
              )}
            </Button>
          ) : (
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
              ></Dropdown.Toggle>

              <Dropdown.Menu variant="light">
                <Dropdown.Item onClick={add}>Change License</Dropdown.Item>

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

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {initialValue.errormsg}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}

export default CustomerTable;
