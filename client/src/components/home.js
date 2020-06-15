import React from "react";
import {
  MDBJumbotron,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCardTitle,
  MDBInput,
  MDBFormInline,
} from "mdbreact";
import validator from "validator";
import About from "./homeComponents/aboutCompany";
import Service from "./homeComponents/service";
import Team from "./homeComponents/team";
import styles from "./styles/home.module.css";

class JumbotronPage extends React.Component {
  state = {
    number: "",
    selectedOpt: "vin",
    owner: {},
    car: {},
  };

  clearFields = () => {
    this.setState({
      number: "",
    });
  };

  isValid = (data) => {
    if (validator.isEmpty(data.number)) {
      return false;
    } else {
      return true;
    }
  };

  //send data to server and recieve appropriate response
  submitForm = (e) => {
    e.preventDefault();

    const payload = {
      number: this.state.number,
      selectedOpt: this.state.selectedOpt,
    };

    if (this.isValid(payload)) {
      window.location =
        "/searchResults/" + payload.selectedOpt + "&" + payload.number;
    }
  };

  //Manages data in the state
  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleBtnChange = (e) => {
    this.setState({
      selectedOpt: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <div className={`${styles.back}`}>
          <MDBRow classNAme={` ${styles.maxWidth} `}>
            <MDBCol
              md="10"
              lg="10"
              className={` justify-content-center mx-auto text-center ${styles.searchWidth} pb-5`}
            >
              <MDBCol
                className={`text-white text-center py-3 justify-content-center mx-auto text-center`}
              >
                <MDBCol className="py-5 text-center">
                  <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold">
                    Car History Reports, Just One Search Away
                  </MDBCardTitle>
                  <p className="mx-5 mb-5">
                    Verified by CarBlocks Secure BlockChain Network
                  </p>
                  <form onSubmit={this.submitForm}>
                    <MDBInput
                      className="mw-75"
                      label="Search by Vin Number OR Registration Number"
                      background
                      name="number"
                      value={this.state.number}
                      onChange={this.handleChange}
                    />
                    {/*}<Radio />*/}
                    <MDBFormInline className="text-center mx-auto justify-content-center pt-2">
                      <p className="text-center">
                        <label>
                          <input
                            type="radio"
                            value="vin"
                            className={styles.radio}
                            checked={this.state.selectedOpt === "vin"}
                            onChange={this.handleBtnChange}
                          />
                          <span className={styles.white}>Vin Number</span>
                        </label>
                      </p>
                      <p className="ml-3">
                        <label>
                          <input
                            type="radio"
                            value="reg"
                            className={`${styles.radio} ${styles.input}`}
                            checked={this.state.selectedOpt === "reg"}
                            onChange={this.handleBtnChange}
                          />
                          <span className={styles.white}>Reg Number</span>
                        </label>
                      </p>
                    </MDBFormInline>
                    <MDBBtn
                      className={`justify-content-center mt-4 ${styles.btn}`}
                      color="elegant"
                      type="submit"
                    >
                      <span className={``}>Search</span>
                    </MDBBtn>
                  </form>
                </MDBCol>
              </MDBCol>
            </MDBCol>
          </MDBRow>

          <Service></Service>
        </div>
        <About></About>
        <Team></Team>
      </div>
    );
  }
}

export default JumbotronPage;
