import React, { Component } from 'react';
import { Button, Card, CardTitle, CardBody } from 'reactstrap';
import PropTypes from "prop-types";

const Profile = (props) => {
    const message = (<p>Logged out</p>);
    if (!props.userinfo) return message;
    const userinfo = (
           <React.Fragment>
               <Card >
                   <CardTitle><h2>{props.userinfo.firstname}</h2></CardTitle>
                   <CardBody>
                        <p>Particpating in this month's postcard exchange: <strong>{props.userinfo.isparticipating ? "Yes" : "No"}</strong></p>
                        <p>Paired up: <strong>{props.userinfo.ispaired ? "Yes" : "No"}</strong></p>
                        <p>Address: </p>
                        <p className='alert alert-primary'>
                            {props.userinfo.contact.address.streetaddress} <br />
                            {props.userinfo.contact.address.city} <br />
                            {props.userinfo.contact.address.state} <br />
                            {props.userinfo.contact.address.country} <br />
                            {props.userinfo.contact.address.zip} <br />
                        </p>
                   </CardBody>
               </Card>
           
               <button onClick={props.signout}>Log Out</button>
           </React.Fragment>
    )
   
        
    return (
        <React.Fragment>
            {props.isloggedin ? userinfo : message}
        </React.Fragment>
    )
            
        
    
};
Profile.propTypes = {
    userinfo: PropTypes.object.isRequired,
};
export default Profile;