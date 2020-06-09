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
import axios from "axios";

//redux
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerWorkshop } from "../actions/authActions";

import styles from "./styles/form.module.css";

class FormPage extends React.Component {
  state = {
    ownerName: "",
    ownerPosition: "",
    ownerContact: "",
    ownerCNIC: "",
    companyName: "",
    companyEmail: "",
    companyPassword: "",
    companyConfirm: "",
    companyContact: "",
    companyAddress: "",
    companyCity: "",
    companyZip: "",
    errorBool: "",
    errors: {},
  };

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      const { type } = this.props.auth.user;
      if (type == "Workshop" || type == "Public User") {
        this.props.history.push("/workshopRepair"); // Push user to dashboard after login (DANIAL)
      }
      if (type == "Registration Auth") {
        this.props.history.push("/dashboardWorkshop");
      }
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

  clearFields = () => {
    this.setState({
      ownerName: "",
      ownerPosition: "",
      ownerContact: "",
      ownerCNIC: "",
      companyName: "",
      companyEmail: "",
      companyPassword: "",
      companyConfirm: "",
      companyContact: "",
      companyAddress: "",
      companyCity: "",
      companyZip: "",
      errorBool: "",
      errors: {},
    });
  };

  displayError = (errorType) => {
    let labels = [];
    let condition = "false";

    if (this.state.errorBool == "true") {
      for (var x = 0; x < errorType.length; x++) {
        if (this.state.errors[errorType[x]]) {
          condition = "true";
          labels[x] = (
            <React.Fragment>
              <label style={{ color: "red" }}>
                {this.state.errors[errorType[x]]}
              </label>
            </React.Fragment>
          );
        }
      }
      if (condition === "false") {
        return null;
      } else {
        return labels;
      }
    } else {
      return null;
    }
  };

  submitForm = (e) => {
    e.preventDefault();
    const payload = {
      ownerName: this.state.ownerName,
      ownerPosition: this.state.ownerPosition,
      ownerContact: this.state.ownerContact,
      ownerCNIC: this.state.ownerCNIC,
      companyName: this.state.companyName,
      companyEmail: this.state.companyEmail,
      companyPassword: this.state.companyPassword,
      companyConfirm: this.state.companyConfirm,
      companyContact: this.state.companyContact,
      companyAddress: this.state.companyAddress,
      companyCity: this.state.companyCity,
      companyZip: this.state.companyZip,
      approved: false,
    };

    this.props.registerWorkshop(payload, this.props.history);
    if (this.state.errors == {}) {
      this.clearFields();
    } else {
      let errorsTemp = this.state.errors;
      let isValidTemp = this.state.isValid;
      
      this.setState({
        errorBool: "true",
        errors: {errorsTemp}, 
      },()=>{
        this.setState({
          errorBool: "true"
        })
      });
    }

    /*axios({
        url: "/workshopSignUp",
        method: "post",
        data: payload,
      })
        .then((response) => {
          console.log(response);
          this.clearFields();
        })
        .catch((error) => {
          console.log(error.response.data);
          this.setState({
            errors: error.response.data.errors,
          });
          this.setState({
            errorBool: "true",
          });
        });*/
  };

