import React from 'react';
import { MDBRow, MDBCol, MDBAnimation, MDBIcon } from "mdbreact";

import styles from '../styles/team.module.css';

import dan from "./../../images/Danial.png";
import ash from "./../../images/Aashir.png";
import has from "./../../images/Hassaan.png";
import sai from "./../../images/saim.png";

import teamIllustration from '../../images/illustrations/team.svg';


const PanelPage = () => {
return (
    <div className = {`text-center mx-auto ${styles.back}`}>
        <MDBRow>
            <MDBCol className = "mx-auto text-center pl-5 pr-5" md = '5'>
                <MDBAnimation type="fadeInRight" reveal duration="1s" delay="1s">
                     <h3 className = {`mb-5 mx-auto ${styles.underline2}`}>Meet our Team</h3>
                </MDBAnimation>
                <MDBAnimation reveal type="fadeInRight" duration="1s" delay="2.1s">
                  <img alt = "illustration" className={`mt-3 img-fluid ${styles.illustrationHeight}`} src={teamIllustration} />
                </MDBAnimation>
            </MDBCol>
            <MDBCol md = '7'>
                <MDBRow>
                    <MDBCol md = "6">
                        <div className = {`card pt-3 ${styles.cardDark}`}>
                            <MDBAnimation type="fadeIn" reveal duration="2.5s" delay="1s">
                            <img src={dan} className={`mt-2 mx-auto d-block ${styles.teamImg}`} alt="aligment" />
                            </MDBAnimation>
                            <MDBAnimation type="fadeInUp" reveal duration="1.5s" delay="1.2s">
                            <h5 className = {`mx-auto ${styles.underline}`}>Danial Ahmed</h5>
                            </MDBAnimation>
                            <MDBAnimation type="fadeInUp" reveal duration="1.5s" delay="1.4s">
                            <p>Developer</p>
                            </MDBAnimation>

                            <MDBRow className = {`${styles.bkg} pt-3 text-center mx-auto`}>
                                <a className = {styles.white} href="#!">
                                    <MDBIcon fab size="1x" icon="facebook" />
                                </a>
                                <a className = {styles.white} href="#!">
                                    <MDBIcon className={`pl-5`} fab size="1x" icon="linkedin-in" />
                                </a>
                                <a className = {styles.white} href="#!">
                                    <MDBIcon className={`pl-5`} fab size="1x" icon="instagram" />
                                </a>
                                <a className = {styles.white} href="#!">
                                    <MDBIcon className={`pl-5`} fab size="1x" icon="twitter" />
                                </a>
                                <a className = {styles.white} href="#!">
                                    <MDBIcon className={`pl-5`} size="1x" icon="at" />
                                </a>
                            </MDBRow>  
                        </div>
                    </MDBCol>
                    <MDBCol md = "6">
                        <div className = {`card pt-3 ${styles.cardDark}`}>
                            <MDBAnimation type="fadeIn" reveal duration="2.5s" delay="1.3s">
                                <img src={ash} className={`mt-2 mx-auto d-block ${styles.teamImg}`} alt="aligment" />
                            </MDBAnimation>
                            <MDBAnimation type="fadeInUp" reveal duration="1.5s" delay="1.5s">
                            <h5 className = {`mx-auto ${styles.underline}`}>Aashir Sohail</h5>
                            </MDBAnimation>
                            <MDBAnimation type="fadeInUp" reveal duration="1.5s" delay="1.7s">
                                <p>Developer</p>
                            </MDBAnimation>

                            <MDBRow className = {`${styles.bkg} pt-3 text-center mx-auto`}>
                                <a className = {styles.white} href="#!">
                                    <MDBIcon fab size="1x" icon="facebook" />
                                </a>
                                <a className = {styles.white} href="#!">
                                    <MDBIcon className={`pl-5`} fab size="1x" icon="linkedin-in" />
                                </a>
                                <a className = {styles.white} href="#!">
                                    <MDBIcon className={`pl-5`} fab size="1x" icon="instagram" />
                                </a>
                                <a className = {styles.white} href="#!">
                                    <MDBIcon className={`pl-5`} fab size="1x" icon="twitter" />
                                </a>
                                <a className = {styles.white} href="#!">
                                    <MDBIcon className={`pl-5`} size="1x" icon="at" />
                                </a>
                            </MDBRow>
                        </div>
                    </MDBCol>
                    <MDBCol md = "6">
                        <div className = {`card pt-3 ${styles.cardDark}`}>
                            <MDBAnimation type="fadeIn" reveal duration="2.5s" delay="1.6s">
                                <img src={sai} className={`mt-2 mx-auto d-block ${styles.teamImg}`} alt="aligment" />
                            </MDBAnimation>
                            <MDBAnimation type="fadeInUp" reveal duration="1.5s" delay="1.8s">
                            <h5 className = {`mx-auto ${styles.underline}`}>Saim Raza</h5>
                            </MDBAnimation>
                            <MDBAnimation type="fadeInUp" reveal duration="1.5s" delay="2s">
                            <p>Developer</p>
                            </MDBAnimation>

                            <MDBRow className = {`${styles.bkg} pt-3 text-center mx-auto`}>
                                <a className = {styles.white} href="#!">
                                    <MDBIcon fab size="1x" icon="facebook" />
                                </a>
                                <a className = {styles.white} href="#!">
                                    <MDBIcon className={`pl-5`} fab size="1x" icon="linkedin-in" />
                                </a>
                                <a className = {styles.white} href="#!">
                                    <MDBIcon className={`pl-5`} fab size="1x" icon="instagram" />
                                </a>
                                <a className = {styles.white} href="#!">
                                    <MDBIcon className={`pl-5`} fab size="1x" icon="twitter" />
                                </a>
                                <a className = {styles.white} href="#!">
                                    <MDBIcon className={`pl-5`} size="1x" icon="at" />
                                </a>
                            </MDBRow>
                        </div>
                    </MDBCol>
                    <MDBCol md = "6">
                        <div className = {`card pt-3 ${styles.cardDark}`}>
                            <MDBAnimation type="fadeIn" reveal duration="2.5s" delay="2s">
                                <img src={has} className={`mt-2 mx-auto d-block ${styles.teamImg}`} alt="aligment" />
                            </MDBAnimation>
                            <MDBAnimation type="fadeInUp" reveal duration="1.5s" delay="2.2s">
                            <h5 className = {`mx-auto ${styles.underline}`}>Hassaan Ahmed</h5>
                            </MDBAnimation>
                            <MDBAnimation type="fadeInUp" reveal duration="1.5s" delay="2.4s">                    
                            <p>Developer</p>
                            </MDBAnimation>

                            <MDBRow className = {`${styles.bkg} pt-3 text-center mx-auto`}>
                                <a className = {styles.white} href="#!">
                                    <MDBIcon fab size="1x" icon="facebook" />
                                </a>
                                <a className = {styles.white} href="#!">
                                    <MDBIcon className={`pl-5`} fab size="1x" icon="linkedin-in" />
                                </a>
                                <a className = {styles.white} href="#!">
                                    <MDBIcon className={`pl-5`} fab size="1x" icon="instagram" />
                                </a>
                                <a className = {styles.white} href="#!">
                                    <MDBIcon className={`pl-5`} fab size="1x" icon="twitter" />
                                </a>
                                <a className = {styles.white} href="#!">
                                    <MDBIcon className={`pl-5`} size="1x" icon="at" />
                                </a>
                            </MDBRow>
                        </div>
                </MDBCol>
            </MDBRow>

            </MDBCol>
        </MDBRow>
        </div>
);
};

export default PanelPage;