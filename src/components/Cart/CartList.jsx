import React, { useContext, useState } from "react";
import style from "./CartList.module.css";
import { CartContext } from "../../context/CartContext";
import { CartListItem } from "../Cart/CartListItem";
import cartNotFound from "../../assets/icons/cart-not-found.png";
import { FormFinishPurchase } from "../FormFinishPurchase/FormFinishPurchase.jsx"
import { CartResume } from "./CartResume";
import { CloseButton } from "../CloseButton/CloseButton";

const CartList = ( props ) => {

    const cartContext = useContext(CartContext);

    //Control Form or CartList is visible ?
    const [isVisibleForm, setIsVisibleForm ] =  useState(false);


    //Button 'PURCHASE' disable on CartList ?
    const purchaseDisable = cartContext.products.length > 0 ? false : true;

    const onClickPurchaseHandler = ( ) => {
        setIsVisibleForm(!isVisibleForm);
    };

    return (
        <React.Fragment>
            {
                //<----------------------CART--LIST----------------------->
                props.isVisible &&  !isVisibleForm &&
                    <div className={style.container}>
                        <CloseButton onClickEvent={ props.onClickEvent}/>
                        { cartContext.products.length > 0 ? <ul className={style.boxList}>
                            { cartContext.products.map( item => {
                                                            return <CartListItem 
                                                                                key={item.id}
                                                                                item={item} 
                                                                                removeItem={cartContext.removeOneItem} 
                                                                                addItem={cartContext.addOneItem}/>})}</ul> : <div className={style.notFound}>
                                                                                                                                <p>There are no products found in your cart.</p>
                                                                                                                                <img src={cartNotFound}/>
                                                                                                                            </div> }
                        <div className={style.buyInfo}>
                            <CartResume buttonName={'Purchase'} 
                                        disabled={purchaseDisable}
                                        total={cartContext.total}
                                        onClickEvent={onClickPurchaseHandler}/>
                        </div>    
                    </div>
                //<----------------------CART--LIST----------------------->
            }
        
            {
                //<----------------------CART-FORM----------------------->
                props.isVisible && isVisibleForm && <div className={style.container}>
                    <FormFinishPurchase total={cartContext.total} onClickEvent={onClickPurchaseHandler}/>
                </div>
                //<----------------------CART--FORM----------------------->
            }
        </React.Fragment>    
    );
};

export  {CartList }