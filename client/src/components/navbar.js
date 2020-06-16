import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownToggle,
  MDBDropdownMenu,
} from "mdbreact";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { logoutUser } from "./../actions/authActions";

import Home from "./home"; //Home Page
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

// Importing React Redux and Redux Store and other important imports (DANIAL)
import store from "../store";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser } from "../actions/authActions";
import PrivateRoute from "./private-route/PrivateRoute";
import PrivateRouteRegAuth from "./private-route/PrivateRouteRegAuth";

import styles from "./styles/navbar.module.css";
import errorMessage from "./errorMessage";
import Success from "./success";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
    let links;
    let dashboardLink;

    if (this.props.auth.user.type == "Workshop") {
      dashboardLink = (
        <MDBNavItem>
          <MDBNavLink to="/workshopRepair">Repair</MDBNavLink>
        </MDBNavItem>
      );
    }
    if (this.props.auth.user.type == "Registration Auth") {
      dashboardLink = (
        <MDBNavItem>
          <MDBNavLink to="/dashboardWorkshop">Dashboard</MDBNavLink>
        </MDBNavItem>
      );
    }

    if (!this.props.auth.isAuthenticated) {
      links = (
        <MDBNavbar className={styles.bar} dark expand="md">
          <MDBNavbarBrand>
            <MDBNavLink to="/home">
              <img
                src={log}
                style={{ width: "7rem" }}
                className="rounded mx-auto d-block"
                alt="aligment"
              />
            </MDBNavLink>
          </MDBNavbarBrand>

          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBNavLink to="/home">Search</MDBNavLink>
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
                <MDBNavLink to="/login">Login</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      );
    } else {
      links = (
        <MDBNavbar className={styles.bar} dark expand="md">
          <MDBNavbarBrand>
            <MDBNavLink to="/home">
              <img
                src={log}
                style={{ width: "7rem" }}
                className="rounded mx-auto d-block"
                alt="aligment"
              />
            </MDBNavLink>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBNavLink to="/home">Search</MDBNavLink>
              </MDBNavItem>
              {dashboardLink}
              <MDBNavItem>
                <MDBNavLink to="#" onClick={() => this.props.logoutUser(false)}>
                  Logout
                </MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      );
    }

    return (
      <Router>
        {links}
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
          <PrivateRouteRegAuth exact path="/alert" component={Alert} />
          <PrivateRouteRegAuth exact path="/transfer" component={Transfer} />
          <PrivateRouteRegAuth exact path="/newCar" component={newCar} />
          <PrivateRoute
            exact
            path="/workshopRepair"
            component={repairWorkshop}
          />

          <Route path="/error" exact component={errorMessage} />
          <Route path="/success" exact component={Success} />
          <Route path="/searchResults/:opt&:id" exact component={carResults} />
        </Switch>
      </Router>
    );
  }
}

NavbarPage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(NavbarPage);
