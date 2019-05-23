import React from 'react';
import PropTypes from "prop-types";
import GalleryAddImage from './GalleryAddImage';
import Authorized from './Authorized';
import GalleryShowImages from './GalleryShowImages';
import LazyLoad from 'react-lazyload';


const Gallery = props => {
    
    return (
        <React.Fragment>

            <p>Gallery Page for unsigned users</p>
            <LazyLoad height={100}        
                placeholder={(<p>Loading...</p>)}
            >
                <GalleryShowImages images={props.images} />
            </LazyLoad>
          
        </React.Fragment>
    );
    
};

Gallery.propTypes = {
    isloggedin: PropTypes.bool.isRequired,
    userinfo: PropTypes.object,
    addimage: PropTypes.func,
};

export default Gallery;