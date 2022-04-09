import React from "react";
import style from "./CartResume.module.css";

const CartResume = ( props ) => {

    const OnClickHandler = ( ) =>{
        props.onClickEvent();
    };

    return (
            <React.Fragment>
                <div className={style.boxButton}>
                    <button onClick={ props.onClickEvent ? OnClickHandler : null } disabled={ props.disabled }>{props.buttonName}</button>
                </div>
                <div className={style.boxTotal}> 
                    <p>Total $ {props.total.toFixed(2)}</p>
                </div>
            </React.Fragment>
    )
};

export  { CartResume };