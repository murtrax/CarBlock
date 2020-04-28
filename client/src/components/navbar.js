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

import Home from "./home";
import About from "./about";
import SignUpUser from "./signup";
import LogInUser from "./signin";
import Workshop from "./workshop";
import Report from "./report";
import DashBoard from "./dashboard";
import Alert from "./alert";
import Transfer from "./ownerTransfer";
import log from "./../images/block.png";
import newCar from "./addNewCar";
import carResults from "./homeComponents/carResults";
import repairWorkshop from "./repairWorkshop";

// Importing React Redux and Redux Store and other important imports (DANIAL)
import { Provider } from "react-redux";
import store from "../store";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import Register from "./signup";
import Login from "./signin";
import PrivateRoute from "./private-route/PrivateRoute";
import DashboardWorkshop from "./dashboard/Dashboard";

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
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <MDBNavbar color="elegant-color-dark" dark expand="md">
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
                <MDBNavItem active>
                  <MDBNavLink to="/home">Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/about">About</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/login">Login</MDBNavLink>
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
                      <MDBNavLink to="/Workshop">
                        <MDBDropdownItem>Workshop</MDBDropdownItem>
                      </MDBNavLink>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>

                <MDBNavItem>
                  <MDBNavLink to="/report">Report</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/dashboard">DashBoard</MDBNavLink>
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
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-light" to="#!">
                    <MDBIcon fab icon="twitter" />
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-light" to="#!">
                    <MDBIcon fab icon="google-plus-g" />
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem></MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/signup" exact component={SignUpUser} />
            <Route path="/login" exact component={LogInUser} />
            <Route path="/workshop" exact component={Workshop} />
            <Route path="/report" exact component={Report} />

            <PrivateRoute
              exact
              path="/dashboardWorkshop"
              component={DashboardWorkshop}
            />

            <Route path="/dashboard" exact component={DashBoard} />
            <Route path="/alert" exact component={Alert} />
            <Route path="/transfer" exact component={Transfer} />
            <Route path="/newCar" exact component={newCar} />
            <Route
              path="/searchResults/:opt&:id"
              exact
              component={carResults}
            />
            <Route path="/workshopRepair" exact component={repairWorkshop} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
export default NavbarPage;

/*
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light text-center" to="#!">
              <a href="#!"><MDBIcon fab icon="facebook" className = "white-text" />&ensp;&ensp; </a>
              <a href="#!"><MDBIcon fab icon="instagram" className = "white-text" />&ensp;&ensp; </a>
              <a href="#!"><MDBIcon fab icon="linkedin" className = "white-text" />&ensp;&ensp; </a>
              <a href="#!"><MDBIcon icon="at" className = "white-text" />&ensp;&ensp; </a>
              </MDBNavLink>
            </MDBNavItem>
*/
