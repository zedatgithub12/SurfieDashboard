import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Box, Grid } from "@mui/material";
import { BsArrowLeftCircle } from "react-icons/bs";
import Sidebar from "../../components/Sidebar";
import Button from "react-bootstrap/Button";

const ViewPartner = () => {
  const { state } = useLocation();
  const partner = state ? state : {};
  const navigate = useNavigate();

  return (
    <div>
      <Sidebar />

      <Box margin={4}>
        <Grid container spacing={3} className=" p-4" justifyContent="center">
          <Grid item xs={6}>
            <Button
              variant="light"
              size="md"
              className="bg-white rounded-0"
              onClick={() => navigate("/partners")}
            >
              <BsArrowLeftCircle size={22} />
            </Button>
            <Box className="bg-white shadow-sm rounded p-3">
              <Typography variant="h6" className="mb-3 fw-bold mt-2">
                Partner Detail
              </Typography>
              <Box mb={2}>
                <Typography variant="body1">
                  <span className=""> Name: </span> {partner.fname}{" "}
                  {partner.mname} {partner.lname}
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="body1">
                  <span className=""> Email: </span> {partner.email}
                </Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="body1">
                  <span className=""> Phone: </span> {partner.phone}
                </Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="body1">
                  <span className=""> Organization: </span>{" "}
                  {partner.organization}
                </Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="body1">
                  <span className=""> Referral Code: </span>{" "}
                  {partner.referralcode}
                </Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="body1">
                  <span className=""> Balance: </span> {partner.balance} Birr
                </Typography>
              </Box>

              <Box mb={2}>
                <Typography variant="body1">
                  <span className=""> Status: </span>{" "}
                  {partner.status === 0 ? "Active" : "Inactive"}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ViewPartner;
