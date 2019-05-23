import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import ProfileRowComment from "./ProfileRowComment";

class AddComment extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
    }
   
    handleSubmit(e){
        e.preventDefault();
        const data ={
            _id: this.props.id,
            author: this.props.author,
            comment: this.state.comment
        }
        this.props.addcomment(data);
    }
    handleFormChange(e){
 
        this.setState({
           [e.target.name] : e.target.value 
        });
    }
    render(){
        return(
            <div className="p-3 bg-light rounded">
                <form onSubmit={this.handleSubmit}>
                 <ProfileRowComment title="Comment:">   
                      <div className="form-group">
                          <input className="form-control"  
                              name="comment" 
                              id="comment" 
                              type="text"
                              onChange={this.handleFormChange}
                          />
                      </div>
                 </ProfileRowComment>
                  <input type="submit" className="btn btn-success" value="Submit" />
                </form>
      
            </div>
        )
    }
}

export default withRouter(AddComment);