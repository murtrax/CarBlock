import React, {Fragment} from "react";
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol,MDBIcon } from "mdbreact";
import axios from "axios";
import sugar from 'sugar';

class JumbotronPage extends React.Component {
    state = {
        ownerName: "",
        ownerPosition: "",
        ownerContact: "",
        ownerCNIC: "",
        companyName: "",
        companyEmail: "",
        companyContact: "",
        companyAddress: "",
        companyCity: "",
        companyZip: "",
        approved: "",
        selection: "",
        statusColor: "",
        numberOfRecords: "",
        workshops: [],
        disabled: ""
    }

    componentDidMount = () => {
        axios.get("/getWorkshopsTemp")
        .then(response=>{
            const data = response.data.workshops;
            if (data.length == 0) {
                this.setState({
                    disabled: "disabled"
                })
            }

            else {
            this.setState({
                ownerName: data[0].ownerName,
                ownerPosition: data[0].ownerPosition,
                ownerContact: data[0].ownerContact,
                ownerCNIC: data[0].ownerCNIC,
                companyName: data[0].companyName,
                companyEmail: data[0].companyEmail,
                companyContact: data[0].companyContact,
                companyAddress: data[0].companyAddress,
                companyCity: data[0].companyCity,
                companyZip: data[0].companyZip,
                approved: "Not Approved",
                statusColor: "red",
                numberOfRecords: data.length,
                workshops : data
            },()=> {
                this.setState({
                    selection: 0
                })
            })
           console.log(data) 
        }
        })
        .catch(error=> {
            console.log(error)
        })
    
    }

    nextWorkshop = ()=> {
        let select = this.state.selection
        if (select == (this.state.numberOfRecords-1) ||  this.state.numberOfRecords == 0) {
        }
        else {
            select = select + 1
            this.setState({
                selection: select,

            },() => { 
                if (!this.state.workshops[select].approved)
                {
                    this.setState({
                        approved: "Not Approved",
                        statusColor: "red"},()=> {
                            this.updateData(this.state.selection)
                        })
                }
                else {
                    this.setState({
                        approved: "Approved",
                        statusColor: "green"},()=> {
                            this.updateData(this.state.selection)
                    })
                }
            })
        }
    }

    previousWorkshop = ()=> {
        let select = this.state.selection
        if (select == 0) {

        }
        else {
            select = select - 1
            this.setState({
                selection: select,
                //approved: "",
                //statusColor: "",
            },() => { 
                if (!this.state.workshops[select].approved)
                {
                    this.setState({
                    approved: "Not Approved",
                    statusColor: "Red"},()=> {
                        this.updateData(this.state.selection)
                    })
                }
                else {
                    this.setState({
                        approved: "Approved",
                        statusColor: "Green"},()=> {
                            this.updateData(this.state.selection)
                    })
                }
            })
        }
    }

    updateData = (select)=> {
        if (this.state.workshops.length == 0)
        {
            this.setState({
                ownerName: "",
                ownerPosition: "",
                ownerContact: "",
                ownerCNIC: "",
                companyName: "",
                companyEmail: "",
                companyContact: "",
                companyAddress: "",
                companyCity: "",
                companyZip: "",
                approved: "",
                selection: "",
                statusColor: "",
                numberOfRecords: "",
                workshops: []
            })
        }

        else {
        this.setState({
            ownerName: this.state.workshops[select].ownerName,
            ownerPosition: this.state.workshops[select].ownerPosition,
            ownerContact: this.state.workshops[select].ownerContact,
            ownerCNIC: this.state.workshops[select].ownerCNIC,
            companyName: this.state.workshops[select].companyName,
            companyEmail: this.state.workshops[select].companyEmail,
            companyContact: this.state.workshops[select].companyContact,
            companyAddress: this.state.workshops[select].companyAddress,
            companyCity: this.state.workshops[select].companyCity,
            companyZip: this.state.workshops[select].companyZip,
        },()=> {
            if (!this.state.workshops[select].approved /*|| this.state.approved == "Not Approved"*/) { 
                this.setState({
                    aprroved: "Not Approved",
                    statusColor: "red"
                },()=> {
                    console.log("Update Date Not Approved")
                    console.log(this.state.workshops[select].approved)
                    console.log(this.state.statusColor)
                    console.log(this.state.approved)
                })
            }
            else {
                this.setState({
                    aprroved: "Approved",
                    statusColor: "green"
                },()=> {
                    console.log("Update Date Approved")
                    console.log(this.state.workshops[select].approved)
                    console.log(this.state.statusColor)
                    console.log(this.state.approved)
                })
            }
        })
    }

    }

