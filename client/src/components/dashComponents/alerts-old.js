import React, {Component} from 'react';
import {MDBAlert} from "mdbreact";
import axios from "axios";
//import moment from 'react-moment';
//import 'moment-timezone';


export default class Alert extends Component{

    state = {
        array: [],
    }

    
    componentWillMount() {
        axios({
            url: "/alert",
            method: "post",
            data: "",
          })
            .then((response) => {
              console.log(response.data);
              this.setState({
                array: response.data,
            })

            })
            .catch((error)=>{
                console.log(error);

            })
    }

    dismiss =(id, index)=> {
        const payload ={
            id: id
        }
        axios({
            url: "/dismissAlert",
            method: "post",
            data: payload,
        })
        .then((res)=>{
            console.log(res);
            let array = this.state.array
            if (index != -1){
                array.splice(index, 1);
                this.setState({
                    array: array
                },()=>{
                    this.display();
                })
            }
        })
        .catch((err)=> {
            console.log(err);
        })

        console.log(id);
        console.log(index);
        //return 1;
    }
    
     display = ()=> {
         let array = this.state.array;
         let listItems = [];
         var counter = 0;
         //const renObjData

       /*for (var x = 0; x< array.length; x++) {
            //var newDate = moment(new Date(array[x].date * 1000)).format('MM/DD/YYYY hh:MM');
            if (array[x].comments == "Spare Parts are not OEM") {
                labels[x]= 
                    <React.Fragment>
                        <MDBAlert color="danger">
                        <br></br>
                    <label style={{ color: "Black", fontSize: "15px"}}>
                        <text>
                        <bold>Comments:</bold> {array[x].comments} 
                        </text>
                        <br></br>
                        <text>
                        Date: {array[x].date} 
                        </text>
                        <br></br>
                        <text>
                        Garage: {array[x].garage} 
                        </text>
                        <br></br>
                        <text>
                        Millage: {array[x].millage} 
                        </text>
                        <br></br>
                        <text>
                        Reg: {array[x].reg} 
                        </text>
                        <br></br>
                    </label>
                    <br></br>
                    <button onClick={this.dismiss(array[x]._id, x)}>Dismiss</button>
                    </MDBAlert>
                    </React.Fragment>
            }

            if (array[x].comments == "Milage entered was less than a previously recorded value") {
                labels[x]= 
                    <React.Fragment>
                      <MDBAlert color="danger">
                        <br></br>
                    <label style={{ color: "Black" , fontSize: "15px"}}>
                        <br></br>
                        <text>
                        <bold>Comments:</bold> {array[x].comments} 
                        </text>
                        <br></br>
                        <text>
                        Date: {array[x].date} 
                        </text>
                        <br></br>
                        <text>
                        Garage: {array[x].garage} 
                        </text>
                        <br></br>
                        <text>
                        Millage: {array[x].millage} 
                        </text>
                        <br></br>
                        <text>
                        Reg: {array[x].reg} 
                        </text>
                        <br></br>
                    </label>
                    <br></br>
                    <button onClick={this.dismiss(array[x]._id, x)}>Dismiss</button>
                    </MDBAlert>
                    </React.Fragment>
            }

            listItems = array.map((array1) =>
            <li key={array1._id}>    
                {array1.comment}
            </li>
            ); 
        }*/
        array.map((anObjectMapped, index) => {
            listItems[counter++] =
            <React.Fragment>
                <MDBAlert color="danger">
                <label key={`${anObjectMapped._id}`}>
                    {anObjectMapped.comments}<br></br>  {anObjectMapped.date}<br></br>
                    {anObjectMapped.reg}<br></br>{anObjectMapped.millage}<br></br>
                    {anObjectMapped.garage}<br></br>
                </label> <br></br>
             <button onClick={e => this.dismiss(anObjectMapped._id, index)}> Dismiss </button> 
             </MDBAlert>  
            </React.Fragment>    
        })
        console.log(listItems);
        return listItems;
    }

    render(){
        if (this.state.array != []) {
            return (
                <div class = "pt-2">  
                {this.display()}
                  <MDBAlert color="danger">
                      A simple primary alert with <a href="#!" className="alert-link">an example link</a>. Give it a click if you like. <span class = "right">24/7/2019</span>
                  </MDBAlert>

                </div>
              )
        }
        else {
            return (
                <div class = "pt-2">  
                {this.display()}
                  <MDBAlert color="danger">
                      Loading Content, Please Wait <span class = "right">24/7/2019</span>
                  </MDBAlert>
                  
                </div>
              )
        }  
    }
}