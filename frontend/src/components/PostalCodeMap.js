import React, { Component } from "react";
import Geocode from "react-geocode";
import {googleApiKey} from  "../secret";
import Map from "./Map";




class PostalCodeMap extends Component{
    constructor(){
        super();
        this.state ={
           
        }
    }
  
    componentDidMount(){
        Geocode.setApiKey("AIzaSyA6ljV2DbcA5PNva5Hu7PbmPBlQ2pKW4D0");
        Geocode.enableDebug();
      
        Geocode.fromAddress(this.props.senderpostalcode)
            .then(response => {
                this.setState({
                    sender: {
                        lat: response.results[0].geometry.location.lat,
                        lng: response.results[0].geometry.location.lng,
                    },
                    center: {
                        lat: response.results[0].geometry.location.lat,
                        lng: response.results[0].geometry.location.lng,
                    },
                })
            })
            .then(() => {
                Geocode.fromAddress(this.props.receiverpostalcode)
                        .then(response => {
                            this.setState({
                                receiver: {
                                    lat: response.results[0].geometry.location.lat,
                                    lng: response.results[0].geometry.location.lng,
                                },
                                renderMap: true
                            })
                        });
            })
            .catch(error => {
                this.setState({
                    error: true,
                    renderMap: false
                })
            });
            
        }
        render(){
            return (
                <React.Fragment>
                    {this.state.renderMap && (
                        <Map
                            center={this.state.center}
                            sender={this.state.sender}
                            receiver={this.state.receiver}
                            senderpostalcode={this.props.senderpostalcode}
                            receiverpostalcode={this.props.receiverpostalcode}
                        />
                    )}
                </React.Fragment>
        )
    }
}

export default PostalCodeMap;