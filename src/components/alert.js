
import React from 'react';
import { MDBRow, MDBCol } from "mdbreact";

import Fab from './dashComponents/fab';
import SideNav from './dashComponents/sideNav';
import Alert from './dashComponents/alerts';
import Profile from './dashComponents/profile';


const AlertExample = () => {
  return (
      <div class = "mt-5">
          <MDBRow>
            <MDBCol sm="3">
                <Profile/>
                <SideNav/>  
                <Fab/>
            </MDBCol>
            <MDBCol sm="8">
                <Alert/>
            </MDBCol>
          </MDBRow>
      </div>
  )
}

export default AlertExample;