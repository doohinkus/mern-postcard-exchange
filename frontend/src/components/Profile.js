import React from 'react';
import { Card, CardTitle, CardBody, Button } from 'reactstrap';
import Authorized from "./Authorized";
import ProfileRow from "./ProfileRow";
import PropTypes from "prop-types";

const Profile = (props) => {
//     const message = (<p>Logged out</p>);
//     if (!props.userinfo) return message;
    const userinfo = (
           <React.Fragment>
               <p>{props.editlink}</p>
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
                    <strong>{props.userinfo.ispaired ? "Yes" : "No"}</strong>

               </ProfileRow>
               <ProfileRow
                    title="Address:"
               >
                    <p className='bg-light p-3 rounded mt-2'>
                        {props.userinfo.streetname} <br />
                        {props.userinfo.streetaddress} <br />
                        {props.userinfo.city} <br />
                        {props.userinfo.state} <br />
                        {props.userinfo.country} <br />
                        {props.userinfo.postalcode} <br />
                    </p>

               </ProfileRow>
               <Button onClick={props.signout}>Log Out</Button>
             
           </React.Fragment>
    )
   
        
    return (
        <Authorized 
            isloggedin={props.isloggedin}
            authorized={userinfo}
            default={(<p>Logged out</p>)}
        />
    )
            
        
    
};
Profile.propTypes = {
    userinfo: PropTypes.object.isRequired,
};
export default Profile;