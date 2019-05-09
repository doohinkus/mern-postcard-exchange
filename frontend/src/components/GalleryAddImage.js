import React, { Component } from 'react';
import { Button, Form, Card, CardTitle, CardBody } from 'reactstrap';
import Field from "./Field";
import PropTypes from "prop-types";


class GalleryAddImage extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleFormChange(e){  
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e){
        e.preventDefault();
        if(!this.uploadInput.value) return alert('missing stuff');
        // return this.pGalleryAddImage(this.state);
        // console.log(this.uploadInput.files[0]);
        // const data = new FormData();
        // data.append('galleryImage', this.uploadInput.files[0]);
        // console.log("asdfs ", data.galleryImage);
        // console.log(this.uploadInput.files[0]);
        this.props.addimage(this.uploadInput.files[0]);
        //send token

    }
    // MUST INLUDE NAMES FOR MULTER!!!!!
    render(){
       return (
            <React.Fragment>
                <Form className="text-left" action="/Gallery" method="post" encType="multipart/form-data">
                    <Card>
                        <CardBody>
                            <div className="form-group">
                                <input className="form-control"  
                                    ref={(ref) => { this.uploadInput = ref; }}
                                    name="galleryImage" 
                                    id="galleryImage" 
                                    type="file" />
                            </div>

                            <div className="form-group">
                                <input className="form-control" 
                                    ref={(ref) => { this.fileName = ref; }} 
                                    name="name"
                                    type="text" 
                                    placeholder="Optional name for the file" />
                            </div>
                            <Button onClick={this.handleSubmit}>Submit</Button>
                        </CardBody>
                    </Card>
                </Form>
            </React.Fragment>
       )
       
    
    };
}
GalleryAddImage.propTypes = {

};

export default GalleryAddImage;