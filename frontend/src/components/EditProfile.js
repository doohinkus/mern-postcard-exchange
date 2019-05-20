import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import ProfileRow from "./ProfileRow";

class EditProfile extends Component {
    constructor(props){
        //only takes userdata object
        super(props);
        this.state = {
        //   isediting: true,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }
   
    handleSubmit(e){
        e.preventDefault();
    
//send data to app
        console.log(this.state);
        this.props.edituser(this.state);
        this.props.history.push('/profile');
    }
    handleFormChange(e){
        //make state mirror data
 
        this.setState({
           [e.target.name] : e.target.value 
        });
    }
    render(){
        // if(!this.state.isediting) return (this.props.redirect)
        return(
            <div className="p-3 bg-light rounded">
                <h2>Edit Profile</h2>
                <form onSubmit={this.handleSubmit}>

                 <ProfileRow title="First Name:">   
                      <div className="form-group">
                          <input className="form-control"  
                              name="firstname" 
                              id="firstname" 
                              type="text"
                              placeholder={this.props.userinfo.firstname}
                              onChange={this.handleFormChange}
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
                              onChange={this.handleFormChange}
                          />
                      </div>
                 </ProfileRow>
                 <ProfileRow title="Email:">   
                      <div className="form-group">
                          <input className="form-control"  
                              name="email" 
                              id="email" 
                              type="text"
                              placeholder={this.props.userinfo.email}
                              onChange={this.handleFormChange}
                          />
                      </div>
                 </ProfileRow>
                  <ProfileRow title="Want to participate this month?">
                      <div className="form-group">
                              <input 
                                  type="radio" 
                                  name="isparticipating" 
                                  value="yes"
                                  defaultChecked={this.props.userinfo.isparticipating}
                              onChange={this.handleFormChange}
                                 
      
                          /> Yes <br />
                              <input 
                                  type="radio" 
                                  name="isparticipating" 
                                  value="no"
                              onChange={this.handleFormChange}
                                   

                              defaultChecked={!this.props.userinfo.isparticipating}
      
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
                              placeholder={this.props.userinfo.streetaddress}
                              onChange={this.handleFormChange}

                          />
                      </div>
                      <div className="form-group">
                          <label for="state">State / Province :</label>
                          <input className="form-control"  
                              name="state" 
                              id="state" 
                              type="text"
                              placeholder={this.props.userinfo.state}

                              onChange={this.handleFormChange}

                          />
                      </div>
                      <div className="form-group">
                          <label for="country">Country:</label>
                          <input className="form-control"  
                              name="country" 
                              id="country" 
                              type="text"
                              placeholder={this.props.userinfo.country}

                              onChange={this.handleFormChange}

                          />
                      </div>
                      <div className="form-group">
                          <label for="postalcode">Postalcode:</label>
                          <input className="form-control"  
                              name="postalcode" 
                              id="postalcode" 
                              type="text"
                              placeholder={this.props.userinfo.postalcode}

                              onChange={this.handleFormChange}

                          />
                      </div>
                    
                
                  </ProfileRow>
                  <input type="submit" className="btn btn-success" value="Submit" />
                </form>
      
            </div>
        )
    }
}

export default withRouter(EditProfile);