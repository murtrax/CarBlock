import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBBadge } from "mdbreact";

const ListGroupPage = () => {
return (
<div class= "ml-4 mt-2">
    <MDBListGroup style={{ width: "18rem" }}>
    <MDBListGroupItem className="d-flex justify-content-between align-items-center">Alerts<MDBBadge
        color="primary" pill>0</MDBBadge>
    </MDBListGroupItem>
    <MDBListGroupItem className="d-flex justify-content-between align-items-center">Workshops<MDBBadge color="primary"
        pill>1</MDBBadge>
    </MDBListGroupItem>
    <MDBListGroupItem className="d-flex justify-content-between align-items-center">Ownership Transfer
    </MDBListGroupItem>
    <MDBListGroupItem className="d-flex justify-content-between align-items-center">Add New Car
    </MDBListGroupItem>
  </MDBListGroup>
</div>

);
};

export default ListGroupPage;