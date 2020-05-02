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
                      name="fullName"
                      value={this.state.fullName}
                      onChange={this.handleChange}
                    />
                    <MDBInput
                      label="Email"
                      icon="envelope"
                      group
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    <MDBInput
                      label="User name"
                      icon="user"
                      group
                      type="text"
                      name="userName"
                      value={this.state.userName}
                      onChange={this.handleChange}
                    />
                    <MDBInput
                      label="Password"
                      icon="lock"
                      group
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    <MDBInput
                      label="Confirm password"
                      icon="lock"
                      group
                      type="password"
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="text-center py-4 mt-3">
                    <MDBBtn color="cyan" type="submit">
                      Register
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
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
