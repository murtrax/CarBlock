import React from 'react';
import { MDBRow, MDBCol, MDBContainer, MDBAnimation } from "mdbreact";

import dan from "./../../images/Danial.png";
import ash from "./../../images/Aashir.png";
import has from "./../../images/Hassaan.png";
import sai from "./../../images/saim.png";

const PanelPage = () => {
return (
    <MDBContainer className = 'mt-5 text-center'>
        <MDBAnimation type="fadeInRight" reveal duration="1s" delay="1s">
        <h3 className = "mb-5">Meet our Team</h3>
        </MDBAnimation>
        <MDBRow>
            <MDBCol md = "3">
                <div className = "card pt-3">
                    <MDBAnimation type="fadeIn" reveal duration="2.5s" delay="1s">
                     <img src={dan} style = {{width : "7rem"}} className="rounded mx-auto d-block mb-2" alt="aligment" />
                    </MDBAnimation>
                    <MDBAnimation type="fadeInUp" reveal duration="1.5s" delay="1.2s">
                    <h5>Danial Ahmed</h5>
                    </MDBAnimation>
                    <MDBAnimation type="fadeInUp" reveal duration="1.5s" delay="1.4s">
                    <p>Developer</p>
                    </MDBAnimation>
                </div>
            </MDBCol>
            <MDBCol md = "3">
                <div className = "card pt-3">
                    <MDBAnimation type="fadeIn" reveal duration="2.5s" delay="1.3s">
                        <img src={ash} style = {{width : "7rem"}} className="rounded mx-auto d-block mb-2" alt="aligment" />
                    </MDBAnimation>
                    <MDBAnimation type="fadeInUp" reveal duration="1.5s" delay="1.5s">
                    <h5>Aashir Sohail</h5>
                    </MDBAnimation>
                    <MDBAnimation type="fadeInUp" reveal duration="1.5s" delay="1.7s">
                        <p>Developer</p>
                    </MDBAnimation>
                </div>
            </MDBCol>
            <MDBCol md = "3">
                <div className = "card pt-3">
                    <MDBAnimation type="fadeIn" reveal duration="2.5s" delay="1.6s">
                        <img src={sai} style = {{width : "7rem"}} className="rounded mx-auto d-block mb-2" alt="aligment" />
                    </MDBAnimation>
                    <MDBAnimation type="fadeInUp" reveal duration="1.5s" delay="1.8s">
                    <h5>Saim Raza</h5>
                    </MDBAnimation>
                    <MDBAnimation type="fadeInUp" reveal duration="1.5s" delay="2s">
                    <p>Developer</p>
                    </MDBAnimation>
                </div>
            </MDBCol>
            <MDBCol md = "3">
                <div className = "card pt-3">
                    <MDBAnimation type="fadeIn" reveal duration="2.5s" delay="2s">
                        <img src={has} style = {{width : "7rem"}} className="rounded mx-auto d-block mb-2" alt="aligment" />
                    </MDBAnimation>
                    <MDBAnimation type="fadeInUp" reveal duration="1.5s" delay="2.2s">
                    <h5>Hassaan Ahmed</h5>
                    </MDBAnimation>
                    <MDBAnimation type="fadeInUp" reveal duration="1.5s" delay="2.4s">                    
                    <p>Developer</p>
                    </MDBAnimation>
                </div>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
);
};

export default PanelPage;