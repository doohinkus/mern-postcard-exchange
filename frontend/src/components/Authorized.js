import React from "react";
import PropTypes from "prop-types";

const Authorized = props => {
    return (props.isloggedin ? props.authorized : props.default)
}
Authorized.propTypes = {
    isloggedin: PropTypes.bool.isRequired,
    authorized: PropTypes.func.isRequired,
    default: PropTypes.func.isRequired,
};
export default Authorized;