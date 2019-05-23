import React from 'react';
import PropTypes from "prop-types";
import LazyLoad from 'react-lazyload';
import { Card, CardBody, CardTitle } from 'reactstrap';
import AddComment from './AddComment';
import ShowComments from './ShowComments';
import PostalCodeMap from './PostalCodeMap';
import Fade from 'react-reveal/Fade';
import avatar from '../images/avatar.gif';


const GalleryShowImages = props => {
   
    return (
        <React.Fragment>
            
            {props.images.map(image => {  
                return (
                    <LazyLoad placeholder={<p>Loading...</p>} height={100} key={image._id}>
                        
                            <Card className="mt-2">
                                <Fade key={image._id}>
                                <CardBody className="card card-body">
                                    <div className="row">
                                        <div className="col-md-2">
                                       
                                            <img className="img-thumbnail rounded-circle" src={avatar} alt={`Avatar for ${image.ownername}`} />
                                            <h5 className="mt-0">{image.ownername}</h5>
                                        </div>
                                        <div className="col-md-10 bg-light p-2">
                                                <img src={`${props.url}/static/${image.url}`} className="img-thumbnail img-fluid" />
                                            
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
                                    </Fade>
                                </Card>
                        </LazyLoad>
                     
                     )
            })}

        </React.Fragment>
    );
    
};

GalleryShowImages.propTypes = {
    galleryimages: PropTypes.array,
};

export default GalleryShowImages;