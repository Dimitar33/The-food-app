
import classes from '../../css/Modal.module.css';
import React, {Fragment} from 'react';
import  ReactDOM  from 'react-dom';

function Backdrop(props){

    return(
        <div className={classes.backdrop} onClick={props.hideCart} ></div>
    )
}

function ModalOverlay(props){

    return(

        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}


export default function Modal(props){

    const overlay = document.getElementById('overlay');

    return(
        <Fragment>
            {ReactDOM.createPortal(<Backdrop hideCart={props.hideCart}></Backdrop>, overlay)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlay)}
        </Fragment>
    )
}