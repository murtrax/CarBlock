import React from "react";
import { MDBRow, MDBCol } from "mdbreact";

import Fab from "./dashComponents/fab";
import SideNav from "./dashComponents/sideNav";
import Collapse from "./dashComponents/collapsible";
import Profile from "./dashComponents/profile";

const CardExample = () => {
  return (
    <div class="mt-5">
      <MDBRow>
        <MDBCol sm="3">
          <Profile />
          <SideNav />
          <Fab />
        </MDBCol>
        <MDBCol sm="8">
          <Collapse />
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default CardExample;
