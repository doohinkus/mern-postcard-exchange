import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';


class ComponentLoader extends Component {
    constructor(){
        super();
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
            <CSSTransition
                in={true}
                timeout={300}
                classNames="my-node"
                // unmountOnExit
                // onEnter={() => setShowButton(false)}
                // onExited={() => setShowButton(true)}
          >
                {this.state.loading ? (<p>Loading....</p>) : (<div className="fade-in visible">{this.props.children}</div>)}     
           </CSSTransition>
        );
    }
};

export default ComponentLoader;