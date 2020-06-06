import React from "react";
import { MDBRow, MDBCol } from "mdbreact";
import Fab from "./dashComponents/fab";
import SideNav from "./dashComponents/sideNav";
import NewCarForm from "./dashComponents/addNewCarForm";
import styles from "./styles/form.module.css";

class CardExample extends React.Component {
  state = {};
  render() {
    return (
      <div className={`${styles.formback}`}>
        <MDBRow className="pt-5">
          <MDBCol sm="3">
            <SideNav />
            <Fab />
          </MDBCol>
          <MDBCol sm="9">
            <NewCarForm />
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}

export default CardExample;
