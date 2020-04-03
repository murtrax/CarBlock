import React, {Fragment} from "react";
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol,MDBIcon } from "mdbreact";

const JumbotronPage = () => {
  return (
    <div>
        <MDBRow className = "mt-2">
            <MDBCol>
            <MDBJumbotron className = "pt-1">
                <h3 className="h3 display-4">Owner Details</h3>
                <hr className="my-2" />
                <div className = "mt-3"><kbd className = "h4">Name:</kbd> <span className = "pl-3">Aashir</span></div>
                <div className = "mt-3"><kbd className = "h4">Positon:</kbd> <span className = "pl-3">Aashir</span></div>
                <div className = "mt-3"><kbd className = "h4">Contact:</kbd> <span className = "pl-3">Aashir</span></div>
                <div className = "mt-3"><kbd className = "h4">CNIC:</kbd> <span  className = "pl-3">Aashir</span></div>
            </MDBJumbotron>
            </MDBCol>
        </MDBRow>
        <MDBRow className = "mt-1">
        <MDBCol>
            <MDBJumbotron className = "pt-1">
            <h3 className="h3 display-4">Workshop Details</h3>
            <hr className="my-2" />
            <div className = "mt-3"><kbd className = "h4">Name:</kbd> <span  className = "pl-3">Aashir</span></div>
            <div className = "mt-3"><kbd className = "h4">Email:</kbd> <span className = "pl-3">Aashir</span></div>
            <div className = "mt-3"><kbd className = "h4">Contact:</kbd> <span className = "pl-3">Aashir</span></div>
            <div className = "mt-3"><kbd className = "h4">Address:</kbd> <span className = "pl-3">Aashir</span></div>
            <div className = "mt-3"><kbd className = "h4">City:</kbd> <span className = "pl-3">Aashir</span></div>
            <div className = "mt-3"><kbd className = "h4">Zip:</kbd> <span className = "pl-3">Aashir</span></div>
            </MDBJumbotron>
        </MDBCol>
        </MDBRow>
        <MDBRow>
            <MDBCol md="2">
                <MDBBtn color="elegant">
                    <MDBIcon icon="angle-left" className="mr-1" />
                </MDBBtn>
            </MDBCol>
            <MDBCol md="8" className = 'text-center'>
                <MDBBtn color="danger">
                    <MDBIcon icon="times" className="mr-1" /> Decline
                </MDBBtn>
                <MDBBtn color="success">
                    Approve <MDBIcon icon="check" className="ml-1" />
                </MDBBtn>
            </MDBCol>
            <MDBCol md="2">
                <MDBBtn color="elegant right">
                    <MDBIcon icon="angle-right" className="mr-1" />
                </MDBBtn>
            </MDBCol>
        </MDBRow>
    </div>
  )
}

export default JumbotronPage;