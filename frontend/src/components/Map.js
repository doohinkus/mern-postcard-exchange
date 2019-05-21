import React, {Component} from "react";
import GoogleMapReact from "google-map-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


const Marker = ({ text }) => <div style={{fontSize:'1.5rem', width:"100%"}}>📬</div>;

class Map extends Component {
    constructor(props){
        super(props);
        this.state={
            showmap: false
        }
        this.toggleMap=this.toggleMap.bind(this);
    }
    toggleMap(){
        this.setState({
            showmap: !this.state.showmap
        });
    }
    render(){
        return (
            <React.Fragment>
                <p onClick={this.toggleMap} style={{cursor: 'pointer'}}>{this.state.showmap ? (<FontAwesomeIcon icon={faEyeSlash} />) : (<FontAwesomeIcon icon={faEye} />)} Map</p>
                {this.state.showmap && (
                    <div style={{ height: '40vh', width: '80%', margin: 'auto' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyA6ljV2DbcA5PNva5Hu7PbmPBlQ2pKW4D0" }}
                        defaultCenter={this.props.center}
                        defaultZoom={3}>
                        <Marker
                            lat={this.props.sender.lat}
                            lng={this.props.sender.lng}
                            text={ "Postcard sent from " + this.props.senderpostalcode}
                        />
                        <Marker
                            lat={this.props.receiver.lat}
                            lng={this.props.receiver.lng}
                            text={ "Postcard sent from " + this.props.senderpostalcode}
                        />
                    </GoogleMapReact>
                </div>
                )}
            </React.Fragment>
        )
    } 

}

export default Map;