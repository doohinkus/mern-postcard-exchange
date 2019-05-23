import React from "react";
import PropTypes from "prop-types";
const ProfileRowComment = props => {
    
        return(
            <div className="row p-2">
                <div className="col-md-2 text-md-right">
                    <strong>{props.title}</strong>
                </div>
                <div className="col-md-10 text-md-left">
                    {props.children}
                </div>
            </div>
        );
    
}
ProfileRowComment.propTypes = {
    title: PropTypes.string.isRequired,
};

export default ProfileRowComment;