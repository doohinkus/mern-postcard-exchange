import React from 'react';
import PropTypes from "prop-types";
import GalleryAddImage from './GalleryAddImage';


const Gallery = props => {
    if (typeof props.userinfo == "undefined") return (<div>Gallery!!!</div>)
    //authenitcation component?? checks for undefined returns component
    const message = (<p>Gallery Images</p>)
    
    return (
        <React.Fragment>
            
            <h1>Gallery</h1>
            {props.isloggedin ? (<GalleryAddImage addimage={props.addimage} />) : (message)}
    
            

        </React.Fragment>
        
    );
    
};

Gallery.propTypes = {
    isloggedin: PropTypes.bool.isRequired,
    userinfo: PropTypes.object,
    addimage: PropTypes.func,
};

export default Gallery;