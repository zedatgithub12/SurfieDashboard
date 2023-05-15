import React, { useState, useEffect } from "react";
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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { BsSearch, BsTrash } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { CSVLink } from "react-csv";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import Connection from "../../constants/Connections";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Partners = () => {
  const navigate = useNavigate();

  const [PartnersData, setPartnersData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
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
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRowSelect = (event, id) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelectedRows = [];

    if (selectedIndex === -1) {
      newSelectedRows = newSelectedRows.concat(selectedRows, id);
    } else if (selectedIndex === 0) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelectedRows = newSelectedRows.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedRows = newSelectedRows.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelectedRows);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = PartnersData.map((n) => n.id);
      setSelectedRows(newSelecteds);
      return;
    }
    setSelectedRows([]);
  };

  const filteredData = PartnersData.filter((item) => {
    if (statusFilter && item.status !== statusFilter) {
      return false;
    }
    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm, "i");
      if (
        !searchRegex.test(item.fname) &&
        !searchRegex.test(item.referralcode)
      ) {
        return false;
      }
    }
    return true;
  });

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const csvData =
    selectedRows.length > 0
      ? selectedRows.map((id) => {
          const partner = PartnersData.find((item) => item.id === id);
          return {
            Name: `${partner.fname} ${partner.mname} ${partner.lname}`,
            Email: partner.email,
            Phone: partner.phone,
            Organization: partner.organization,
            ReferralCode: partner.referralcode,
            Balance: partner.balance,
            Status: partner.status,
          };
        })
      : filteredData.map((item) => ({
          Name: `${item.fname} ${item.mname} ${item.lname}`,
          Email: item.email,
          Phone: item.phone,
          Organization: item.organization,
          ReferralCode: item.referralcode,
          Balance: item.balance,
          Status: item.status,
        }));

  const excelData = [
    {
      columns: [
        { title: "Name", width: { wpx: 150 } },
        { title: "Email", width: { wpx: 200 } },
        { title: "Phone", width: { wpx: 150 } },
        { title: "Organization", width: { wpx: 200 } },
        { title: "Referral Code", width: { wpx: 200 } },
        { title: "Balance", width: { wpx: 150 } },
        { title: "Status", width: { wpx: 150 } },
      ],
      data: csvData.map((item) => [
        { value: item.Name },
        { value: item.Email },
        { value: item.Phone },
        { value: item.Organization },
        { value: item.ReferralCode },
        { value: item.Balance },
        { value: item.Status },
      ]),
    },
  ];

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(csvData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Partners");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(fileData, "partners.xlsx");
  };

  // delete partner functionality
  const handleTrashClick = (item) => {
    setSelectedProduct(item);
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setSelectedProduct(null);
    setDialogOpen(false);
  };

  const Delete = () => {
    // Do something with the deleted category
    setSpinner(true);
    var Api = Connection.api + Connection.deletepartner + selectedProduct.id;
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
  useEffect(() => {
    const getPartners = () => {
      var Api = Connection.api + Connection.partners;
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
      };
      // Make the API call using fetch()
      fetch(Api, {
        method: "GET",
        headers: headers,
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            setPartnersData(response.data);
          } else {
            setPartnersData(PartnersData);
          }
        })
        .catch(() => {
          setPopup({
            ...popup,
            status: true,
            severity: "error",
            message: "There is error featching  users!",
          });
        });
    };
    getPartners();
    return () => {};
  }, [spinner]);
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
                      Partners
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
                  value={searchTerm}
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
                <div className="d-flex justify-content-center align-items-center">
                  <CSVLink
                    data={csvData}
                    filename={"partners.csv"}
                    className="text-decoration-none"
                  >
                    Export CSV
                  </CSVLink>
                  <Box ml={2}>
                    <Button variant="contained" onClick={handleExportExcel}>
                      Export Excel
                    </Button>
                  </Box>
                </div>
              </Box>

              <TableContainer component={Paper} className="shadow-sm">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Checkbox
                          indeterminate={
                            selectedRows.length > 0 &&
                            selectedRows.length < paginatedData.length
                          }
                          checked={
                            paginatedData.length > 0 &&
                            selectedRows.length === paginatedData.length
                          }
                          onChange={handleSelectAllClick}
                        />
                      </TableCell>
                      <TableCell className="fw-semibold">Name</TableCell>
                      <TableCell className="fw-semibold">Email</TableCell>
                      <TableCell className="fw-semibold">Phone</TableCell>
                      <TableCell className="fw-semibold">
                        Organization
                      </TableCell>
                      <TableCell className="fw-semibold">
                        Referral Code
                      </TableCell>
                      <TableCell className="fw-semibold">Balance</TableCell>
                      <TableCell className="fw-semibold">Status</TableCell>

                      <TableCell className="fw-semibold">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedData.map((item, index) => (
                      <TableRow
                        key={index}
                        hover
                        className="border-0 rounded cursor-pointer"
                        onClick={(event) => handleRowSelect(event, item.id)}
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.indexOf(item.id) !== -1}
                            inputProps={{ "aria-labelledby": item.name }}
                          />
                        </TableCell>
                        <TableCell className="text-capitalize">
                          {item.fname} {item.mname} {item.lname}
                        </TableCell>

                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.organization}</TableCell>
                        <TableCell>{item.referralcode}</TableCell>
                        <TableCell>{item.balance} Birr</TableCell>
                        <TableCell>
                          {item.status === 1 ? (
                            <span class="status status-danger">Inactive</span>
                          ) : (
                            <span class="status status-green">Active</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() =>
                              navigate("/viewpartners", { state: item })
                            }
                          >
                            <FaEye size={18} />
                          </IconButton>
                          <IconButton onClick={() => handleTrashClick(item)}>
                            <BsTrash size={18} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[15, 25, 50, 100]}
                component="div"
                count={filteredData.length}
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
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          Do you want to delete {selectedProduct ? selectedProduct.fname : ""} ?
        </DialogContent>
        <DialogActions>
          <Button variant="text" color="primary" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button
            variant="text"
            color="error"
            onClick={() => Delete(selectedProduct.id)}
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
      <Snackbar
        open={popup.status}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={popup.severity}
          sx={{ width: "100%" }}
        >
          {popup.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Partners;
