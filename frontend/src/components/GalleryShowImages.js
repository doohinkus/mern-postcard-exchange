import React from 'react';
import PropTypes from "prop-types";
import LazyLoad from 'react-lazyload';
import { Card, CardBody, CardTitle } from 'reactstrap';

//takes list and outputs image


const GalleryShowImages = props => {
    // if (typeof props.userinfo == "undefined") return (<div>GalleryShowImages!!!</div>)
    //authenitcation component?? checks for undefined returns component
 
    
    return (
        <React.Fragment>
            <button onClick={props.getimages}>Get Images</button>
            {props.images.map(image => {
                return (
                        
                        <Card className="mt-2">
                            <CardBody className="card card-body">
                              <div className="row">
                                <div className="col-md-2">
                                        <img className="img-thumbnail rounded-circle" src={`http://localhost:5000/static/avatar.gif`} alt={`Avatar for ${image.ownername}`} />
                                        <h5 className="mt-0">{image.ownername}</h5>
                                </div>
                                <div className="col-md-10 bg-light p-2">
                                    <LazyLoad height={100} key={image._id}>
                                        <img src={`http://localhost:5000/static/${image.url}`} className="img-thumbnail img-fluid" />
                                    </LazyLoad>
                                    <p>Sender postalcode: {image.senderpostalcode}</p>
                                    <p>Receiver postalcode: {image.receiverpostalcode}</p>
                                </div>
                              
                              </div>
                                
                            </CardBody>
                          </Card>
                     
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