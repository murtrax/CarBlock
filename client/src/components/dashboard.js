
import React from 'react';
import { MDBRow, MDBCol } from "mdbreact";

import Fab from './dashComponents/fab';
import SideNav from './dashComponents/sideNav';
import Workshop from './dashComponents/workshopDetails';
import Profile from './dashComponents/profile';


const CardExample = () => {
  return (
      <div class = "mt-5">
          <MDBRow>
            <MDBCol sm="3">
                <Profile/>
                <SideNav/>  
            </MDBCol>
            <MDBCol sm="9">
                <Workshop/>
            </MDBCol>
          </MDBRow>
          <Fab/>
      </div>
  )
}

export default CardExample;