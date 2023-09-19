import { useState, useEffect, forwardRef } from "react";
import Pagination from "@mui/material/Pagination";

// material-ui
import {
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Badge,
  Stack,
  Skeleton,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// project imports
import Sidebar from "../../components/Sidebar";
import Connection from "../../constants/Connections";
import { IconSend } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

// ==============================|| TRIALS PAGE ||============================== //

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Trials = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [emails, setEmails] = useState([]);
  const [popup, setPopup] = useState({
    status: false,
    severity: "info",
    message: "",
  });
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(1);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setPopup({
      ...popup,
      status: false,
    });
  };

  // arrange date in human readable format
  const DateSlice = (date) => {
    var year = date.slice(0, 4);
    var month = date.slice(5, 7);
    var day = date.slice(8, 10);
    return day + "/" + month + "/" + year;
  };

  const RemainingDates = (trial) => {
    const createdAt = new Date(trial);
    const remainingDays = Math.ceil(
      (createdAt.getTime() - Date.now()) / (1000 * 3600 * 24)
    );
    return remainingDays;
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const getCsrfToken = async () => {
    var Api = Connection.api;
    const response = await fetch(Api + "/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include", // Include cookies in the request
    });
    if (response.ok) {
      const data = await response.json();
      return data.csrf_token;
    }
    throw new Error("Failed to retrieve CSRF token");
  };

  useEffect(() => {
    const getTrialEmails = async () => {
      var Api = Connection.api + Connection.trials;

      const token = await getCsrfToken();
      var headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": token,
      };
      // Make the API call using fetch()
      fetch(Api, {
        method: "GET",
        credentials: "include",
        headers: headers,
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            setEmails(response.data);
            setNumPages(Math.ceil(response.data.length / 10));
            setLoading(false);
          } else {
            setEmails(emails);
            setLoading(false);
          }
        })
        .catch(() => {
          setPopup({
            ...popup,
            status: true,
            severity: "error",
            message: "There is error featching  users!",
          });
          setLoading(false);
        });
    };
    getTrialEmails();
    return () => {};
  }, []);

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
                    <Typography variant="h5" className="ps-5">
                      Free trials
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={1} md={1}></Grid>
          {loading ? (
            <Stack spacing={1} paddingX={2} marginLeft={7} marginTop={6}>
              {/* For variant="text", adjust the height via font-size */}
              <Skeleton
                variant="rounded"
                sx={{ fontSize: "1rem" }}
                width={650}
                height={50}
              />
              <Skeleton
                variant="rounded"
                sx={{ fontSize: "1rem" }}
                width={650}
                height={50}
              />
              <Skeleton variant="rounded" sx={{}} width={650} height={50} />
              <Skeleton
                variant="rounded"
                sx={{ fontSize: "1rem" }}
                width={650}
                height={50}
              />
              <Skeleton
                variant="rounded"
                sx={{ fontSize: "1rem" }}
                width={650}
                height={50}
              />
              <Skeleton
                variant="rounded"
                sx={{ fontSize: "1rem" }}
                width={650}
                height={50}
              />
              <Skeleton
                variant="rounded"
                sx={{ fontSize: "1rem" }}
                width={650}
                height={50}
              />
              <Skeleton variant="rounded" sx={{}} width={650} height={50} />
              <Skeleton
                variant="rounded"
                sx={{ fontSize: "1rem" }}
                width={650}
                height={50}
              />
              <Skeleton
                variant="rounded"
                sx={{ fontSize: "1rem" }}
                width={650}
                height={50}
              />
            </Stack>
          ) : (
            <Grid item xs={12} md={6} paddingX={2} marginLeft={3}>
              <Box paddingX="2" className="shadow-1 p-4 pt-2 rounded ">
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 700,
                    padding: 3,
                    paddingLeft: 0,
                    paddingTop: 0,
                  }}
                >
                  {emails.slice((page - 1) * 10, page * 10).map((user) => (
                    <ListItem
                      key={user.id}
                      disableGutters
                      secondaryAction={
                        <div className="d-flex pe-4 font-link">
                          <ListItemText
                            primary={
                              RemainingDates(user.created_at) >= 1 ? (
                                <Badge color="success" variant="dot" />
                              ) : (
                                <Badge color="error" variant="dot" />
                              )
                            }
                            paddingX={2}
                            marginX={2}
                          />

                          <ListItemText
                            primary={DateSlice(user.created_at)}
                            paddingX={2}
                            marginX={2}
                            className="ms-3"
                          />

                          <IconButton
                            className="ms-2 bg-white shadow-sm"
                            onClick={() =>
                              navigate("/emails", {
                                state: { ...user },
                              })
                            }
                          >
                            <IconSend size={18} className="primary-text" />
                          </IconButton>
                        </div>
                      }
                      sx={{
                        bgcolor: "background.paper",
                        padding: 3,
                        paddingY: 2,
                        marginTop: 1,
                        borderRadius: 3,
                      }}
                    >
                      <ListItemText
                        primary={user.email}
                        className="font-link"
                      />
                    </ListItem>
                  ))}
                </List>
                <Box
                  paddingX={2}
                  marginRight={3}
                  sx={{ display: "flex", marginTop: 3 }}
                >
                  <Pagination
                    count={numPages}
                    page={page}
                    onChange={handleChangePage}
                  />
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
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

export default Trials;
