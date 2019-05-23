import React, {Component} from "react";
import PropTypes from "prop-types";
import Fade from 'react-reveal/Fade';

class ShowComments extends Component {
    constructor(props){
        super(props);
        this.state = {
            showComment: false
        }
        this.toggleComments = this.toggleComments.bind(this);
    }
    toggleComments(){
        this.setState({
            showComment: !this.state.showComment
        })
    }
    render(){
        const comments = this.props.comments.reverse().map(comment => {
            return (
                <React.Fragment key={comment._id}>
                    <Fade left>
                        <div className="w-60 row border p-3 rounded m-0 mt-1">
                            <div className="col-md-2">
                                <img src={`http://localhost:5000/static/avatar.gif`} style={{ width: '2.25rem', height:'2.25rem'}} alt={comment.author} className="mr-3 mt-3 rounded-circle img-thumbnail"  />
                            </div>
                            <div className="media-body text-left rounded col-md-10">
                                <p>{comment.author} <small><i>Posted on {comment.posted.split("T")[0]}</i></small></p>
                                <p>{comment.text}</p>
                            </div>
                        </div>
                    </Fade>
                </React.Fragment>
            )
        })
        const showHideButton = (<a onClick={this.toggleComments} style={{cursor: "pointer"}}>{this.state.showComment ? "Hide" : "Show"} Comments</a>);
        return ( 
            <React.Fragment>
              
                
                {this.props.comments.length ? showHideButton : "No comments"}
                {this.state.showComment ? comments : ""}
            </React.Fragment>
        )
            
    }
  
 
        
    
}
ShowComments.propTypes = {
    comments: PropTypes.array.isRequired,
};
export default ShowComments;