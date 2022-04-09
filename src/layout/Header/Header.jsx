import React from "react";
import { Cart } from "../../components/Cart/Cart";
import style from "./Header.module.css";

const Header = ( ) => {

    return ( 
        <div className={style.container}>
            <div className={style.box}>
                <div></div>
                <Cart/>
            </div>
        </div>
    );
};

export { Header };