import React from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import "@fontsource/roboto";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

// import firebase from "./firebase.config";
// import ReservationInput from "./components/reservations/ReservationInput";
import ReservationData from './components/reservations/ReservationData';
import ReservationTable from './components/reservations/ReservationTable'
// import home from './pages/home/home';
import Reservations from './pages/reservations/reservations'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff3d00",
      dark: '#002884',
      contrastText: '#fff',
      light: '#757ce8',
    },
    secondary: {
      light: '#ff7961',
      main: "#ff4569",
      dark: '#ba000d',
      contrastText: '#000',
    },
    body: {
      maxWidth: 750,
      backgroundColor: "#34495E",
    },
  },
});

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  body: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    marginTop: "68px",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Router>
      <Switch>
        <Container>
          <ThemeProvider theme={theme}>
            <div className={classes.body}>
              {/* <ReservationData /> */}
              {/* <ReservationTable /> */}
              <ReservationData />
              <Reservations />
            </div>
          </ThemeProvider>
        </Container>
      </Switch>
    </Router>

  );
}

export default App;
