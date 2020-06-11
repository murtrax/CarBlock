import React, { Component } from "react";
import { MDBRow, MDBCol, MDBIcon } from "mdbreact";

class tempMessage extends React.Component {
  state = {};
  render() {
    const msg = this.props.history.location.state.message;
    //console.log(this.props.history.location.state.message);
    return (
      <MDBRow className="justify-content-center">
        <MDBCol md="6" lg="5">
          <h5 style={{ textAlign: "center" }}>{msg}</h5>
          {
            //}<h5 style={{ textAlign: "center" }}>{typeMismatch}</h5>
          }
        </MDBCol>
      </MDBRow>
    );
  }
}

export default tempMessage;
