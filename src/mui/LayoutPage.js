import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "./Appbar1";
import jobs from "../jobs.json";
import BasicCard from "./Contentbox.js";
import Grid from "@mui/material/Unstable_Grid2";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Switch, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};

function LayoutPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [jobDisplay, setJobDisplay] = useState(jobs.slice(0, 4));
  const jobsPerPage = 5;
  const pageCount = Math.ceil(jobs.length / jobsPerPage);

  useEffect(() => {
    setJobDisplay(jobs.slice(currentPage * 4, (currentPage + 1) * 4));
  }, [currentPage]);

  const changePage = (value) => {
    console.log(value);
    setCurrentPage(value);
  };

  return (
    <>
      <ThemeProvider
        theme={isDarkTheme ? createTheme(dark) : createTheme(light)}
      >
        <CssBaseline />
        <Container>
          <Container>
            <Typography variant="body1">
              Dark Mode
              <Switch checked={isDarkTheme} onChange={changeTheme} />
            </Typography>
          </Container>
          <ResponsiveAppBar />

          <Grid container spacing={4} sx={{ mt: 1 }}>
            {jobDisplay.map((job) => (
              <Grid xs={12} md={4} lg={4} key={job.id}>
                <BasicCard job={job} />
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={pageCount}
            onChange={(e, value) => changePage(value)}
          />
          {/* import ReactPaginate from "react-paginate";
        PAGINATION CODE  
          <ReactPaginate 
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
          /> */}
        </Container>
      </ThemeProvider>
      {/* <Routes>
        <Route path="/*" element={<TestPage />}></Route>
        <Route path="login" element={<LoginPage />}></Route>
      </Routes> */}
    </>
  );
}

export default LayoutPage;
