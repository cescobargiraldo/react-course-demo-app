import React, {Component} from 'react';

import classes from './Modal.css';

import Aux from '../../../hoc/Auxilliary/Auxilliary';

import Backdop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextSate){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render (){
        return (
            <Aux>
                <Backdop show={this.props.show} click={this.props.modalClosed}/>
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0px)' : 'translateY(-1000px)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
            
        );
    }
      
};

export default Modal;