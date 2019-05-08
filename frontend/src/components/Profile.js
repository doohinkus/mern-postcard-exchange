import React, { Component } from 'react';
import { Button, Card, CardTitle, CardBody } from 'reactstrap';

const Profile = (props) => {
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
               <p>Signin data: {props.userinfo.message}</p>
           </React.Fragment>
    )
   
        
    return (
        <React.Fragment>
            {props.isloggedin ? userinfo : (<p>logged out</p>)}
        </React.Fragment>
    )
            
        
    
};

export default Profile;