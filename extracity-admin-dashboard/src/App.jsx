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
import Reservations from './pages/reservations/Reservations'
import { AuthProvider } from "./contexts/AuthContext";
import home from "./pages/home/home";
import { login } from "./pages/accounts/login";
import { register } from "./pages/accounts/register";
import PrivateRoute from './PrivateRoute';

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
      maxWidth: "100%",
      backgroundColor: "#34495E",
    },
  },
});

const drawerWidth = 80;

const useStyles = makeStyles((theme) => ({
  body: {
    width: "105%",
    marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    marginTop: "70px",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Container>
            <ThemeProvider theme={theme}>
              <div className={classes.body}>
                <PrivateRoute exact path="/" component={home} />
                <PrivateRoute exact path='/reservations' component={Reservations} />
                <PrivateRoute exact path='/add-reservation' component={AddReservation} />
              </div>
              <div>
                <Route exact path='/login' component={login} />
                <Route exact path='register' component='login' />
              </div>
            </ThemeProvider>
          </Container>
        </Switch>
      </Router>
    </AuthProvider>


  );
}

export default App;
