import React from 'react';

import classes from './Modal.css';

import Aux from '../../../hoc/Auxilliary/Auxilliary';

import Backdop from '../Backdrop/Backdrop';

const Modal = (props) => {
    return (
        <Aux>
            <Backdop show={props.show} click={props.modalClosed}/>
            <div 
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0px)' : 'translateY(-1000px)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Aux>
    )
}

export default React.memo(
    Modal, 
    (prevProps, nextProps) => 
        nextProps.show === prevProps.show && 
        nextProps.children === prevProps.children
)