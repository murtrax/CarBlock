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

// Redux related imports. (DANIAL)
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";

import styles from "./styles/form.module.css";
import signupIllustration from "../images/illustrations/signup.svg";

class FormPage extends React.Component {
  state = {
    fullName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    errors: {},
  };

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboardWorkshop");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  //This method handles the change in form fields and updates state accordingly
  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
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
    });
  };

  //This method submits the form data to the database using various checks
  submitForm = (e) => {
    e.preventDefault();
    const payload = {
      fullName: this.state.fullName,
      email: this.state.email,
      userName: this.state.userName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.registerUser(payload, this.props.history);
    if (this.state.errors == {}) {
      this.clearFields();
    }
  };

  render() {
    console.log(this.state.errors);
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
              alt="Illustration"
              className={`mt-3 img-fluid ${styles.illustrationHeight2}`}
              src={signupIllustration}
            />
          </MDBCol>
          <MDBCol className={"pt-4 pb-4"} md="6" lg="6">
            <MDBContainer className="mt-5">
              <MDBRow className="justify-content-center">
                <MDBCol md="12" sm="12" lg="12">
                  <MDBCard>
                    <MDBCardBody>
                      <form onSubmit={this.submitForm}>
                        <p
                          className={`h4 text-center py-4 ${styles.underline}`}
                        >
                          Sign up
                        </p>
                        <div className="grey-text mt-4">
                          <input
                            placeholder="Full Name"
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

                          <input
                            placeholder="Email"
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

                          <input
                            placeholder="User Name"
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

                          <input
                            placeholder="Password"
                            label="Password"
                            icon="lock"
                            group
                            type="password"
                            validate
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                          />

                          <input
                            placeholder="Confirm Password"
                            label="Confirm password"
                            icon="lock"
                            group
                            type="password"
                            validate
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="text-center py-2 mt-3">
                          <MDBBtn
                            className={`justify-content-center mt-2 ${styles.btn}`}
                            color="elegant"
                            type="submit"
                          >
                            <span className={``}>Sign up</span>
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

// Defining propTypes. (DANIAL)
FormPage.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

// Getting the state from Redux and mapping it to props which we can use in components. (DANIAL)
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

// Connecting the Register Component (signup) to the Redux Store using "connect" (DANIAL)
export default connect(mapStateToProps, { registerUser })(withRouter(FormPage));
