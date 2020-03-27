import React from "react";
import {MDBJumbotron, MDBBtn, MDBRow, MDBCol, MDBCardTitle, MDBIcon, MDBInput,MDBAnimation,MDBContainer} from "mdbreact";
import Radio from "./homeComponents/radioBtn";
import SearchResults from "./homeComponents/searchResults";


const JumbotronPage = () => {
  return (
      <div>
      <MDBRow>
        <MDBCol>
          <MDBJumbotron style={{ padding: 0 }} className = "text-center mw-100">
            <MDBCol className="text-white text-center py-3 px-4" style={{ opacity: "", backgroundImage: `url(https://miro.medium.com/max/3200/1*CvjclMDwgh9AqED_h5UVCA.jpeg)` }}>
              <MDBCol className="py-5 text-center">
                <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold">Search Vehicle to see their Vehicle History Report</MDBCardTitle>
                <p className="mx-5 mb-5">
                  Search vehicle by its Registration Number or Vin Number, if it is on the system you will b able to see its vehicle history report quickly.
                </p>
                <MDBInput className="mw-75" label="Search by Vin Number OR Registration Number" background />
                <Radio/>
                <MDBAnimation reveal type="fadeInUp" duration="1s" delay="1s">
                <a class="waves-effect waves-light btn-large"><i class="material-icons left">search</i>Search</a>
                </MDBAnimation>
              </MDBCol>
            </MDBCol>
          </MDBJumbotron>
        </MDBCol>
      </MDBRow>

      <MDBContainer>
      <MDBRow>
      <SearchResults/>
      </MDBRow>
      </MDBContainer>


 </div>
  )
}

export default JumbotronPage;