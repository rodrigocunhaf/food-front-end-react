import React, { useState } from "react";
import style from "./Cart.module.css";
import cartIcon from "../../assets/icons/cart-icon.png"
import { CartList } from "./CartList";

const Cart = ( ) => {

    const [ cartListIsVisible, setCartListVisible ] = useState(false)

    const  onClickCartVisibility = ( ) => {
        return setCartListVisible(!cartListIsVisible);
    };

    return (
        <div className={style.container}>
            <React.Fragment>
                <button onClick={onClickCartVisibility} 
                        className={style.buttonCart}><img className={style.imageCart} 
                                                              src={cartIcon}/></button>
            </React.Fragment>
            <CartList isVisible={cartListIsVisible} onClickEvent={onClickCartVisibility }/>
        </div>
    )
};

export { Cart };