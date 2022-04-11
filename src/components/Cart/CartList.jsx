import React, { useContext, useState } from "react";
import style from "./CartList.module.css";
import { CartContext } from "../../context/CartContext";
import { CartListItem } from "../Cart/CartListItem";
import cartNotFound from "../../assets/icons/cart-not-found.png";
import { FormFinishPurchase } from "../FormFinishPurchase/FormFinishPurchase.jsx"
import { CartResume } from "./CartResume";
import { CloseButton } from "../CloseButton/CloseButton";
import { ModalConfirmation } from "../ModalConfirmation/ModalConfirmation";

const CartList = ( props ) => {

    const cartContext = useContext(CartContext);

    //Control Form or CartList is visible ?
    const [isVisibleForm, setIsVisibleForm ] =  useState(false);

    const [modalConfirmationIsVisible, setModalConfirmationIsVisible ] = useState(false);

    //Button 'PURCHASE' disable on CartList ?
    const purchaseDisable = cartContext.products.length > 0 ? false : true;

    const onClickPurchaseHandler = ( ) => {
        setIsVisibleForm(!isVisibleForm);
    };

    const showModalConfirmation = ( ) => {
        setIsVisibleForm(false);
        setModalConfirmationIsVisible(true);
    };

    const closeModalAndForm = ( ) => {
        setIsVisibleForm(false);
        setModalConfirmationIsVisible(false);
    };

    return (
        <React.Fragment>
            {
                //<----------------------CART--LIST----------------------->
                props.isVisible &&  !isVisibleForm && !modalConfirmationIsVisible &&
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
                props.isVisible && isVisibleForm  && !modalConfirmationIsVisible && <div className={style.container}>
                    <FormFinishPurchase total={cartContext.total} onClickEvent={onClickPurchaseHandler} showModalConfirmation={showModalConfirmation}/>
                </div>
                //<----------------------CART--FORM----------------------->
            }

            {
                props.isVisible && !isVisibleForm && modalConfirmationIsVisible && 
                <div className={style.container}>
                    <ModalConfirmation closeModalAndForm={closeModalAndForm}/>
                </div>
            }
        </React.Fragment>    
    );
};

export  {CartList }