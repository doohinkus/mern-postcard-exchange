import React, { Component } from 'react';
import { Button, Card, CardTitle, CardBody } from 'reactstrap';
import Field from "./Field";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";



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
        if(!this.uploadinput.value) return alert('missing stuff');
        const formdata = {
            image: this.uploadinput.files[0],
            senderpostalcode: this.senderpostalcode.value,
            receiverpostalcode: this.receiverpostalcode.value
        }
        // console.log(formdata);
        // this.props.addimage(this.uploadinput.files[0]);
        this.props.addimage(formdata);
        // this.props.getimages();
        this.props.history.push('/gallery');
        
        //send token

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
            </React.Fragment>
        )
        const button = (<button onClick={this.toggle}>{this.state.isopen ? "Close" : "Open"}</button>)
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