import React from "react";
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBCardBody, MDBCardText,  MDBCardTitle, MDBAnimation } from "mdbreact";

const JumbotronPage = () => {
  return (
    <MDBContainer className="mt-5 text-center">
      <MDBRow>
        <MDBCol>
          <MDBJumbotron className = "winter-neva-gradient">
            <MDBCardBody>
              <MDBCardTitle className="h2">
              <MDBAnimation type="fadeInRight" reveal duration="1.5s" delay="0.7s">
                Car Chain
              </MDBAnimation>
              </MDBCardTitle>
              <MDBAnimation type="fadeInLeft" reveal duration="1.5s" delay="1.2s">
              <p className="blue-text my-4 font-weight-bold">
                Know your Car.
              </p>
              </MDBAnimation>
              <MDBCardText>
              <MDBAnimation type="fadeIn" reveal duration="1.5s" delay="1.5s">
              CAR-CHAIN is a software designed to provide trusted, genuine and verifiable vehicle history reports spare part supply chain management system that will eradicate insecurities within prevailing solutions such as tampered reports and the use of non-OEM spare parts through its secure blockchain network.
              </MDBAnimation>
              </MDBCardText>
              <hr className="my-4" />
              <MDBAnimation type="fadeInUp" reveal duration="1.5s" delay="1.5s">
              <div className="pt-2">
              <a class="waves-effect waves-light btn"><i class="material-icons left pb-2"><MDBIcon icon="download" class = "pb-2" /></i>Download</a>
              <a class="waves-effect waves-light btn"><i class="material-icons right"><MDBIcon icon="star" /></i>Features</a>
              </div>
              </MDBAnimation>

            </MDBCardBody>
          </MDBJumbotron>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default JumbotronPage;