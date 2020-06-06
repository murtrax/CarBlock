import React from "react";
import { MDBRow, MDBCol } from "mdbreact";
import Fab from "./dashComponents/fab";
import SideNav from "./dashComponents/sideNav";
import TransForm from "./dashComponents/transferForm";
import Profile from "./dashComponents/profile";
import styles from "./styles/form.module.css";

class CardExample extends React.Component {
  state = {};
  render() {
    return (
      <div className={`${styles.formback}`}>
        <MDBRow className="pt-5">
          <MDBCol sm="3">
            <SideNav />
          </MDBCol>
          <MDBCol sm="8">
            <TransForm />
          </MDBCol>
        </MDBRow>
        <Fab />
      </div>
    );
  }
}

export default CardExample;
