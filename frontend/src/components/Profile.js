import React from 'react';
import { Card, CardTitle, CardBody, Button } from 'reactstrap';
import Authorized from "./Authorized";
import ProfileRow from "./ProfileRow";
import PropTypes from "prop-types";

const Profile = (props) => {
    const message = (<p>Logged out</p>);
    if (!props.userinfo) return message;
    const userinfo = (
           <React.Fragment>
               <ProfileRow
                    title="Avatar"
               >
                    <img src={`http://localhost:5000/static/avatar.gif`} className="rounded-circle p-2" />

               </ProfileRow>
               <ProfileRow
                    title="First Name:"
               >
                    <p>{props.userinfo.firstname}</p>

               </ProfileRow>
               <ProfileRow
                    title="Last Name:"
               >
                    <p>{props.userinfo.lastname}</p>

               </ProfileRow>
               <ProfileRow
                    title="Participating this month:"
               >
                    <strong>{props.userinfo.isparticipating ? "Yes" : "No"}</strong>

               </ProfileRow>
               <ProfileRow
                    title="Am I paired up this month?"
               >
                    <strong>{props.userinfo.isparticipating ? "Yes" : "No"}</strong>

               </ProfileRow>
               <ProfileRow
                    title="Address:"
               >
                    <p className='bg-light p-3 rounded mt-2'>
                        {props.userinfo.contact.address.streetaddress} <br />
                        {props.userinfo.contact.address.city} <br />
                        {props.userinfo.contact.address.state} <br />
                        {props.userinfo.contact.address.country} <br />
                        {props.userinfo.contact.address.zip} <br />
                    </p>

               </ProfileRow>
               <Button onClick={props.signout}>Log Out</Button>
             
               {/* <Card >
                   <CardTitle><h2>{props.userinfo.firstname}</h2></CardTitle>
                   <CardBody>
                        <p>Particpating in this month's postcard exchange: </p>
                        <p>Paired up: <strong>{props.userinfo.ispaired ? "Yes" : "No"}</strong></p>
                        <p>Address: </p>
                   
                   </CardBody>
               </Card>
           
               <Button onClick={props.signout}>Log Out</Button> */}
           </React.Fragment>
    )
   
        
    return (
        <Authorized 
            isloggedin={props.isloggedin}
            authorized={userinfo}
            default={message}
        />
    )
            
        
    
};
Profile.propTypes = {
    userinfo: PropTypes.object.isRequired,
};
export default Profile;