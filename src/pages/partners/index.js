import React, { useState } from "react";

// material-ui
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
  Box,
  InputAdornment,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
// project imports
// import { IconSearch } from "@tabler/icons";
import { BsSearch, BsTrash } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import PartnersData from "../../data/PartnerData";

// ==============================|| PARTNERS PAGE ||============================== //

const Partners = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [statusFilter, setStatusFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <>
      <Sidebar />

      <Box
        sx={{
          paddingX: 30,
        }}
        className="shadow-1 p-4 rounded "
      >
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
              <TextField
                label="Search"
                variant="outlined"
                color="primary"
                value={searchTerm}
                onChange={handleSearch}
                className="mb-4 rounded-4"
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

              <TableContainer component={Paper} className="shadow-sm">
                <Table>
                  <TableHead>
                    <TableRow>
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
                      >
                        <TableCell className="text-capitalize">
                          {item.fname} {item.mnam} {item.lname}
                        </TableCell>

                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.organization}</TableCell>
                        <TableCell>{item.referralcode}</TableCell>
                        <TableCell>{item.balance}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => alert("View")}>
                            <FaEye size={18} />
                          </IconButton>
                          <IconButton onClick={() => alert("delete")}>
                            <BsTrash size={18} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Partners;
