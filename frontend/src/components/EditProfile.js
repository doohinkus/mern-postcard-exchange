import React, {Component} from "react";
import ProfileRow from "./ProfileRow";

class EditProfile extends Component {
    constructor(props){
        //only takes userdata object
        super(props);
        this.state = {
            formdata: {}
        }
    }
    render(){
        return(
            <div className="p-3 bg-light rounded">
                <h2>Edit Profile</h2>
                 <ProfileRow title="First Name:">   
                      <div className="form-group">
                          <input className="form-control"  
                              name="firstname" 
                              id="firstname" 
                              type="text"
                              placeholder={this.props.userinfo.firstname}
                          />
                      </div>
                 </ProfileRow>
                 <ProfileRow title="Last Name:">   
                      <div className="form-group">
                          <input className="form-control"  
                              name="lastname" 
                              id="lastname" 
                              type="text"
                              placeholder={this.props.userinfo.lastname}
      
                          />
                      </div>
                 </ProfileRow>
                  <ProfileRow title="Want to participate this month?">
                      <div className="form-group">
                              <input 
                                  type="radio" 
                                  name="isparticipating" 
                                  value="yes"
                                
                                  // checked={this.props.userinfo.isparticipating}
      
                          /> Yes <br />
                              <input 
                                  type="radio" 
                                  name="isparticipating" 
                                  value="no"
                                  // checked={this.props.userinfo.isparticipating}
      
                          /> No <br />
                      </div>
                  </ProfileRow>
                  <ProfileRow title="Address:">
                      <div className="form-group">
                          <label for="streetaddress">Street Address:</label>
                          <input className="form-control"  
                              name="streetaddress" 
                              id="streetaddress" 
                              type="text"
                          />
                      </div>
                      <div className="form-group">
                          <label for="state">State / Province :</label>
                          <input className="form-control"  
                              name="state" 
                              id="state" 
                              type="text"
                          />
                      </div>
                      <div className="form-group">
                          <label for="country">Country:</label>
                          <input className="form-control"  
                              name="country" 
                              id="country" 
                              type="text"
                          />
                      </div>
                      <div className="form-group">
                          <label for="postalcode">Postalcode:</label>
                          <input className="form-control"  
                              name="postalcode" 
                              id="postalcode" 
                              type="text"
                          />
                      </div>
                    
      
                  </ProfileRow>
                  <button className="btn btn-success" onClick={()=> {console.log(this.props.userinfo)}}>Submit</button>
      
            </div>
        )
    }
}

export default EditProfile;