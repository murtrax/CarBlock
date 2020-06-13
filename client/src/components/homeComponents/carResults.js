import React, { Component } from "react";
import axios from "axios";
import { MDBRow, MDBCol, MDBIcon, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import styles from '../styles/carResult.module.css';

const array = [
  {
    comments: " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    millage: '12',
    date: '6/10/2020',
    spareparts: [
      { num: '#kjba19a', isverified: true },
      { num: '#u324bkuaw', isverified: true },
      { num: '#u34bkuaw', isverified: true },
    ]
  },
  {
    comments: "when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
    , millage: '13',
    date: '6/10/2020',
    spareparts: [
      { num: '#kajsbc920', isverified: true },
      { num: '#kjsjf1', isverified: false }
    ]
  },
  {
    comments: "but also the leap into electronic typesetting, remaining essentially unchanged.",
    millage: '14',
    date: '6/10/2020',
    spareparts: [
      { num: '#ajsd920', isverified: false },
      { num: '#13ibsc', isverified: true }
    ]
  },

  {
    comments: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
    millage: '15',
    date: '6/10/2020',
    spareparts: [
      { num: '#98hnd', isverified: false },
      { num: '#jjasb9', isverified: false }
    ]
  },
  {
    comments: "and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    millage: '16',
    date: '6/10/2020',
    spareparts: [
      { num: '#klsad', isverified: true },
      { num: '#amdcawk', isverified: false }
    ]
  }
]

const owners = [
  {
    city: "isl",
    millage: "12",
    state: "punjab",
    yearPurchased: "2018"
  }, {
    city: "ghotki",
    millage: "24",
    state: "sindh",
    yearPurchased: "2019"
  },
  {
    city: "swat",
    millage: "45",
    state: "kpk",
    yearPurchased: "2020"
  },
  {
    city: "swat",
    millage: "45",
    state: "kpk",
    yearPurchased: "2022"
  }
]

const Tags = (props) => {
  return (
    <>
      {props.taglist.map(r => (
        r.isverified ? <span key={r.num} className={`mt-2 ${styles.sparepartT}`}>{r.num}</span> : <span key={r.num} className={styles.sparepartF}>{r.num}</span>
      ))}
    </>
  )
}

const SList = (props) => {
  return (
    <>
      {props.list.map(r => (
        <li key={r.millage} className={`list-group-item`}>
          <div className="md-v-line"></div><MDBIcon className="amber-text mr-4 pr-3" size='1x' icon="toolbox" />{r.comments}
          <div className="text-right mt-1"><span className={styles.key1}>Mileage: {r.millage}</span><span className={`ml-1 ${styles.key1}`}>Date: {r.date.substring(0, 10)}</span></div>
          <div className="text-left mt-2"><span className={`mt-2 ${styles.key1}`}>Spareparts: </span><Tags className="mt-2" taglist={r.spareparts} /></div>
        </li>
      ))}
    </>
  )
}

const AList = (props) => {
  return (
    <>
      {props.list.map(r => (
        <li key={r.millage} className={`list-group-item`}>
          <div className="md-v-line"></div><MDBIcon className="red-text mr-4 pr-3" size='1x' icon="car-crash" />{r.comments}
          <div className="text-right mt-1"><span className={styles.key1}>Mileage: {r.millage}</span><span className={`ml-1 ${styles.key1}`}>Date: {r.date.substring(0, 10)}</span></div>
        </li>
      ))}
    </>
  )
}


class CarResults extends Component {
  state = {
    owner: {},
    car: {},
    error: "",
    service: [],
    accident: []
  };

  //Set the state with parameters passed down as soon as the component mounts
  componentDidMount() {
    this.getResult();
  }

  getResult = () => {
    const { opt, id } = this.props.match.params;
    const payload = {
      number: id,
      selectedOpt: opt
    };
    axios({
      url: "/searchCar",
      method: "post",
      data: payload
    })
      .then(response => {
        console.log(response.data);
        this.setState({
          car: response.data.car[0],
          service: response.data.car[1],
          owner: response.data.car[2],
          accident: response.data.car[3]
        });
        console.log(this.state)
      })
      .catch(err => {
        console.log(err.response.data);
        this.setState({
          error: err.response.data
        });
      });
  };

  render() {
    return (
      <div className={`text-center pt-4 ${styles.body}`}>
        <MDBRow>
          <MDBCol md="4" className="offset-md-1">
            <MDBRow>
              <MDBCol className="text-left card pt-2 pb-2 align-content-left">
                <div className={styles.listItem}><h5>Owner Information</h5></div>
                <div className={styles.listElement}><span className={styles.key}>City</span> {this.state.owner.city}</div>
                <div className={styles.listElement}><span className={styles.key}>Milage:</span> {this.state.owner.millage}</div>
                <div className={styles.listElement}><span className={styles.key}>State:</span> {this.state.owner.state}</div>
                <div className={styles.listElement}><span className={styles.key}>Year of Purchase:</span> {this.state.owner.yearPurchased}</div>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol className="text-left card pt-2 pb-2 align-content-left">
                <div className={styles.listItem}><h5>Vehicle Information</h5></div>
                <div className={styles.listElement}><span className={styles.key}>Drive:</span> {this.state.car.drive}</div>
                <div className={styles.listElement}><span className={styles.key}>Fuel:</span> {this.state.car.fuel}</div>
                <div className={styles.listElement}><span className={styles.key}>Make:</span> {this.state.car.make}</div>
                <div className={styles.listElement}><span className={styles.key}>Model:</span> {this.state.car.model}</div>
                <div className={styles.listElement}><span className={styles.key}>Reg:</span> {this.state.car.reg}</div>
                <div className={styles.listElement}><span className={styles.key}>Type:</span> {this.state.car.type}</div>
                <div className={styles.listElement}><span className={styles.key}>Variant:</span> {this.state.car.variant}</div>
                <div className={styles.listElement}><span className={styles.key}>Vin:</span> {this.state.car.vin}</div>
                <div className={styles.listElement}><span className={styles.key}>Year:</span> {this.state.car.year}</div>
              </MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol className={`card ${styles.back}`} md="6">
            <div className={`card ${styles.snapshot} text-left`}>
              <li className={`list-group-item ${styles.listFeature}`}>
                <div className="md-v-line"></div><MDBIcon className="mr-4 pt-3 pr-2" size='2x' icon="users" /><span className={styles.feat}>Recent Owners: 1</span>
              </li>
              <li className={`list-group-item ${styles.listFeature}`}>
                <div className="md-v-line"></div><MDBIcon className="mr-4 pt-3 pr-3" size='2x' icon="tools" /><span className={styles.feat}>Service Records: {this.state.service.length}</span>
              </li>
              <li className={`list-group-item ${styles.listFeature}`}>
                <div className="md-v-line"></div><MDBIcon className="mr-4 pt-3 pr-3" size='2x' icon="compass" /><span className={styles.feat}>Last Owned In:  {this.state.owner.state}</span>
              </li>
              <li className={`list-group-item`}>
                <MDBTable bordered hover>
                  <MDBTableHead color="primary-color" textWhite>
                    <tr>
                      <th>#</th>
                      <th>Owner 1</th>
                      <th>Owner 2</th>
                      <th>Owner 3</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>Year Purchased</td>
                      <td>{owners[2].yearPurchased}</td>
                      <td>{owners[1].yearPurchased}</td>
                      <td>{owners[0].yearPurchased}</td>
                    </tr>
                    <tr>
                      <td>Estimaed Ownership</td>
                      <td>{owners[3].yearPurchased - owners[2].yearPurchased}</td>
                      <td>{owners[2].yearPurchased - owners[1].yearPurchased}</td>
                      <td>{owners[1].yearPurchased - owners[0].yearPurchased}</td>
                    </tr>
                    <tr>
                      <td>Last Owned In</td>
                      <td>{owners[2].city}</td>
                      <td>{owners[1].city}</td>
                      <td>{owners[0].city}</td>
                    </tr>
                    <tr>
                      <td>States</td>
                      <td>{owners[2].state}</td>
                      <td>{owners[1].state}</td>
                      <td>{owners[0].state}</td>
                    </tr>
                    <tr>
                      <td>Mileage</td>
                      <td>{owners[2].millage}</td>
                      <td>{owners[1].millage}</td>
                      <td>{owners[0].millage}</td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>

              </li>
            </div>
            {/*table*/}
            {/**end table*/}
          </MDBCol>
        </MDBRow>
        <MDBRow >
          <MDBCol md='5' className="offset-md-1 text-left">
            <ul className={`list-group card ${styles.scrollable}`}>
              <li className={`list-group-item ${styles.listHeading}`}>
                <div className="md-v-line"></div><i className="fas fa-laptop mr-4 pr-3"></i>Service History
              </li>
              <SList list={array} />
            </ul>
          </MDBCol>
          <MDBCol md='5' className="text-left">
            <ul className={`list-group card ${styles.scrollable}`}>
              <li className={`list-group-item ${styles.listHeading}`}>
                <div className="md-v-line"></div><i className="fas fa-laptop mr-4 pr-3"></i>Accident Report
              </li>
              <AList list={this.state.accident} />
            </ul>
          </MDBCol>

        </MDBRow>

      </div>
    );
  }
}

export default CarResults;
