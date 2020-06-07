import React, { Component } from "react";
import {
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBView
} from "mdbreact";

import rep1 from "./../images/rep1.png";
import rep2 from "./../images/rep2.png";
import rep3 from "./../images/rep3.png";
import rep4 from "./../images/rep4.png";
import rep5 from "./../images/rep5.png";



class CarouselPage extends Component {
  render() {
    return (
      <MDBContainer className = "mt-4 text-center float-center">
        <MDBCol className = "text-center">
          <MDBRow className = "text-center">
            <MDBView className = "text-center" waves>
              <img src={rep1} className="img-fluid" alt="" />
            </MDBView>
          </MDBRow>
          <MDBRow className = "mt-3" >
            <MDBView waves>
              <img src={rep2} className="img-fluid" alt="" />
            </MDBView>
          </MDBRow>
          <MDBRow className = "mt-3" >
            <MDBView waves>
              <img src={rep3} className="img-fluid" alt="" />
            </MDBView>
          </MDBRow>
          <MDBRow className = "mt-3" >
            <MDBView waves>
              <img src={rep4} className="img-fluid" alt="" />
            </MDBView>
          </MDBRow>
          <MDBRow className = "mt-3" >
            <MDBView waves>
              <img src={rep5} className="img-fluid" alt="" />
            </MDBView>
          </MDBRow>
        </MDBCol>
      </MDBContainer>
    );
  }
}

export default CarouselPage;