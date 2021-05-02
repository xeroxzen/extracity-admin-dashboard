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
import Home from "./pages/home/home";
import "@fontsource/roboto";

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
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path='/reservations' component={Reservations} />
                <PrivateRoute exact path='/add-reservation' component={AddReservation} />
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