  render() {
    //console.log(this.state.errors)
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
          <MDBCol className={"pt-4 pb-4"} md="11" lg="11">
            <MDBContainer className="mt-4">
              <MDBRow className="text-center">
                <MDBCol>
                  <p className={`h3 text-center py-4 ${styles.underline2}`}>
                    Workshop Registration
                  </p>
                </MDBCol>
              </MDBRow>

              <form onSubmit={this.submitForm}>
                <MDBRow className="justify-content-center">
                  <MDBCol md="6" sm="12" className="mb-4">
                    <MDBCard>
                      <MDBCardBody>
                        <p
                          className={`h4 text-center py-4 ${styles.underline}`}
                        >
                          Company Details
                        </p>
                        <div className="grey-text">
                          <input
                            placeholder="Company Name"
                            label="Company Name"
                            icon="user"
                            group
                            type="text"
                            //validate
                            error="wrong"
                            success="right"
                            name="companyName"
                            value={this.state.companyName}
                            onChange={this.handleChange}
                          />
                          {this.displayError(["companyName"])}
                          <input
                            placeholder="Company Email"
                            label="Company Email"
                            icon="envelope"
                            group
                            type="email"
                            //validate
                            error="wrong"
                            success="right"
                            name="companyEmail"
                            value={this.state.companyEmail}
                            onChange={this.handleChange}
                          />
                          {this.displayError(["companyEmail"])}
                          <input
                            placeholder="Password"
                            label="Password"
                            icon="lock"
                            group
                            type="password"
                            //validate
                            name="companyPassword"
                            value={this.state.companyPassword}
                            onChange={this.handleChange}
                          />
                          {this.displayError(["companyPassword"])}
                          <input
                            placeholder="Confirm Password"
                            label="Confirm Password"
                            icon="lock"
                            group
                            type="password"
                            //validate
                            name="companyConfirm"
                            value={this.state.companyConfirm}
                            onChange={this.handleChange}
                          />
                          {this.displayError(["companyConfirm"])}

                          <input
                            placeholder="Company Contact"
                            label="Company Contact"
                            icon="phone"
                            group
                            type="number"
                            //validate
                            error="wrong"
                            success="right"
                            name="companyContact"
                            value={this.state.companyContact}
                            onChange={this.handleChange}
                          />
                          {this.displayError([
                            "companyContact",
                            "companyContactNegative",
                            "companyContactLength",
                          ])}
                          <input
                            placeholder="Address"
                            label="Address"
                            icon="map-marked-alt"
                            group
                            type="text"
                            //validate
                            error="wrong"
                            success="right"
                            name="companyAddress"
                            value={this.state.companyAddress}
                            onChange={this.handleChange}
                          />
                          {this.displayError(["companyAddress"])}
                          <input
                            placeholder="City"
                            label="City"
                            icon="city"
                            group
                            type="text"
                            //validate
                            error="wrong"
                            success="right"
                            name="companyCity"
                            value={this.state.companyCity}
                            onChange={this.handleChange}
                          />
                          {this.displayError(["companyCity"])}
                          <input
                            placeholder="Zip Code"
                            label="Zip Code"
                            icon="envelope-open-text"
                            group
                            type="text"
                            //validate
                            error="wrong"
                            success="right"
                            name="companyZip"
                            value={this.state.companyZip}
                            onChange={this.handleChange}
                          />
                          {this.displayError([
                            "companyZip",
                            "companyZipNegative",
                          ])}
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>

                  <MDBCol md="6" sm="10" className="mb-4">
                    <MDBCard>
                      <MDBCardBody>
                        <p
                          className={`h4 text-center py-4 ${styles.underline}`}
                        >
                          Owner Details
                        </p>
                        <div className="grey-text">
                          <input
                            placeholder="Full Name"
                            label="Full name"
                            icon="user"
                            group
                            type="text"
                            //validate
                            error="wrong"
                            success="right"
                            name="ownerName"
                            value={this.state.ownerName}
                            onChange={this.handleChange}
                          />
                          {this.displayError(["ownerName"])}
                          <input
                            placeholder="Designation/Position"
                            label="Designation"
                            icon="user"
                            group
                            type="text"
                            //validate
                            error="wrong"
                            success="right"
                            name="ownerPosition"
                            value={this.state.ownerPosition}
                            onChange={this.handleChange}
                          />
                          {this.displayError(["ownerPosition"])}
                          <input
                            placeholder="Contact Number"
                            label="Contact Number"
                            icon="phone"
                            group
                            type="text"
                            //validate
                            error="wrong"
                            success="right"
                            name="ownerContact"
                            value={this.state.ownerContact}
                            onChange={this.handleChange}
                          />
                          {this.displayError([
                            "ownerContact",
                            "ownerContactNegative",
                            "ownerContactLength",
                          ])}
                          <input
                            placeholder="CNIC"
                            label="CNIC"
                            icon="fingerprint"
                            group
                            type="text"
                            name="ownerCNIC"
                            value={this.state.ownerCNIC}
                            onChange={this.handleChange}
                          />
                          {this.displayError([
                            "ownerCNIC",
                            "ownerCNICLength",
                            "ownerCNICNegative",
                          ])}
                        </div>
                      </MDBCardBody>
                    </MDBCard>

                    <MDBRow className="text-center">
                      <MDBCol>
                        <div className="text-center py-3">
                          <MDBBtn
                            className={`justify-content-center mt-2 ${styles.btn}`}
                            color="elegant"
                            type="submit"
                          >
                            <span className={``}>Register</span>
                          </MDBBtn>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
              </form>
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}

// Defining propTypes. (DANIAL)
FormPage.propTypes = {
  registerWorkshop: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

// Getting the state from Redux and mapping it to props which we can use in components. (DANIAL)
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors.errors,
  isValid: state.errors.isValid,
});

// Connecting the Register Component (signup) to the Redux Store using "connect" (DANIAL)
export default connect(mapStateToProps, { registerWorkshop })(
  withRouter(FormPage)
);
