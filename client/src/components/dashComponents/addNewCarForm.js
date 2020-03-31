import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption
} from "mdbreact";

class CardExample extends React.Component {
  state = {
    vinNumber: "",
    regNumber: "",
    make: "",
    model: "",
    year: "",
    variant: ""
  };

  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  submitForm = e => {
    e.preventDefault();
    console.log(e);
  };

  render() {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol lg="12" md="12" sm="12">
            <form onSubmit={this.submitForm}>
              <MDBRow>
                <MDBCol md="12" sm="12" lg="11">
                  <MDBCard>
                    <MDBCardBody>
                      <h4 classNameName="text-center">Car Details</h4>

                      <input
                        placeholder="Vin Number of the Car"
                        name="vinNumber"
                        type="text"
                        className="validate"
                      />
                      <label for="first_name">Enter Vin Number</label>

                      <input
                        placeholder="Registration Number of the Car"
                        name="regNumber"
                        type="text"
                        className="validate"
                      />
                      <label for="first_name">Enter Registration Number</label>

                      <input
                        placeholder="Make / Company"
                        name="make"
                        type="text"
                        className="validate"
                      />
                      <label for="first_name">Make / Company</label>

                      <input
                        placeholder="Model / Name"
                        name="model"
                        type="text"
                        className="validate"
                      />
                      <label for="first_name">Model / Name</label>

                      <input
                        placeholder="Year of Manufacture"
                        name="year"
                        type="text"
                        className="validate"
                      />
                      <label for="first_name">Year of Manufacture</label>

                      <input
                        placeholder="Variant"
                        name="variant"
                        type="text"
                        className="validate"
                      />
                      <label for="first_name">Variant</label>

                      <MDBRow>
                        <MDBCol md="6" lg="6" sm="12">
                          <select className="browser-default custom-select">
                            <option>Choose your option</option>
                            <option value="Sedan">Sedan</option>
                            <option value="HatchBack">HatchBack</option>
                            <option value="Estate">Estate</option>
                            <option value="SUV">SUV</option>
                            <option value="CUV">CUV</option>
                            <option value="Coupe">Coupe</option>
                            <option value="Convertible">Convertible</option>
                            <option value="Van">Van</option>
                            <option value="Pickup Truck">Pickup Truck</option>
                          </select>
                          <label for="first_name">Type</label>
                        </MDBCol>
                        <MDBCol md="6" lg="6" sm="12">
                          <select className="browser-default custom-select">
                            <option>Choose your option</option>
                            <option value="Gas">Gas</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                          </select>
                          <label for="first_name">Fuel</label>
                        </MDBCol>
                        <MDBCol md="6" lg="6" sm="12">
                          <select className="browser-default custom-select">
                            <option>Choose your option</option>
                            <option value="Front Wheel Drive">
                              Front Wheel Drive
                            </option>
                            <option value="Rear Wheel Drive">
                              Rear Wheel Drive
                            </option>
                            <option value="All Wheel Drive">
                              All Wheel Drive
                            </option>
                            <option value="4 Wheel Drive">4 Wheel Drive</option>
                          </select>
                          <label for="first_name">Drive</label>
                        </MDBCol>
                      </MDBRow>

                      <br />
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol md="12" sm="12" lg="11">
                  <MDBCard>
                    <MDBCardBody>
                      <h4 classNameName="text-center">Owner Details</h4>

                      <input
                        placeholder="Full Name"
                        name="Full Name"
                        type="text"
                        className="validate"
                      />
                      <label for="first_name">ter Owner Name</label>

                      <input
                        placeholder="Owner CNIC"
                        name="ownerCNIC"
                        type="text"
                        className="validate"
                      />
                      <label for="first_name">CNIC</label>

                      <input
                        placeholder="Contact"
                        name="ownerContact"
                        type="text"
                        className="validate"
                      />
                      <label for="first_name">Contact</label>

                      <input
                        placeholder="City"
                        name="ownerCity"
                        type="text"
                        className="validate"
                      />
                      <label for="first_name">City</label>

                      <input
                        placeholder="State"
                        name="ownerState"
                        type="text"
                        className="validate"
                      />
                      <label for="first_name">State</label>

                      <input
                        placeholder="Mileage at time of purchase"
                        name="mileageAtPurchase"
                        type="text"
                        className="validate"
                      />
                      <label for="first_name">Mileage</label>
                      <br />
                      <br />
                      <button
                        class="btn waves-effect waves-light"
                        type="submit"
                      >
                        Transfer
                        <i class="material-icons right">send</i>
                      </button>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default CardExample;
