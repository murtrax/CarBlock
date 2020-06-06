import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBIcon,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownToggle,
  MDBDropdownMenu,
} from "mdbreact";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./home"; //Home Page

import About from "./about"; //About Page

import SignUpUser from "./signup"; //User SignUp
import LogInUser from "./signin"; //Sign In (Workshop)
import Workshop from "./workshop"; //Workshop Sign Up
import Report from "./report"; //Display Report (dummy for now)
import DashBoard from "./dashboard"; //Workshop Dashboard
import Alert from "./alert"; //alert
import Transfer from "./ownerTransfer"; //transfer owner (reg auth)
import log from "./../images/block.png";
import newCar from "./addNewCar"; //add new car form (workshop)
import carResults from "./homeComponents/carResults"; //(display car report)
import repairWorkshop from "./repairWorkshop"; //add service and acc details

import DashboardWorkshop from "./dashboard/Dashboard"; //DUMMY dashboard

// Importing React Redux and Redux Store and other important imports (DANIAL)
import { Provider } from "react-redux";
import store from "../store";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import PrivateRoute from "./private-route/PrivateRoute";
import PrivateRouteRegAuth from "./private-route/PrivateRouteRegAuth";

import styles from "./styles/navbar.module.css";

// (DANIAL)
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./signin";
  }
}

class NavbarPage extends Component {
  state = {
    isOpen: false,
    isLoggedIn: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <MDBNavbar className={styles.bar} dark expand="md">
            <MDBNavbarBrand>
              <img
                src={log}
                style={{ width: "7rem" }}
                className="rounded mx-auto d-block"
                alt="aligment"
              />
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink to="/home">Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/login">Login</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/searchResult">Search</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      Register
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBNavLink to="/signup">
                        <MDBDropdownItem>User</MDBDropdownItem>
                      </MDBNavLink>
                      <MDBNavLink to="/workshop">
                        <MDBDropdownItem>Workshop</MDBDropdownItem>
                      </MDBNavLink>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>

                <MDBNavItem>
                  <MDBNavLink to="/report">Report</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/alert">Alerts</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/transfer">Transfer Owner</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/newCar">Add New Car</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/workshopRepair">Workshop Repair</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/signup" exact component={SignUpUser} />
            <Route path="/login" exact component={LogInUser} />
            <Route path="/workshop" exact component={Workshop} />
            <Route path="/report" exact component={Report} />
            <PrivateRouteRegAuth
              exact
              path="/dashboardWorkshop"
              component={DashBoard}
            />
            <PrivateRoute
              exact
              path="/workshopRepair"
              component={repairWorkshop}
            />
            <Route path="/alert" exact component={Alert} />
            <Route path="/transfer" exact component={Transfer} />
            <Route path="/newCar" exact component={newCar} />
            <Route
              path="/searchResults/:opt&:id"
              exact
              component={carResults}
            />
            {
              //}<Route path="/workshopRepair" exact component={repairWorkshop} />
            }{" "}
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default NavbarPage;
