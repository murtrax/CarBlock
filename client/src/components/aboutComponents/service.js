import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardGroup, MDBContainer,MDBIcon, MDBAnimation } from "mdbreact";

const PanelPage = () => {
return (
<MDBContainer>
    <h3 className = "mx-auto text-center mb-5" style = {{ "border-radius" : "23px"}}>
    <MDBAnimation type="fadeInLeft" reveal duration="1s" delay="1s">
    Features
    </MDBAnimation>
    </h3>
  <MDBCardGroup deck>
    <MDBCard>
      <MDBCardBody className = "text-center">
      <MDBAnimation type="fadeInUp" reveal duration="1s" delay="0.5s">
        <MDBIcon className="mb-4 light-blue-text" size="3x" icon="hands-helping" />
      </MDBAnimation>
        <MDBCardTitle tag="h5" className = "text-center">
          <MDBAnimation type="fadeInLeft" reveal duration="1s" delay="0.8s">
          Interoperability
          </MDBAnimation>
        </MDBCardTitle>
        <MDBCardText>
        <MDBAnimation type="fadeInLeft" reveal duration="1s" delay="1s">
          This is a wider panel with supporting text below as a natural
          lead-in to additional content. This content is a little bit
          longer.
        </MDBAnimation>
        </MDBCardText>
        <MDBCardText small muted>
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
    <MDBCard>
      <MDBCardBody className = "text-center">
        <MDBAnimation type="fadeInUp" reveal duration="1s" delay="0.5s">
          <MDBIcon className="mb-4 light-blue-text" size="3x" icon="file-signature" />
        </MDBAnimation>
        <MDBCardTitle tag="h5" className = "text-center">
        <MDBAnimation type="fadeInUp" reveal duration="1s" delay="0.8s">
          Genuine Reports
        </MDBAnimation>
        </MDBCardTitle>
        <MDBCardText>
          <MDBAnimation type="fadeInUp" reveal duration="1s" delay="1s">
          This panel has supporting text below as a natural lead-in to
          additional content.
          </MDBAnimation>
        </MDBCardText>
        <MDBCardText small muted>
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
    <MDBCard>
      <MDBCardBody className = "text-center">
        <MDBAnimation type="fadeInUp" reveal duration="1s" delay="0.5s">
         <MDBIcon className="mb-4 light-blue-text" size="3x" icon="link" />
        </MDBAnimation>
        <MDBCardTitle tag="h5" className = "text-center">
          <MDBAnimation type="fadeInRight" reveal duration="1s" delay="0.8s">
            Secure Supply Chain
          </MDBAnimation>
          </MDBCardTitle>
        <MDBCardText>
          <MDBAnimation type="fadeInRight" reveal duration="1s" delay="1s">
          This is a wider panel with supporting text below as a natural
          lead-in to additional content. This panel has even longer
          content than the first to show that equal height action.
          </MDBAnimation>
        </MDBCardText>
        <MDBCardText small muted>
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  </MDBCardGroup>
</MDBContainer>
);
};

export default PanelPage;