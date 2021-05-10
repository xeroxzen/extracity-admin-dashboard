import React from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import PrivateRoute from './PrivateRoute';
import Reservations from './pages/reservations/Reservations'
import AddReservation from './pages/reservations/AddReservation';
import { AuthProvider } from "./contexts/AuthContext";
import { login } from "./pages/accounts/login";
import { register } from "./pages/accounts/register";
import Trips from './pages/trips/Trips';
import AddTrip from './pages/trips/AddTrip';
import TripStops from './pages/trips/TripStops';
import AddTripStop from './pages/trips/AddTripStop';
import Fares from './pages/fares/Fares';
import AddFare from './pages/fares/AddFare';
import Homepage from "./pages/home/homepage";
import "@fontsource/roboto";
import Statistics from "./pages/statistics/Statistics";
import Payments from "./pages/payments/Payments";
import FaresGrid from "./components/fares/FaresGrid";

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
      fontFamily: 'Roboto',
    },
  },
});

// const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 80,
    fontSize: 13,
    width: '100%',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
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
              <div className={classes.root}>
                <PrivateRoute exact path="/" component={Homepage} />
                <PrivateRoute exact path='/reservations' component={Reservations} />
                <PrivateRoute exact path='/reservations/add-reservation' component={AddReservation} />
                <PrivateRoute exact path='/trips' component={Trips} />
                <PrivateRoute exact path='/trips/add' component={AddTrip} />
                <PrivateRoute exact path='/trips/:id/stops' component={TripStops} />
                <PrivateRoute exact path='/trips/:id/stops/add' component={AddTripStop} />
                <PrivateRoute exact path='/fares' component={Fares} />
                <PrivateRoute exact path="/fares-grid" component={FaresGrid} />
                <PrivateRoute exact path='/fares/add' component={AddFare} />
                <PrivateRoute exact path="/statistics" component={Statistics} />
                <PrivateRoute exact path="/payments" component={Payments} />
              </div>
              <div>
                <Route exact path='/login' component={login} />
                <Route exact path='/register' component={register} />
              </div>
            </ThemeProvider>
          </Container>
        </Switch>
      </Router>
    </AuthProvider>


  );
}

export default App;
