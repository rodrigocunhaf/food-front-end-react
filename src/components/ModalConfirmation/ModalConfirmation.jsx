import React from "react";
import style from './ModalConfirmation.module.css';


const ModalConfirmation = ( props ) => {

    const closeModal = ( ) => {
        props.closeModalAndForm();
    };

    return (
        <div className={style.container}>
            <div className={style.box}>
                <p>Order placed successfully</p>
                <button onClick={closeModal}>OK</button>
            </div>
        </div>
    );
};

export { ModalConfirmation };