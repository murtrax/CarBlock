import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody
} from "mdbreact";

import Scard from "./signupComponents/signupCard";
import axios from "axios";

// Redux related imports. (DANIAL)
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";


class FormPage extends React.Component {
  state = {
    fullName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    passError: ""
  };

  // (DANIAL)
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  // (DANIAL)
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  //This method handles the change in form fields and updates state accordingly
  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  //This method clears the form fields
  clearFields = () => {
    this.setState({
      fullName: "",
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
      passError: ""
    });
  };

  //This method validates password mismatch in form
  isValid = () => {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        password: "",
        confirmPassword: "",
        passError: "Passwords do not match!"
      });
      return false;
    } else return true;
  };

  //This method submits the form data to the database using various checks
  submitForm = e => {
    e.preventDefault();
    if (this.isValid()) {
      const payload = {
        fullName: this.state.fullName,
        email: this.state.email,
        userName: this.state.userName,
        password: this.state.password
      };

      /*
      axios({
        url: "/userSignUp",
        method: "post",
        data: payload
      })
        .then(() => console.log("send successful!"))
        .catch(() => console.log("error occurred!"));
      this.clearFields();
      */

      // (DANIAL)
      if (this.props.registerUser(payload, this.props.history)) {
        console.log("Payload sent to registerUser");
      }
    }
  };

  render() {

    let styles;

    if (this.state.passError) {
      styles = {
        borderBottom: "1px solid red"
      };
    } else {
      styles = {
        borderBottom: ""
      };
    }

    return (
      <MDBContainer className="mt-5">
        <MDBRow className="justify-content-center">
          <MDBCol md="8" sm="10" lg="5">
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={this.submitForm}>
                  <p className="h4 text-center py-4">Sign up</p>
                  <div className="grey-text">
                    <MDBInput
                      label="Full name"
                      icon="user"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      name="fullName"
                      value={this.state.fullName}
                      onChange={this.handleChange}
                    />

                    <MDBInput
                      label="Email"
                      icon="envelope"
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />

                    <MDBInput
                      label="User name"
                      icon="user"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      name="userName"
                      value={this.state.userName}
                      onChange={this.handleChange}
                    />

                    <MDBInput
                      label="Password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      style={styles}
                    />

                    <MDBInput
                      label="Confirm password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.handleChange}
                      style={styles}
                    />

                  </div>

                  {/* Render error message if passwords do not match */}
                  {this.state.passError ? (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12pt",
                        textAlign: "center"
                      }}
                    >
                      {this.state.passError}
                    </div>
                  ) : null}

                  <div className="text-center py-4 mt-3">
                    <MDBBtn color="cyan" type="submit">
                      Register
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          {/*}<MDBCol md="4">
            <Scard />
    </MDBCol>*/}
        </MDBRow>
      </MDBContainer>
    );
  }
}


// Defining propTypes. (DANIAL)
FormPage.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};


// Getting the state from Redux and mapping it to props which we can use in components. (DANIAL)
const mapStateToProps = state => ({
  auth:state.auth,
  errors: state.errors
});


// Connecting the Register Component (signup) to the Redux Store using "connect" (DANIAL)
export default connect(
  mapStateToProps,
  { registerUser }
) (withRouter(FormPage));
