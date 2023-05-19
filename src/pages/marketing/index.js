// material-ui
import { Typography, Grid, Box } from "@mui/material";

// project imports
import Sidebar from "../../components/Sidebar";
// ==============================|| SAMPLE PAGE ||============================== //

const Marketing = () => (
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
                    Marketing
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={1} md={1}></Grid>
        <Grid item xs={12} md={6} paddingX={2} marginLeft={3}>
          <Box paddingX="2" className="shadow-1 p-4 pt-2 rounded ">
            <Typography variant="h5" className="ps-5">
              Sponsors Logo Section
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} paddingX={2} marginLeft={3}>
          <Box paddingX="2" className="shadow-1 p-4 pt-2 rounded ">
            <Typography variant="h5" className="ps-5">
              Coupon adding and listing section
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  </>
);

export default Marketing;
