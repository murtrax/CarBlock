import React from "react";
import { MDBRow, MDBCol, MDBAnimation } from "mdbreact";

import img from '../../images/illustrations/about.svg';
import styles from '../styles/aboutCompany.module.css';

const JumbotronPage = () => {
  return (
    <div className={styles.main}>
      <MDBRow className={`mt-3 text-center`}>
        <MDBCol className={`justify-content-center ${styles.textSpacing}`} md='6' lg='6'>
          <div className="text-center mx-auto justify-content-center ">
            <MDBAnimation type="fadeInRight" reveal duration="1s" delay="1s">
              <h4 className={`text-left ${styles.underline2}`}>What is Car-Block ? </h4>
            </MDBAnimation>
          </div>
          <h6 className={`pt-3 pl-3 pr-3 text-left ${styles.lineSpacing} ${styles.text}`}>
            <div>
              <span className={''}>CAR-BLOCK</span> is a software that provides trusted, genuine and verifiable vehicle history reports alongside a traceable spare-part supply chain management system that will eradicate the insecurities currently existing within prevailing solutions.
            </div>
          </h6>
        </MDBCol>
        <MDBCol className="text-center mx-auto justify-content-center" lg='6' md='6'>
          <img alt = "illustration" className={`img-fluid ${styles.illustrationHeight}`} src={img} />
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default JumbotronPage;