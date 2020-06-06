import React from "react";
import { MDBRow, MDBCol } from "mdbreact";

import Fab from "./dashComponents/fab";
import SideNav from "./dashComponents/sideNav";
import Alert from "./dashComponents/alerts";
import styles from "./styles/form.module.css";

const AlertExample = () => {
  return (
    <div className={styles.alertBack}>
      <MDBRow className="pt-5">
        <MDBCol sm="3">
          <SideNav />
          <Fab />
        </MDBCol>
        <MDBCol sm="8">
          <Alert />
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default AlertExample;
