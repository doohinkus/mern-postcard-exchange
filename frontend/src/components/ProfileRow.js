import React from "react";
import PropTypes from "prop-types";
const ProfileRow = props => {
    
        return(
            <div className="row border border-light mt-2">
                <div className="col-md-2 text-md-right">
                    <strong>{props.title}</strong>
                </div>
                <div className="col-md-10 text-md-left">
                    {props.children}
                    {/* <img src={`http://localhost:5000/static/avatar.gif`} className="rounded-circle" /> */}
                </div>
            </div>
        );
    
}
ProfileRow.propTypes = {
    title: PropTypes.string.isRequired,
};

export default ProfileRow;