import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter,MDBIcon, MDBAnimation, MDBBox} from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="blue-gradient" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow className = "mr-2" >
          <MDBCol md="6">
            <MDBAnimation reveal type="fadeInRight" duration="1s" delay="1s">
            <MDBBox tag="h5" className = "px-4"><strong>Connect With Us</strong></MDBBox>
            </MDBAnimation>            
            <p className = "px-5 text-justify">
            CAR-CHAIN is a software that will provide trusted, genuine and verifiable vehicle history reports alongside a traceable spare-part supply chain management system that will eradicate the insecurities that currently exist within prevailing solutions
            </p>
          </MDBCol>
          <MDBCol md="3" className = "px-5">
            <MDBAnimation reveal type="fadeInRight" duration="1s" delay="1.3s">
            <MDBBox tag="h5" className = "px-4"><strong>Links</strong></MDBBox>
            </MDBAnimation>             <ul>
              <li className="list-unstyled">
                <a href="#!">Home</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">About</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">LoginIn</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">SignUp</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="3" className = "px-4">
            <MDBAnimation reveal type="fadeInRight" duration="1s" delay="1.8s">
              <MDBBox tag="h5" className= ""><strong>Connect With Us</strong></MDBBox>
            </MDBAnimation>
            <MDBAnimation reveal type="fadeInRight" duration="1s" delay="2.1s">
             <a href="#!"><MDBIcon className = "pl-4" fab size = "2x" icon="facebook" />&ensp;&ensp;&ensp; </a>
            
             <a href="#!"><MDBIcon fab size = "2x" icon="instagram" />&ensp;&ensp;&ensp; </a>
            
             <a href="#!"><MDBIcon fab size = "2x" icon="linkedin" />&ensp;&ensp;&ensp; </a>
            
             <a href="#!"><MDBIcon size = "2x" icon="at" />&ensp;&ensp; </a>
            </MDBAnimation>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="a"> CarChain</a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;