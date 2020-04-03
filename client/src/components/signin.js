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
import Scard from "./signinComponents/signinCard";
import axios from "axios";

class FormPage extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
    errorBool: ""
  };

  //This method handles the change in form fields and updates state accordingly
  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
    console.log(this.state)
  };

  resetFields=()=> {
    this.setState({
      email: "",
    password: "",
    errorBool: "",
    errors: []
    })
  }

  onSubmit = e=> {
    e.preventDefault();
    
    const payload = {
      email: this.state.email,
      password: this.state.password
    }

    axios({
      url: "/signUp",
      method: "post",
      data: payload
    })
    .then(response=> {
      console.log(response)
      this.resetFields()
    })
    .catch(error=> {
      if (!error.response.data.isValid)
      {
          this.setState ({
            errors: error.response.data.errors
          })
          console.log(this.state.errors)

          this.setState({
            errorBool: "true"
          })
        }
    })
  }

  render() {
    return (
      <MDBContainer className="mt-5">
        <MDBRow className="justify-content-center">
          {/*}<MDBCol md="6">
            <Scard/>
          </MDBCol>*/}
          <MDBCol md="8" sm="10" lg="5">
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={this.onSubmit}>
                  <p className="h4 text-center py-4">Log In</p>
                  <div className="grey-text">
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
                    <label style={{color: "red"}}>{this.state.errors.email}</label>

                    <MDBInput
                      label="Password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    <label style={{color: "red"}}>{this.state.errors.password}</label>
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

export default FormPage;
