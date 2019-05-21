import React from 'react';
import PropTypes from "prop-types";
import GalleryAddImage from './GalleryAddImage';
import Authorized from './Authorized';
import GalleryShowImages from './GalleryShowImages';
import LazyLoad from 'react-lazyload';


const Gallery = props => {
    // if (typeof props.userinfo == "undefined") return (<div>Gallery!!!</div>)
    //authenitcation component?? checks for undefined returns component
    // const message = (<p>Gallery Images</p>)
    
    return (
        <React.Fragment>
            {/* <Authorized 
                isloggedin={props.isloggedin}
                authorized={<GalleryAddImage addimage={props.addimage} />}
                default={message}
            /> */}
            <p>Gallery Page for unsigned users</p>
            <LazyLoad height={100}        
                placeholder={(<p>Loading...</p>)}
            >
                <GalleryShowImages images={props.images} />
            </LazyLoad>
         {/* <GalleryShowImages showimages={props.showimages} getimages={props.getimages} images={props.images} />  */}
          
        </React.Fragment>
    );
    
};

Gallery.propTypes = {
    isloggedin: PropTypes.bool.isRequired,
    userinfo: PropTypes.object,
    addimage: PropTypes.func,
};

export default Gallery;