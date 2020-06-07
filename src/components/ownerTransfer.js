import React from "react";
import { MDBRow, MDBCol } from "mdbreact";
import Fab from "./dashComponents/fab";
import SideNav from "./dashComponents/sideNav";
import TransForm from "./dashComponents/transferForm";
import Profile from "./dashComponents/profile";

class CardExample extends React.Component {
  state = {};
  render() {
    return (
      <div class="mt-5">
        <MDBRow>
          <MDBCol sm="3">
            <Profile />
            <SideNav />
            <Fab />
          </MDBCol>
          <MDBCol sm="8">
            <TransForm />
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}

export default CardExample;
