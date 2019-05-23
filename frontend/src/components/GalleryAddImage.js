import React, { Component } from 'react';
import { Button, Card, CardBody, Form } from 'reactstrap';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Fade from 'react-reveal/Fade';

class GalleryAddImage extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            isopen: 0,
        }
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    handleFormChange(e){  
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e){
        e.preventDefault();
        // if(!this.uploadinput.value) return alert('missing stuff');
        const formdata = {
            image: this.uploadinput.files[0],
            senderpostalcode: this.senderpostalcode.value,
            receiverpostalcode: this.receiverpostalcode.value
        }
        this.props.addimage(formdata);
        this.props.history.push('/gallery');
        

    }
    toggle(e){
        e.preventDefault();
        this.setState({
            isopen: !this.state.isopen
        })
    }
    // MUST INLUDE NAMES FOR MULTER!!!!!
    render(){
        const form = (
            <React.Fragment>
                <Fade>
                   <div className="form-group">
                             <input className="form-control"  
                                 ref={(ref) => { this.uploadinput = ref; }}
                                 name="galleryImage" 
                                 id="galleryImage" 
                                 required

                                 type="file" />
                         </div>

                         <div className="form-group">
                             <label htmlFor="senderpostalcode">Sender Postalcode</label>
                             <input className="form-control" 
                                 ref={(ref) => { this.senderpostalcode = ref; }} 
                                 name="senderpostalcode"
                                 id="senderpostalcode"
                                 type="text" 
                                 required

                                 placeholder="zip from user address" />
                         </div>
                         <div className="form-group">
                             <label htmlFor="receiverpostalcode">Receiver Postalcode</label>
                             <input className="form-control" 
                                 ref={(ref) => { this.receiverpostalcode = ref; }} 
                                 name="receiverpostalcode"
                                 id="receiverpostalcode"
                                 required

                                 type="text" 
                                 placeholder="zip from partner address" />
                         </div>
                         <Button onClick={this.handleSubmit} lassName='btn btn-success' >Submit</Button>
                </Fade>
            </React.Fragment>
        )
        const button = (<button className='btn btn-primary' onClick={this.toggle}>{this.state.isopen ? "Close" : "Open"}</button>)
       return (
          

            <React.Fragment>
                <form className="text-left"  encType="multipart/form-data">
                    <Card>
                        <CardBody>
                            <h4>Add Pic of Postcard</h4>
                            {button}
                            {this.state.isopen && (form) || ""}
                        </CardBody>
                    </Card>
                </form>
            </React.Fragment>
       )
       
    
    };
}
GalleryAddImage.propTypes = {
  addimage: PropTypes.func.isRequired,
};

export default withRouter(GalleryAddImage);