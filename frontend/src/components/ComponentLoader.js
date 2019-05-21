import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';


class ComponentLoader extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
        }

    }
    componentDidMount(){
        this.setState({
            loading: false
        });
    }
    render(){
        return (
            {this.state.loading ? (<p>Loading...</p>) : ({this.props.children})}
       
           
        );
    }
};

export default ComponentLoader;