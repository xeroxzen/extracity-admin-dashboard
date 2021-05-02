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
// import ReservationData from './components/reservations/ReservationData';
import ReservationTable from './components/reservations/ReservationTable'
import home from './pages/home/home';
import Reservations from './pages/reservations/reservations'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#34495E",
    },
    secondary: {
      main: "#0097a7",
    },
    body: {
      maxWidth: 750,
      backgroundColor: "#34495E",
    },
  },
});

const drawerWidth = 240;

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
              <h1>Extracity</h1>
              {/* <ReservationData /> */}
              {/* <ReservationTable /> */}
              <Reservations />
            </div>
          </ThemeProvider>
        </Container>
      </Switch>
    </Router>

  );
}

export default App;
