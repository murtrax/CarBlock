import React from "react";
import {
  MDBContainer, MDBRow,MDBCol, MDBInput,MDBBtn,MDBCard,MDBCardBody,
} from "mdbreact";

// Redux imports (DANIAL)
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";

class FormPage extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
    errorBool: "",
    typeOfUser: "",
    color: ""
  };

  displayError = (message, errorType) => {

    if (this.state.typeOfUser == "")
    {
      this.state.color = "red"
    }
    else {
      this.state.color = ""
    }

      let labels = [];
      let condition = "false";

      if (this.state.errorBool == "true") {
        for (var x = 0; x < errorType.length; x++) {
          console.log(this.state.errors.errors)
          if (this.state.errors.errors[errorType[x]]) {
            condition = "true";
            return <span style= {{color: "red"}}> {this.state.errors.errors[errorType[x]] }</span>
          }
        }
        if (condition === "false") {
          return message;
        } else {
          return labels;
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
      this.setState({
        errors: nextProps.errors,
        
      },()=> {
        this.setState({
          errorBool: "true"
        })
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
    e.preventDefault();
    const payload = {
      email: this.state.email,
      password: this.state.password,
      typeOfUser: this.state.typeOfUser,
    };

    this.props.loginUser(payload);
    if (this.state.errors == {}) {
      this.resetFields();
    }
  };

  render() {
    const { errors } = this.state;


    return (
      <MDBContainer className="mt-5">
        <MDBRow className="justify-content-center">
          <MDBCol md="8" sm="10" lg="5">
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={this.onSubmit}>
                  <p className="h4 text-center py-4">Log In</p>

                  <div className="grey-text">
                    <MDBRow className="justify-content-center">
                      <MDBCol md="8" sm="12" lg="8">
                        <select
                          className="browser-default custom-select"
                          value={this.state.typeOfUser}
                          onChange={this.handleChange}
                          name="typeOfUser"
                          style={{color: this.state.color}}
                        >
                          <option value = "">Choose your option</option>
                          <option value = "Workshop">Workshop</option>
                          <option value = "Public User">Public User</option>
                          <option value = "Registration Auth">
                            Registration Auth
                          </option>
                        </select>
                      </MDBCol>
                    </MDBRow>

                    <MDBInput
                      label={this.displayError("Email", ["emailEmpty", "emailInvalid"])}
                      icon="envelope"
                      group
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    <label style={{ color: "red" }}>
                      {this.state.errors.email}
                    </label>
                    

                    <MDBInput
                      label={this.displayError("Password", ["password"])}
                      icon="lock"
                      group
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    <label style={{ color: "red" }}>
                      {this.state.errors.password}
                    </label>
                  </div>
                  <div className="text-center py-4 mt-3">
                    <MDBBtn color="cyan" type="submit">
                      Login
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
