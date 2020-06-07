import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBFooter,
  MDBIcon,
  MDBAnimation,
  MDBBox,
} from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter
      color=""
      style={{}}
      className="font-small pt-4 mt-4 elegant-color-dark"
    >
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow className="mr-2">
          <MDBCol lg="1"></MDBCol>

          <MDBCol md="6" lg="4">
            <MDBAnimation reveal type="fadeInRight" duration="1s" delay="1s">
              <MDBBox tag="h5" className="px-5">
                <strong>Car Block</strong>
              </MDBBox>
            </MDBAnimation>
            <p className="px-5 text-justify">
              CAR-BLOCK is a software that provides trusted, genuine and
              verifiable vehicle history reports alongside a traceable
              spare-part supply chain management system that will eradicate the
              insecurities currently existing within prevailing solutions
            </p>
          </MDBCol>

          <MDBCol md="2" lg="2" className="px-5     ">
            <MDBAnimation reveal type="fadeInRight" duration="1s" delay="1.3s">
              <MDBBox tag="h5" className="">
                <strong>Links</strong>
              </MDBBox>
            </MDBAnimation>{" "}
            <ul>
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

          <MDBCol md="2" lg="2" className="px-5     ">
            <MDBAnimation reveal type="fadeInRight" duration="1s" delay="1.3s">
              <MDBBox tag="h5" className="">
                <strong>Links</strong>
              </MDBBox>
            </MDBAnimation>{" "}
            <ul>
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

          <MDBCol md="2" lg="2" className="px-5 justify-content-center">
            <center>
              <MDBAnimation reveal type="fadeInRight" duration="1s" delay="1s">
                <MDBBox tag="h5" className="px-4">
                  {/* Insert Heading above social links here*/}
                </MDBBox>
              </MDBAnimation>

              <MDBAnimation
                reveal
                type="fadeInRight"
                duration="1s"
                delay="2.1s"
              >
                <a href="#!">
                  <MDBIcon className="pl-4" fab size="2x" icon="facebook" />
                  &ensp;&ensp;&ensp;{" "}
                </a>

                <a href="#!">
                  <MDBIcon fab size="2x" icon="instagram" />
                  &ensp;&ensp;&ensp;{" "}
                </a>

                <a href="#!">
                  <MDBIcon fab size="2x" icon="linkedin" />
                  &ensp;&ensp;&ensp;{" "}
                </a>
              </MDBAnimation>
            </center>
          </MDBCol>

          <MDBCol lg="1"></MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="a"> CarChain</a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPage;
