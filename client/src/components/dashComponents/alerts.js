import React, {Component} from 'react';
import {MDBAlert, MDBIcon} from "mdbreact";
import axios from "axios";
import styles from '../styles/alert.module.css';

const err = [
    {
        comments: 'A millage lower than a previously recorded value was entered',
        date: '1578567991011',
        garage:'Hy kisi ki',
        millage:'455',
        reg:'343'
    },
    {
        comments: 'al2 ajeeb qism ki alert hy ye zabardasti ki',
        date: '1348567991011',
        garage:'tha kisi ki',
        millage:'450',
        reg:'343'
    }
];



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
            if (index !== -1){
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
         //let array = this.state.array;
         let array = this.state.array;
         let listItems = [];
         var counter = 0;
         //const renObjData
        array.map((anObjectMapped, index) => {
            listItems[counter++] =
                <MDBAlert className = {`pb-2`} color="danger">
                <span key={`${anObjectMapped._id}`}>
                    <p className ={styles.pill3}><span className = {`alert-link`}>{anObjectMapped.comments}</span></p>
                    <hr/>
                    <p className = {`mt-1 ${styles.space}`}><span className = {`${styles.pill2}`}>Garage:&nbsp;</span> <span className = {styles.vl}/> <span className = "pl-2">{anObjectMapped.garage}</span></p>
                    <p className = {styles.space}><span className = {styles.pill2}>Mileage:</span> <span className = "pl-2">{anObjectMapped.millage}</span></p>
                    <p className = {styles.space}><span className = {styles.pill2}>#Reg:&emsp;&nbsp;</span> <span className = "pl-2">{anObjectMapped.reg}</span></p>
                    <p className= {`text-right mb-2 pb-2`}><span className = {styles.pill}>{new Date(parseInt(anObjectMapped.date)).toString().substring(0, 24)}</span></p>
                    <button className = {styles.btn} onClick={e => this.dismiss(anObjectMapped._id, index)}> <MDBIcon icon="times" /> </button> 

                </span> 
             </MDBAlert>  
        })
        console.log(listItems);
        return listItems;
    }

    render(){
        if (this.state.array !== []) {
            return (
                <div class = "mt-5 pt-2">  
                {this.display()}
                </div>
              )
        }
        else {
            return (
                <div class = "mt-5 pt-2">  
                {this.display()}
                  <MDBAlert color="danger">
                      Loading Content, Please Wait <span class = "right"></span>
                  </MDBAlert>
                  
                </div>
              )
        }  
    }
}