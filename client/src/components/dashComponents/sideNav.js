import React from "react";
import styles from "../styles/sideNav.module.css";
import { MDBIcon } from "mdbreact";
class sideNav extends React.Component {
  render() {
    return (
      <div className={styles.bckg}>
        <div className={styles.back}>
          <div className={`${styles.sidenav}`}>
            <div className={`justify-content-center ${styles.topBar}`}>
              &ensp;
            </div>
            <div
              className={`justify-content-center align-middle ${styles.navhead}`}
            >
              <h4 className="pl-2">Navigation</h4>
            </div>
            <div className={`justify-content-center a ${styles.navlink}`}>
              <a href="/dashboardWorkshop">
                <div>
                  <MDBIcon className={styles.icon} size="2x" icon="building" />
                  <span className={`ml-3 ${styles.iconText}`}>
                    Approve Workshops
                  </span>
                </div>
              </a>
            </div>
            <div className={styles.navlink}>
              <a href="/alert">
                <div>
                  <MDBIcon
                    className={styles.icon}
                    size="2x"
                    icon="exclamation-circle"
                  />
                  <span className={`ml-3 mb-2 ${styles.iconText}`}>Alerts</span>
                </div>
              </a>
            </div>
            <div className={styles.navlink}>
              <a href="/transfer">
                <div>
                  <MDBIcon
                    className={styles.icon}
                    size="2x"
                    icon="exchange-alt"
                  />
                  <span className={`ml-3 ${styles.iconText}`}>
                    Transfer Ownership
                  </span>
                </div>
              </a>
            </div>
            <div className={styles.navlink}>
              <a href="/newCar">
                <div>
                  <MDBIcon className={styles.icon} size="2x" icon="car-side" />
                  <span className={`ml-3 ${styles.iconText}`}>
                    Add New Vehicle
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default sideNav;
