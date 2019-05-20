import React from "react";
import PropTypes from "prop-types";

const ShowComments = props => {
    console.log(props._id, " : ", props.comments)
    const comments = props.comments.map(comment => {
        return (
            <React.Fragment key={comment._id}>
                <div className="w-60 row border p-3 rounded m-0 mt-1">
                    <div className="col-md-2">
                        <img src={`http://localhost:5000/static/avatar.gif`} style={{ width: '2.25rem', height:'2.25rem'}} alt={comment.author} className="mr-3 mt-3 rounded-circle img-thumbnail"  />
                    </div>
                    <div className="media-body text-left rounded col-md-10">
                        <p>{comment.author} <small><i>Posted on {comment.posted.split("T")[0]}</i></small></p>
                        <p>{comment.text}</p>
                    </div>
                </div>
            </React.Fragment>
        )
    })
    return ( 
        <React.Fragment>
            {comments}
        </React.Fragment>
    )
        
 
        
    
}
ShowComments.propTypes = {
    comments: PropTypes.array.isRequired,
};
export default ShowComments;