    updateStatus = (status)=> {
        console.log(status)
        let select = this.state.selection
        let workshopsTemp = this.state.workshops

        const payload= {
            companyEmail: this.state.companyEmail,
        }
        if (status == "Approved") {
            workshopsTemp[select].approved = true;
            workshopsTemp.splice(select, 1);

            if (workshopsTemp.length == 0)
            {
                this.setState({
                    ownerName: "",
                    ownerPosition: "",
                    ownerContact: "",
                    ownerCNIC: "",
                    companyName: "",
                    companyEmail: "",
                    companyContact: "",
                    companyAddress: "",
                    companyCity: "",
                    companyZip: "",
                    approved: "",
                    selection: "",
                    statusColor: "",
                    numberOfRecords: "",
                    workshops: [],
                    disabled: "disabled"
                })
            }

            else {
            this.setState({
                approved: "Approved",
                statusColor: "green",
                workshops : workshopsTemp,
                numberOfRecords: workshopsTemp.length

            },()=> {
                this.updateData(this.state.selection)
            })
        }

        axios({
            url: "/saveWorkshop",
            method: "POST",
            data: payload
        })
        .then(response => {
            console.log(response);
        })
        .catch(error=> {
            console.log(error);
        })

        }

        else if (status == "Not Approved") {
            workshopsTemp[select].approved = false;
            this.setState({
                approved: "Not Approved",
                statusColor: "red",
                workshops : workshopsTemp
            },()=> {
                this.updateData(this.state.selection)
            })
        }            
            
    }

    render(){
        return (
    <div>
        <MDBRow className = "mt-2">
            <MDBCol>
            <MDBJumbotron className = "pt-1">
                <h3 className="h3 display-4">Owner Details</h3>
                <hr className="my-2" />
                <div className = "mt-3"><kbd className = "h4">Name:</kbd> <span className = "pl-3">{this.state.ownerName}</span></div>
                <div className = "mt-3"><kbd className = "h4">Positon:</kbd> <span className = "pl-3">{this.state.ownerPosition}</span></div>
                <div className = "mt-3"><kbd className = "h4">Contact:</kbd> <span className = "pl-3">{this.state.ownerContact}</span></div>
                <div className = "mt-3"><kbd className = "h4">CNIC:</kbd> <span  className = "pl-3">{this.state.ownerCNIC}</span></div>
            </MDBJumbotron>
            </MDBCol>
        </MDBRow>
        <MDBRow className = "mt-1">
        <MDBCol>
            <MDBJumbotron className = "pt-1">
            <h3 className="h3 display-4">Workshop Details</h3>
            <hr className="my-2" />
            <div className = "mt-3"><kbd className = "h4">Name:</kbd> <span  className = "pl-3">{this.state.companyName}</span></div>
            <div className = "mt-3"><kbd className = "h4">Email:</kbd> <span className = "pl-3">{this.state.companyEmail}</span></div>
            <div className = "mt-3"><kbd className = "h4">Contact:</kbd> <span className = "pl-3">{this.state.companyContact}</span></div>
            <div className = "mt-3"><kbd className = "h4">Address:</kbd> <span className = "pl-3">{this.state.companyAddress}</span></div>
            <div className = "mt-3"><kbd className = "h4">City:</kbd> <span className = "pl-3">{this.state.companyCity}</span></div>
            <div className = "mt-3"><kbd className = "h4">Zip:</kbd> <span className = "pl-3">{this.state.companyZip}</span></div>
            <div className = "mt-3"><kbd className = "h4" style={{backgroundColor: this.state.statusColor}}>Status:</kbd><span  className = "pl-3">{this.state.approved}</span></div>

            </MDBJumbotron>
        </MDBCol>
        </MDBRow>
        <MDBRow>
            <MDBCol md="2">
                <MDBBtn color="elegant" disabled = {this.state.disabled} onClick={this.previousWorkshop}>
                    <MDBIcon icon="angle-left" className="mr-1" />
                </MDBBtn>
            </MDBCol>
            <MDBCol md="8" className = 'text-center'>
                <MDBBtn color="danger" disabled = {this.state.disabled} onClick={() => {this.updateStatus("Not Approved")}}>
                    <MDBIcon icon="times" className="mr-1" /> Decline
                </MDBBtn>
                <MDBBtn color="success" disabled = {this.state.disabled} onClick={() => {this.updateStatus("Approved")}}>
                    Approve <MDBIcon icon="check" className="ml-1" />
                </MDBBtn>
            </MDBCol>
            <MDBCol md="2">
                <MDBBtn color="elegant right"  disabled = {this.state.disabled} onClick={this.nextWorkshop}>
                    <MDBIcon icon="angle-right" className="mr-1" />
                </MDBBtn>
            </MDBCol>
        </MDBRow>
    </div>
        )
}}

export default JumbotronPage;