import React from "react";
import style from "./CartListItem.module.css";


const CartListItem = (props) => {

    const totalByProduct = props.item.quantity * props.item.price;
    
    const onClickRemoveOne = ( ) => {
        props.removeItem({id:props.item.id})
    };

    const onClickAddOne = ( ) => {
        props.addItem({id:props.item.id})
    };

    return (
        <li className={style.container}>
            <p>{props.item.name}</p>
            <div className={style.boxButton}>
                <button onClick={onClickRemoveOne}>-</button>
                <p>{props.item.quantity}</p>
                <button onClick={onClickAddOne}>+</button>
            </div>
            <p>$ {totalByProduct.toFixed(2)}</p>
        </li>
    );
};

export { CartListItem };