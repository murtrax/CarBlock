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

import styles from "./styles/footer.module.css";
import footerIllustration from "../images/illustrations/social_footer.svg";
import log from "./../images/block.png";

const FooterPage = () => {
  return (
    <MDBFooter
      color=""
      className={`font-small pt-4 mt-4 elegant-color-dark pt-5`}
    >
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow className="mr-2">
          <MDBCol md="4" lg="4">
            <MDBAnimation reveal type="fadeInRight" duration="1s" delay="1s">
              <MDBBox tag="h5" className="px-5">
                <div className={styles.underline}>
                  <img
                    src={log}
                    style={{ width: "10rem" }}
                    className="rounded d-block text-left"
                    alt="aligment"
                  />{" "}
                </div>
              </MDBBox>
            </MDBAnimation>
            <p className={`px-5 pt-3 text-justify ${styles.card}`}>
              CAR-BLOCK is a software that provides trusted, genuine and
              verifiable vehicle history reports alongside a traceable
              spare-part supply chain management system that will eradicate the
              insecurities currently existing within prevailing solutions.
            </p>
          </MDBCol>

          <MDBCol md="3" lg="3" className="px-5">
            <MDBAnimation reveal type="fadeInRight" duration="1s" delay="1.3s">
              <MDBBox tag="h4" className="">
                <div className={styles.underline}>
                  <strong>Navigation</strong>
                </div>
              </MDBBox>
            </MDBAnimation>{" "}
            <ul className={`pt-2 text-lg-left text-sm-justify`}>
              <li className="list-unstyled">
                <MDBIcon
                  className="mr-2 text-left"
                  icon="chevron-circle-right"
                />
                <a className="text-right" href="#!">
                  {" "}
                  Home
                </a>
              </li>
              <li className="list-unstyled">
                <MDBIcon
                  className="mr-2 text-left"
                  icon="chevron-circle-right"
                />
                <a className="text-right" href="#!">
                  {" "}
                  Login
                </a>
              </li>
              <li className="list-unstyled">
                <MDBIcon
                  className="mr-2 text-left"
                  icon="chevron-circle-right"
                />
                <a className="text-right" href="#!">
                  {" "}
                  Signup
                </a>
              </li>
            </ul>
          </MDBCol>

          <MDBCol md="5" lg="5" className="px-5 justify-content-center">
            <MDBRow>
              <center>
                <MDBAnimation
                  reveal
                  type="fadeInRight"
                  duration="1s"
                  delay="1s"
                >
                  <MDBBox tag="h5" className="px-4"></MDBBox>
                </MDBAnimation>

                <MDBAnimation
                  reveal
                  type="fadeInRight"
                  duration="1s"
                  delay="2.1s"
                >
                  <img
                    alt="Illustration"
                    className={`mt-3 img-fluid ${styles.illustrationHeight}`}
                    src={footerIllustration}
                  />
                </MDBAnimation>
              </center>
            </MDBRow>
          </MDBCol>

          <MDBCol lg="1"></MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className={styles.marginTop}>
        <MDBRow className={styles.marginBottom}>
          <MDBCol className={styles.bkg1} md="6"></MDBCol>
          <MDBCol className={`${styles.bkg2} pt-3 text-center mx-auto`} md="6">
            <a href="#!">
              <MDBIcon
                className={styles.hoverText}
                fab
                size="2x"
                icon="facebook"
              />
            </a>
            <a href="#!">
              <MDBIcon
                className={`pl-5 ${styles.hoverText}`}
                fab
                size="2x"
                icon="linkedin-in"
              />
            </a>
            <a href="#!">
              <MDBIcon
                className={`pl-5 ${styles.hoverText}`}
                fab
                size="2x"
                icon="instagram"
              />
            </a>
            <a href="#!">
              <MDBIcon
                className={`pl-5 ${styles.hoverText}`}
                fab
                size="2x"
                icon="twitter"
              />
            </a>
            <a href="#!">
              <MDBIcon
                className={`pl-5 ${styles.hoverText}`}
                size="2x"
                icon="at"
              />
            </a>
          </MDBCol>
        </MDBRow>
      </div>

      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="a"> CarBlock</a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPage;
