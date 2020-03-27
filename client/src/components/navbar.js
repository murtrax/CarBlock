import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBIcon } from "mdbreact";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from "./home";
import About from "./about";
import SignUpUser from "./signup";
import LogInUser from "./signin";
import Workshop from "./workshop";
import Report from "./report";
import DashBoard from './dashboard';
import Alert from './alert';
import Transfer from './ownerTransfer';
import log from "./../images/block.png";

class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    <Router>
      <MDBNavbar color="elegant-color-dark" dark expand="md">
        <MDBNavbarBrand>
        <img src={log} style = {{width : "7rem"}} className="rounded mx-auto d-block mb-2" alt="aligment" /></MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem active>
              <MDBNavLink to="home">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="about">About</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="login">Login</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="signup">Signup</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="report">Report</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="dashboard">DashBoard</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="alert">Alerts</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="transfer">Transfer Owner</MDBNavLink>
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
            <MDBNavItem>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/signup" component={SignUpUser} />
            <Route path="/login" component={LogInUser} />
            <Route path="/workshop" component={Workshop} />
            <Route path="/report" component={Report} />
            <Route path="/dashboard" component={DashBoard} />
            <Route path="/alert" component={Alert} />
            <Route path="/transfer" component={Transfer} />
      </Switch>
    </Router>
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