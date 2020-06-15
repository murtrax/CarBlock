import React, { Component } from "react";
import axios from "axios";
import { MDBRow, MDBCol, MDBIcon, MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import styles from '../styles/carResult.module.css';

let owners = []; 

const Tags = (props) => {
  return (
    <>
      {props.taglist.map(r => (
        r.isverified == "true" ? <span key={r.num} className={`mt-2 ${styles.sparepartT}`}>{r.num}</span> : <span key={r.num} className={styles.sparepartF}>{r.num}</span>
      ))}
    </>
  )
}

const SList = (props) => {
  //console.log(props.list.length)
  let array = props.list;
  let counter = 0;
  let FE = []
  for (var x =0; x < array.length; x++){
    if (array[x].sparePart1 != undefined && array[x].sparePart2 != undefined && array[x].sparePart3 != undefined) {
      FE[counter++] = <li className={`list-group-item`}>
      <div className="md-v-line"></div><MDBIcon className="amber-text mr-4 pr-3" size='1x' icon="toolbox" />{array[x].comments}
      <div className="text-right mt-1"><span className={styles.key1}>Mileage: {array[x].millage}</span><span className={`ml-1 ${styles.key1}`}>Date: {new Date(parseInt(array[x].date)).toString().substring(0,24)}</span></div>
      <div className="text-left mt-2"><span className={`mt-2 ${styles.key1}`}>Spareparts: </span><Tags className="mt-2" taglist={[{num: array[x].sparePart1, isverified: array[x].isValid1},{num: array[x].sparePart2, isverified: array[x].isValid2},{num: array[x].sparePart3, isverified: array[x].isValid3}]} /></div>
    </li>
    }
    else if (array[x].sparePart1 != undefined && array[x].sparePart2 != undefined) {
      FE[counter++] = <li className={`list-group-item`}>
      <div className="md-v-line"></div><MDBIcon className="amber-text mr-4 pr-3" size='1x' icon="toolbox" />{array[x].comments}
      <div className="text-right mt-1"><span className={styles.key1}>Mileage: {array[x].millage}</span><span className={`ml-1 ${styles.key1}`}>Date: {new Date(parseInt(array[x].date)).toString().substring(0,24)}</span></div>
      <div className="text-left mt-2"><span className={`mt-2 ${styles.key1}`}>Spareparts: </span><Tags className="mt-2" taglist={[{num: array[x].sparePart1, isverified: array[x].isValid1},{num: array[x].sparePart2, isverified: array[x].isValid2}]} /></div>
    </li>
    }
    else if (array[x].sparePart1 != undefined) {
      FE[counter++] = <li className={`list-group-item`}>
      <div className="md-v-line"></div><MDBIcon className="amber-text mr-4 pr-3" size='1x' icon="toolbox" />{array[x].comments}
      <div className="text-right mt-1"><span className={styles.key1}>Mileage: {array[x].millage}</span><span className={`ml-1 ${styles.key1}`}>Date: {new Date(parseInt(array[x].date)).toString().substring(0,24)}</span></div>
      <div className="text-left mt-2"><span className={`mt-2 ${styles.key1}`}>Spareparts: </span><Tags className="mt-2" taglist={[{num: array[x].sparePart1, isverified: array[x].isValid1}]} /></div>
    </li>
    }
    else  {
      FE[counter++] = <li className={`list-group-item`}>
      <div className="md-v-line"></div><MDBIcon className="amber-text mr-4 pr-3" size='1x' icon="toolbox" />{array[x].comments}
      <div className="text-right mt-1"><span className={styles.key1}>Mileage: {array[x].millage}</span><span className={`ml-1 ${styles.key1}`}>Date: {new Date(parseInt(array[x].date)).toString().substring(0,24)}</span></div>
    </li>
    }    
  }

return FE;
}

const AList = (props) => {
  return (
    <>
      {props.list.map(r => (
        <li key={r.millage} className={`list-group-item`}>
          <div className="md-v-line"></div><MDBIcon className="red-text mr-4 pr-3" size='1x' icon="car-crash" />{r.comments}
      <div className="text-right mt-1"><span className={styles.key1}>Mileage: {r.millage}</span><span className={`ml-1 ${styles.key1}`}>Date: {new Date(parseInt(r.date)).toString().substring(0,24)}</span></div>
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
    accident: [],
    condition:0
  };

  //Set the state with parameters passed down as soon as the component mounts
  componentDidMount() {
    this.getResult();
  }

  highestMillage = ()=> {
    let array = []
    array[0] = Number.parseInt([owners[0].millage], 10)
    console.log(array[0])
    if (this.state.accident.length != 0){
      array[1] = this.state.accident[this.state.accident.length -1]
    }
    if (this.state.service.length != 0){
      array[2] = this.state.service[this.state.service.length-1].millage
    }
    var max = 0;
    for (var i = 0; i < array.length; i++) {
      if (Number.parseInt(array[i], 10) > max) {
        max = Number.parseInt(array[i], 10);
      }
    }
    return max;
  }

  displayYear = ()=> {
    let counter = 0;
    let FE = []
    if (owners.length != 1){
    owners.map((obj,index) => {

      FE [counter++] = <td>{obj.yearPurchased}</td>
    })
    return FE;
  }
  else {
    return <td>{owners[0].yearPurchased}</td>
  }
  }

  displayEO = ()=> {
    let counter = 0;
    let FE = []
    if (owners.length != 1){
    owners.map((obj,index) => {
      FE [counter++] = <td>{obj.millage}</td>
    })
    return FE;
  }
  else {
    return <td>{owners[0].millage}</td>
  }
  }

  displayCity = ()=> {
    let counter = 0;
    let FE = []
    if (owners.length!= 1){
    owners.map((obj,index) => {
      FE [counter++] = <td>{obj.city}</td>
    })
  
    return FE;
  }
  else {
    return <td>{owners[0].city}</td>
  }
  }

  displayState= ()=> {
    let counter = 0;
    let FE = []
    if (owners.length != 1){
    owners.map((obj,index) => {
      FE [counter++] = <td>{obj.state}</td>
    })
    return FE;
  }
  else {
    return <td>{owners[0].state}</td>
  }
  }


  displayMillage=  ()=> {
    let counter = 0;
    let FE = []
    if (owners.length != 1){
    owners.map((obj,index) => {
      FE [counter++] = <td>{obj.millage}</td>
    })
    return FE;
  }
  else {
    //return (<td>{owners.millage}</td>)
    return <td>{owners[0].millage}</td>
  }
  }

  /*displayOwners = ()=> {
    
    return (
    <MDBTableBody>
                    <tr>
                      <td>Year Purchased</td>
                      {this.state.yearPurchased}
                    </tr>
                    <tr>
                      <td>Millage at Purchase</td>
                      {this.state.displayEO}
                    </tr>
                    <tr>
                      <td>Last Owned In</td>
                      {this.state.displayCity}
                    </tr>
                    <tr>
                      <td>State</td>
                      {this.state.displayState}
                    </tr>
                    <tr>
                      <td>Mileage</td>
                      {this.state.displayMillage}
                    </tr>
                  </MDBTableBody>
                  )
  }*/

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
        this.setState({
          car: response.data.car[0],
          service: response.data.car[1],
          owner: response.data.car[2],
          accident: response.data.car[3]
        }, ()=>{
          if (this.state.owner.length <= 3){
            let array = this.state.owner;
            array.map((obj, index) => { 
              owners[index] = {
                city: obj.city,
                millage: obj.millage,
                state: obj.state,
               yearPurchased: obj.yearPurchased
              }
            })
            console.log("printing state")
              console.log(this.state)
              console.log("printing owners")
              console.log(owners);
              this.setState({
                condition: 1
              })
          }
          else {
            let obj = this.state.owner;
            owners[0] = {
              city: obj[obj.length-1].city,
              millage: obj[obj.length-1].millage,
              state: obj[obj.length-1].state,
              yearPurchased: obj[obj.length-1].yearPurchased
            }
            owners[1] = {
              city: obj[obj.length-2].city,
              millage: obj[obj.length-2].millage,
              state: obj[obj.length-2].state,
              yearPurchased: obj[obj.length-2].yearPurchased
            }
            owners[2] = {
              city: obj[obj.length-3].city,
              millage: obj[obj.length-3].millage,
              state: obj[obj.length-3].state,
              yearPurchased: obj[obj.length-3].yearPurchased
            }
              this.setState({
                condition: 1,
              })
          }
          
        });
      })
      .catch(err => {
        this.props.history.push({
          pathname: "/error",
          state: {
            message: err.response.data.msg
          }
        })
        console.log(err.response.data);
        this.setState({
          error: err.response.data
        });
      });
  };

  render() {
if (this.state.condition == 1)
{
    return (
      <div className={`text-center pt-4 ${styles.body}`}>
        <MDBRow>
          <MDBCol md="4" className="offset-md-1">
            <MDBRow>
              <MDBCol className="text-left card pt-2 pb-2 align-content-left">
                <div className={styles.listItem}><h5>Owner Information</h5></div>
                <div className={styles.listElement}><span className={styles.key}>City</span> {owners[0].city}</div>
                <div className={styles.listElement}><span className={styles.key}>Milage:</span> {this.highestMillage()}</div>
                <div className={styles.listElement}><span className={styles.key}>State:</span> {owners[0].state}</div>
                <div className={styles.listElement}><span className={styles.key}>Year of Purchase:</span> {owners[0].yearPurchased}</div>
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
                <div className="md-v-line"></div><MDBIcon className="mr-4 pt-3 pr-2" size='2x' icon="users" /><span className={styles.feat}>Total Number of Owners: {this.state.owner.length}</span>
              </li>
              <li className={`list-group-item ${styles.listFeature}`}>
                <div className="md-v-line"></div><MDBIcon className="mr-4 pt-3 pr-3" size='2x' icon="tools" /><span className={styles.feat}>Total Number of Service Records: {this.state.service.length}</span>
              </li>
              <li className={`list-group-item ${styles.listFeature}`}>
                <div className="md-v-line"></div><MDBIcon className="mr-4 pt-3 pr-3" size='2x' icon="compass" /><span className={styles.feat}>Last Owned In:  {owners[owners.length-1].city}</span>
              </li>
              <li className={`list-group-item`}>
                <MDBTable  bordered hover>
                  <MDBTableHead color="primary-color" textWhite>
                    <tr>
                      <th className = {styles.text}>Ownership History</th>
                      <th className = {styles.text}>Owner 3</th>
                      <th className = {styles.text}>Owner 2</th>
                      <th className = {styles.text}>Owner 1</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>Year Purchased</td>
                      {this.displayYear()}
                    </tr>
                    <tr>
                      <td>Millage at Purchase</td>
                      {this.displayEO()}
                    </tr>
                    <tr>
                      <td>Last Owned In</td>
                      {this.displayCity()}
                    </tr>
                    <tr>
                      <td>State</td>
                      {this.displayState()}
                    </tr>
                    <tr>
                      <td>Mileage</td>
                      {this.displayMillage()}
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
              <li style = {{fontWeight: "bold"}} className={`list-group-item ${styles.listHeading}`}>
                <div className="md-v-line"></div><i className="fas fa-laptop mr-4 pr-3"></i>Service History
              </li>
             <SList list={this.state.service} />
            </ul>
          </MDBCol>
          <MDBCol md='5' className="text-left">
            <ul className={`list-group card ${styles.scrollable}`}>
              <li style = {{fontWeight: "bold"}} className={`list-group-item ${styles.listHeading}`}>
                <div className="md-v-line"></div><i className="fas fa-laptop mr-4 pr-3"></i>Accident Report
              </li>
              <AList list={this.state.accident} />
            </ul>
          </MDBCol>

        </MDBRow>

      </div>
    );
      }
      else {
        return (
          <div>Report Loading</div>
        )
      }

  }
}

export default CarResults;
