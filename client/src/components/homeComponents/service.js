import React from 'react';
import { MDBCard,MDBCardTitle, MDBCardGroup, MDBAnimation, MDBRow, MDBCol } from "mdbreact";
import styles from '../styles/service.module.css';

import ficon1 from '../../images/icons/f1.svg';
import ficon2 from '../../images/icons/f2.svg';
import ficon3 from '../../images/icons/f3.svg';


const PanelPage = () => {
  return (
    <MDBRow className={`mx-auto text-center ${styles.margin}`}>
      <div className="text-center mx-auto justify-content-center">
        <MDBAnimation type="fadeInRight" reveal duration="1s" delay="1s">
          <h3 className={`mb-5 text-center mx-auto ${styles.underline2}`}>Features</h3>
        </MDBAnimation>
      </div>
      <MDBCardGroup className={`mx-auto text-center justify-content-center ${styles.maxWidth}`} deck>
        <div md='4'>
          <MDBCard className={`${styles.cardDark}`}>
            <div className = {`justify-content-center mx-auto txt-center ${styles.icon}`}>
            <img alt = "illustration" className={`img-fluid ${styles.icon1}`} src={ficon1} />
            </div>
            <MDBCardTitle tag="h5" className={`text-center mx-auto ${styles.underline}`}>
              <MDBAnimation type="fadeInLeft" reveal duration="1s" delay="0.8s">
                Interoperability
            </MDBAnimation>
            </MDBCardTitle>
            <MDBRow className="justify-content-center">
              <MDBCol lg='5'>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </div>
        <div md='4'>
          <MDBCard className={styles.cardDark}>
            <div className = {`justify-content-center mx-auto txt-center ${styles.icon}`}>
              <img alt = "illustration" className={`img-fluid ${styles.icon2}`} src={ficon2} />
            </div>
            <MDBCardTitle tag="h5" className={`text-center mx-auto ${styles.underline}`}>
              <MDBAnimation type="fadeInLeft" reveal duration="1s" delay="0.8s">
                Genuine Reports
          </MDBAnimation>
            </MDBCardTitle>
            <MDBRow className="justify-content-center">
              <MDBCol lg='6'>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </div>
        <div md='4'>
          <MDBCard className={styles.cardDark}>
            <div className = {`justify-content-center mx-auto txt-center ${styles.icon}`}>
              <img alt = "illustration" className={`img-fluid ${styles.icon2}`} src={ficon3} />
            </div>
            <MDBCardTitle tag="h5" className={`text-center mx-auto ${styles.underline}`}>
              <MDBAnimation type="fadeInLeft" reveal duration="1s" delay="0.8s">
                Supply Chain
          </MDBAnimation>
            </MDBCardTitle>
            <MDBRow className="justify-content-center">
              <MDBCol lg='6'>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </div>
      </MDBCardGroup>
    </MDBRow>
  );
};

export default PanelPage;