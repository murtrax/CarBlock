import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
// Redux imports
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";
import styles from "./styles/form.module.css";

import loginIllustration from "../images/illustrations/signin.svg";

class FormPage extends React.Component {
  state = {
    email: "",
    password: "",
    errors: {},
    errorBool: "",
    typeOfUser: "",
    color: "",
    submit: "false",
  };

  displayError = (message, errorType) => {
    console.log(this.state.errors);

    if (this.state.typeOfUser == "") {
      this.state.color = "red";
    } else {
      this.state.color = "";
    }

    let labels = [];
    let condition = "false";

    if (this.state.errorBool == "true") {
      if (
        this.state.errors.errors === "Incorrect Password" &&
        errorType[1] == this.state.errors.errors
      ) {
        condition = "true";
        return (
          <span style={{ color: "red" }}> {this.state.errors.errors}</span>
        );
      } else {
        for (var x = 0; x < errorType.length; x++) {
          if (this.state.errors.errors[errorType[x]]) {
            condition = "true";
            console.log();
            return (
              <span style={{ color: "red" }}>
                {" "}
                {this.state.errors.errors[errorType[x]]}
              </span>
            );
          }
        }
        if (condition === "false") {
          return message;
        } else {
          return labels;
        }
      }
    } else {
      return message;
    }
  };

  // (DANIAL)
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      const { type } = this.props.auth.user;
      if (type === "Workshop" || type === "Public User") {
        this.props.history.push("/workshopRepair"); // Push user to dashboard after login
      }
      if (type === "Registration Auth") {
        this.props.history.push("/dashboardWorkshop");
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { type } = nextProps.auth.user;
    if (nextProps.auth.isAuthenticated) {
      if (type === "Workshop" || type === "Public User") {
        this.props.history.push("/workshopRepair"); // Push user to dashboard after login (DANIAL)
      }
      if (type === "Registration Auth") {
        this.props.history.push("/dashboardWorkshop");
      }
    }

    if (nextProps.errors) {
      this.setState(
        {
          errors: nextProps.errors,
        },
        () => {
          this.setState({
            errorBool: "true",
          });
        }
      );
    }
  }

  //This method handles the change in form fields and updates state accordingly
  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
    //console.log(this.state);
  };

  resetFields = () => {
    this.setState({
      email: "",
      password: "",
      errorBool: "",
      errors: {},
      typeOfUser: "",
    });
  };

  onSubmit = (e) => {
    this.setState({
      submit: "true",
    });
    e.preventDefault();
    const payload = {
      email: this.state.email,
      password: this.state.password,
      typeOfUser: this.state.typeOfUser,
    };

    this.props.loginUser(payload);
    if (this.state.errors == {}) {
      this.resetFields();
      this.state.errorBool = "false";
    }
  };

  render() {
    const { errors } = this.state;
    if (this.state.typeOfUser == "") {
      this.state.color = "red";
    } else {
      this.state.color = "";
    }

    return (
      <div>
        <MDBRow>
          <MDBCol className={styles.color1} md="1" lg="1">
            &ensp;
          </MDBCol>
          <MDBCol className={styles.color2} md="11" lg="11">
            &ensp;
          </MDBCol>
        </MDBRow>
        <MDBRow className={styles.color4}>
          <MDBCol className={styles.color3} md="1" lg="1">
            &ensp;
          </MDBCol>
          <MDBCol
            className={`justify-content-center mx-auto text-right `}
            md="5"
            lg="5"
          >
            <img
              alt="illustration"
              className={`mt-3 img-fluid ${styles.illustrationHeight}`}
              src={loginIllustration}
            />
          </MDBCol>
          <MDBCol className={"pt-4 pb-4"} md="6" lg="6">
            <MDBContainer className="mt-5">
              <MDBRow className="justify-content-center">
                <MDBCol md="12" sm="12" lg="11">
                  <MDBCard>
                    <MDBCardBody>
                      <form onSubmit={this.onSubmit}>
                        <p
                          className={`h4 text-center py-4 ${styles.underline}`}
                        >
                          Log In
                        </p>

                        <div className="grey-text mt-5">
                          <MDBRow className="justify-content-center">
                            <MDBCol md="8" sm="12" lg="8">
                              <select
                                className="browser-default custom-select"
                                value={this.state.typeOfUser}
                                onChange={this.handleChange}
                                name="typeOfUser"
                                style={{
                                  color:
                                    this.state.typeOfUser == "" &&
                                    this.state.submit == "true"
                                      ? "red"
                                      : "",
                                }}
                              >
                                <option value="">Choose your option</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Public User">Public User</option>
                                <option value="Registration Auth">
                                  Registration Auth
                                </option>
                              </select>
                            </MDBCol>
                          </MDBRow>

                          <input
                            placeholder="Email"
                            label={this.displayError("Email", [
                              "emailEmpty",
                              "emailInvalid",
                            ])}
                            icon="envelope"
                            group
                            type="email"
                            validate
                            error="wrong"
                            success="right"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            className="mt-3"
                          />
                          <label style={{ color: "red" }}>
                          {this.displayError("", [
                              "emailEmpty",
                              "emailInvalid",
                            ])}
                          </label>

                          <input
                            placeholder="Password"
                            label={this.displayError("Password", [
                              "password",
                              "Incorrect Password",
                            ])}
                            icon="lock"
                            group
                            type="password"
                            validate
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            className="mt-5"
                          />
                          <label style={{ color: "red" }}>
                          {this.displayError("", ["password", "Incorrect Password"])}
                          </label>
                        </div>
                        <div className="text-center">
                          <MDBBtn
                            className={`justify-content-center mt-5 ${styles.btn}`}
                            color="elegant"
                            type="submit"
                          >
                            <span className={``}>Login</span>
                          </MDBBtn>
                        </div>
                      </form>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}

// Defining propTypes
FormPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

// Getting the state from Redux and mapping it to props which we can use in components.
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

// Connecting the Register Component (signup) to the Redux Store using "connect"
export default connect(mapStateToProps, { loginUser })(FormPage);
