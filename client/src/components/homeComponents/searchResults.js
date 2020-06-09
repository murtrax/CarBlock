
import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

const searchCard = () => {
  return (
    <MDBCol>
      <MDBCard className = "text-center mt-4 mr-5" style={{ width: "18rem" }}>
        <MDBCardImage className="img-fluid" src="https://cache4.pakwheels.com/system/car_generation_pictures/4962/medium/Honda_Civic_Facelift_2019.jpg?1555253134" waves />
        <MDBCardBody>
          <MDBCardTitle>Honda Civic 2020</MDBCardTitle>
          <MDBCardText>
            PKR 35.5 - 44.8 lacs
          </MDBCardText>
          <MDBBtn href="#">Search</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default searchCard;