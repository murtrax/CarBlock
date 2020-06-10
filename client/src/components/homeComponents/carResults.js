import React, { Component } from "react";
import axios from "axios";
import { MDBRow, MDBCol, MDBIcon } from "mdbreact";
import styles from "../styles/carResult.module.css";

const array = [
  { comments: "hi" },
  { comments: "hi1" },
  { comments: "hi2" },
  { comments: "hi3" },
  { comments: "hi4" },
  { comments: "hi5" },
  { comments: "hi6" },
];

const SList = (props) => {
  return (
    <>
      {props.list.map((r) => (
        <li key={r.millage} className={`list-group-item`}>
          <div className="md-v-line"></div>
          <MDBIcon className="mr-4 pr-3" icon="toolbox" />
          {r.comments}
          <div className="text-right">
            <span>Mileage: {r.millage}</span>
            <span className="pl-3">Date: {r.date.substring(0, 10)}</span>
          </div>
        </li>
      ))}
    </>
  );
};

const AList = (props) => {
  return (
    <>
      {props.list.map((r) => (
        <li key={r.millage} className={`list-group-item`}>
          <div className="md-v-line"></div>
          <MDBIcon className="mr-4 pr-3" icon="car-crash" />
          {r.comments}
          <div className="text-right">
            <span>Mileage: {r.millage}</span>
            <span className="pl-3">Date: {r.date.substring(0, 10)}</span>
          </div>
        </li>
      ))}
    </>
  );
};

class CarResults extends Component {
  state = {
    owner: {},
    car: {},
    error: "",
    service: [],
    accident: [],
  };

  //Set the state with parameters passed down as soon as the component mounts
  componentDidMount() {
    this.getResult();
  }

  getResult = () => {
    const { opt, id } = this.props.match.params;
    const payload = {
      number: id,
      selectedOpt: opt,
    };
    axios({
      url: "/searchCar",
      method: "post",
      data: payload,
    })
      .then((response) => {
        console.log(response.data);
        this.setState({
          car: response.data.car[0],
          service: response.data.car[1],
          owner: response.data.car[2],
          accident: response.data.car[3],
        });
        console.log(this.state);
      })
      .catch((err) => {
        console.log(err.response.data);
        this.setState({
          error: err.response.data,
        });
      });
  };

  render() {
    return (
      <div className={`text-center pt-4 ${styles.body}`}>
        <MDBRow>
          <MDBCol md="4" className="offset-md-1">
            <MDBRow>
              <MDBCol className="text-left card pt-2 pb-2 align-content-left">
                <div className={styles.listItem}>
                  <h5>Owner Information</h5>
                </div>
                <div className={styles.listElement}>
                  City: {this.state.owner.city}
                </div>
                <div className={styles.listElement}>
                  Milage: {this.state.owner.millage}
                </div>
                <div className={styles.listElement}>
                  State: {this.state.owner.state}
                </div>
                <div className={styles.listElement}>
                  Year of Purchase: {this.state.owner.yearPurchased}
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol className="text-left card pt-2 pb-2 align-content-left">
                <div className={styles.listItem}>
                  <h5>Vehicle Information</h5>
                </div>
                <div className={styles.listElement}>
                  Drive: {this.state.car.drive}
                </div>
                <div className={styles.listElement}>
                  Fuel: {this.state.car.fuel}
                </div>
                <div className={styles.listElement}>
                  Make: {this.state.car.make}
                </div>
                <div className={styles.listElement}>
                  Model: {this.state.car.model}
                </div>
                <div className={styles.listElement}>
                  Reg: {this.state.car.reg}
                </div>
                <div className={styles.listElement}>
                  Type: {this.state.car.type}
                </div>
                <div className={styles.listElement}>
                  Variant: {this.state.car.variant}
                </div>
                <div className={styles.listElement}>
                  Vin: {this.state.car.vin}
                </div>
                <div className={styles.listElement}>
                  Year: {this.state.car.year}
                </div>
              </MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol md="6">
            <div className={`card ${styles.snapshot} text-left`}>
              <li className={`list-group-item ${styles.listFeature}`}>
                <div className="md-v-line"></div>
                <MDBIcon className="mr-4 pt-3 pr-2" size="3x" icon="users" />
                <span className={styles.feat}>Recent Owners: 1</span>
              </li>
              <li className={`list-group-item ${styles.listFeature}`}>
                <div className="md-v-line"></div>
                <MDBIcon className="mr-4 pt-3 pr-3" size="3x" icon="tools" />
                <span className={styles.feat}>
                  Service Records: {this.state.service.length}
                </span>
              </li>
              <li className={`list-group-item ${styles.listFeature}`}>
                <div className="md-v-line"></div>
                <MDBIcon className="mr-4 pt-3 pr-3" size="3x" icon="compass" />
                <span className={styles.feat}>
                  Last Owned In: {this.state.owner.state}
                </span>
              </li>
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="5" className="offset-md-1 text-left">
            <ul className={`list-group card ${styles.scrollable}`}>
              <li className={`list-group-item ${styles.listHeading}`}>
                <div className="md-v-line"></div>
                <i className="fas fa-laptop mr-4 pr-3"></i>Service History
              </li>
              <SList list={this.state.service} />
            </ul>
          </MDBCol>
          <MDBCol md="5" className="text-left">
            <ul className={`list-group card ${styles.scrollable}`}>
              <li className={`list-group-item ${styles.listHeading}`}>
                <div className="md-v-line"></div>
                <i className="fas fa-laptop mr-4 pr-3"></i>Accident Report
              </li>
              <AList list={this.state.accident} />
            </ul>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}

export default CarResults;

/*
<h1>{this.state.owner.state}</h1>
<h1>{this.state.car.make}</h1>
<h1>{this.state.car.model}</h1>
*/
