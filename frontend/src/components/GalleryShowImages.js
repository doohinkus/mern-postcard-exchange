import React from 'react';
import PropTypes from "prop-types";
import LazyLoad from 'react-lazyload';

//takes list and outputs image


const GalleryShowImages = props => {
    // if (typeof props.userinfo == "undefined") return (<div>GalleryShowImages!!!</div>)
    //authenitcation component?? checks for undefined returns component
 
    
    return (
        <React.Fragment>
            <button onClick={props.getimages}>Get Images</button>
            {props.images.map(image => {
                return (
                        <LazyLoad height={100} key={image._id}>
                            <img src={`http://localhost:5000/static/${image.url}`} className="img-thumbnail" style={{width: '50%'}} />
                            <p>Sender postalcode: {image.senderpostalcode}</p>
                            <p>Receiver postalcode: {image.receiverpostalcode}</p>
                        </LazyLoad>
                    )
            })}

        </React.Fragment>
    );
    
};

GalleryShowImages.propTypes = {
    galleryimages: PropTypes.array,
    getimages:PropTypes.func
};

export default GalleryShowImages;