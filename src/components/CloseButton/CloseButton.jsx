import React from "react";
import style from "./CloseButton.module.css";

const CloseButton = ( props) => {

    const onClickCloseHandler = ( ) => {
        props.onClickEvent();
    };

    return (
        <div className={style.container}>
                <button onClick={onClickCloseHandler}>X</button>
        </div>
    );
};

export { CloseButton };