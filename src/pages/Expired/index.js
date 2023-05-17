import React, { useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  InputAdornment,
  Paper,
  IconButton,
  Typography,
  Checkbox,
  Button,
} from "@mui/material";
import Sidebar from "../../components/Sidebar";
import { BsSearch, BsTrash } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Connection from "../../constants/Connections";

const data = [
  {
    id: 3,
    fname: "Meseret",
    mname: "Tadesse",
    lname: "Girma",
    remote_id: 204,
    email: "meseretgirma@gmail.com",
    phone: "0912345678",
    living_address: "Hawassa",
    license: 5,
    subscription: "monthly",
    duedate: "20-5-2023",
    payment_method: 1002,
    coupon: "ASDFGhjkl",
    status: 1,
    created_at: "20-4-2023",
  },
  {
    id: 4,
    fname: "Tewodros",
    mname: "Tekle",
    lname: "Mengistu",
    remote_id: 205,
    email: "tewodrosmengistu@gmail.com",
    phone: "0911112222",
    living_address: "Bahir Dar",
    license: 5,
    subscription: "monthly",
    duedate: "10-6-2023",
    payment_method: 1001,
    coupon: "QWERTYuiop",
    status: 1,
    created_at: "10-5-2023",
  },
  // Add more data here
];

export default function ExpiredLicense() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [popup, setPopup] = useState({
    status: false,
    severity: "info",
    message: "",
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setPopup({
      ...popup,
      status: false,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleSearch = (event) => {
    setFilter(event.target.value);
  };

  const handleDialogClose = () => {
    setSelectedItem(null);
    setDialogOpen(false);
  };
  const handleTrashClick = (item) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };
  const filteredRows = data.filter((row) => {
    const values = Object.values(row);
    for (let i = 0; i < values.length; i++) {
      if (values[i].toString().toLowerCase().includes(filter.toLowerCase())) {
        return true;
      }
    }
    return false;
  });

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

  const paginatedData = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const Delete = () => {
    // Do something with the deleted category
    setSpinner(true);
    var Api = Connection.api + Connection.deletepartner + selectedItem.id;
    var headers = {
      accept: "application/json",
      "Content-Type": "application/json",
    };

    // Make the API call using fetch()
    fetch(Api, {
      method: "DELETE",
      headers: headers,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setPopup({
            ...popup,
            status: true,
            severity: "success",
            message: response.message,
          });
          // setProductData(productData);
          setSpinner(false);
          handleDialogClose();
        } else {
          setPopup({
            ...popup,
            status: true,
            severity: "error",
            message: response.message,
          });
          setSpinner(false);
        }
      })
      .catch(() => {
        setPopup({
          ...popup,
          status: true,
          severity: "error",
          message: "There is error deleting product!",
        });
        setSpinner(false);
      });
  };
  return (
    <>
      <Sidebar />

      <Box sx={{ paddingX: 30 }} className="shadow-1 p-4 rounded ">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={1}></Grid>
              <Grid item xs={11}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="h4" className="ps-4">
                      Expired Licenses
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} paddingX="2">
            <Box paddingX="2" className="shadow-1 p-4 rounded ">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <TextField
                  label="Search"
                  variant="outlined"
                  color="primary"
                  value={filter}
                  onChange={handleSearch}
                  className="mb-4 rounded w-25"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <BsSearch />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <TableContainer className="">
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="fw-semibold">id</TableCell>
                      <TableCell className="fw-semibold">Remote Id</TableCell>
                      <TableCell className="fw-semibold">First Name</TableCell>
                      <TableCell className="fw-semibold">Middle Name</TableCell>
                      <TableCell className="fw-semibold">Email</TableCell>
                      <TableCell className="fw-semibold">Phone</TableCell>
                      <TableCell className="fw-semibold">License</TableCell>
                      <TableCell className="fw-semibold">
                        Subscription
                      </TableCell>
                      <TableCell className="fw-semibold">Duedate</TableCell>
                      <TableCell className="fw-semibold">Status</TableCell>

                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedData.map((customer) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={customer.id}
                        >
                          <TableCell>{customer.id}</TableCell>
                          <TableCell>{customer.remote_id}</TableCell>
                          <TableCell>{customer.fname}</TableCell>
                          <TableCell>{customer.mname}</TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.phone}</TableCell>
                          <TableCell>{customer.license}</TableCell>
                          <TableCell>{customer.subscription}</TableCell>
                          <TableCell>{customer.duedate}</TableCell>
                          <TableCell>{customer.status}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() =>
                                navigate("/viewpartners", { state: customer })
                              }
                            >
                              <FaEye size={18} />
                            </IconButton>
                            <IconButton
                              onClick={() => handleTrashClick(customer)}
                            >
                              <BsTrash size={18} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          Do you want to delete {selectedItem ? selectedItem.fname : ""} ?
        </DialogContent>
        <DialogActions>
          <Button variant="text" color="primary" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button
            variant="text"
            color="error"
            onClick={() => Delete(selectedItem.id)}
          >
            {spinner ? (
              <div
                className="spinner-border spinner-border-sm text-dark "
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Yes"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
