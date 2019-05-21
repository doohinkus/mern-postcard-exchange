import React from 'react';
import { Card, CardTitle, CardBody, Button } from 'reactstrap';
import Authorized from "./Authorized";
import ProfileRow from "./ProfileRow";
import PropTypes from "prop-types";
import Fade from 'react-reveal/Fade';
import LazyLoad from 'react-lazyload';



const Profile = (props) => {
//     const message = (<p>Logged out</p>);
//     if (!props.userinfo) return message;
    const userinfo = (
           <React.Fragment>
               <LazyLoad placeholder={<p>Loading...</p>} height={100}>
                    <Fade bottom>
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
                              {props.userinfo.ispaired && (
                                    <Card>
                                         <CardBody>

                                             <h3>{props.partnerinfo.partner.partnername}</h3>
                                             <p>{props.partnerinfo.partner.parnteremail}</p>
                                             <div className="pl-2">
                                             {props.partnerinfo.partner.partneraddress.streetaddress} <br />
                                             {props.partnerinfo.partner.partneraddress.city}<br />
                                             {props.partnerinfo.partner.partneraddress.state} <br />
                                             {props.partnerinfo.partner.partneraddress.country} <br />
                                             {props.partnerinfo.partner.partneraddress.postlcode}
                                             </div>
                                         </CardBody>
                                    </Card>
                              )}
                            

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
                    </Fade>
               </LazyLoad>
             
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