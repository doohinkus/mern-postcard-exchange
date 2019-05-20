import React from 'react';
import PropTypes from "prop-types";
import LazyLoad from 'react-lazyload';
import { Card, CardBody, CardTitle } from 'reactstrap';
import AddComment from './AddComment';
import ShowComments from './ShowComments';
import PostalCodeMap from './PostalCodeMap';


//takes list and outputs image
// Geocode.setApiKey("AIzaSyA6ljV2DbcA5PNva5Hu7PbmPBlQ2pKW4D0");



const GalleryShowImages = props => {
  
    return (
        <React.Fragment>
            {/* <button onClick={props.getimages}>Get Images</button> */}

            {props.images.map(image => {
              
                console.log("image sender: ", image.sender, "image: ", image);
                
                return (
                       
                        <Card className="mt-2" key={image._id}>
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
                                    
                                    <PostalCodeMap 
                                        senderpostalcode={image.senderpostalcode}
                                        receiverpostalcode={image.receiverpostalcode} />
                                
                                    {props.showcommentform 
                                        && ( 
                                            <AddComment 
                                            id={image._id}
                                            addcomment={props.addcomment}
                                            author={props.author}
                                            />) 
                                            || ""
                                        }
                                    <ShowComments comments={image.comments} _id={image._id} />
                                   
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
    // getimages:PropTypes.func
};

export default GalleryShowImages;