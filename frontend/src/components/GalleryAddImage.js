import React, { Component } from 'react';
import { Button, Card, CardTitle, CardBody } from 'reactstrap';
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
        if(!this.uploadinput.value) return alert('missing stuff');
        const formdata = {
            image: this.uploadinput.files[0],
            senderpostalcode: this.senderpostalcode.value,
            receiverpostalcode: this.receiverpostalcode.value
        }
        console.log(formdata);
        // this.props.addimage(this.uploadinput.files[0]);
        this.props.addimage(formdata);
        //send token

    }
    // MUST INLUDE NAMES FOR MULTER!!!!!
    render(){
       return (
            <React.Fragment>
                <form className="text-left"  encType="multipart/form-data">
                    <Card>
                        <CardBody>
                            <div className="form-group">
                                <input className="form-control"  
                                    ref={(ref) => { this.uploadinput = ref; }}
                                    name="galleryImage" 
                                    id="galleryImage" 
                                    type="file" />
                            </div>

                            <div className="form-group">
                                <label for="senderpostalcode">Sender Postalcode</label>
                                <input className="form-control" 
                                    ref={(ref) => { this.senderpostalcode = ref; }} 
                                    name="senderpostalcode"
                                    id="senderpostalcode"
                                    type="text" 
                                    placeholder="zip from user address" />
                            </div>
                            <div className="form-group">
                                <label for="receiverpostalcode">Receiver Postalcode</label>
                                <input className="form-control" 
                                    ref={(ref) => { this.receiverpostalcode = ref; }} 
                                    name="receiverpostalcode"
                                    id="receiverpostalcode"
                                    type="text" 
                                    placeholder="zip from partner address" />
                            </div>
                            <Button onClick={this.handleSubmit}>Submit</Button>
                        </CardBody>
                    </Card>
                </form>
            </React.Fragment>
       )
       
    
    };
}
GalleryAddImage.propTypes = {

};

export default GalleryAddImage;