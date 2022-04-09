import React from "react";
import style from "./Main.module.css";
import { ProductsList } from "../../components/Products/ProductsList";

const Main = ( ) => {

    return ( 
        <div className={style.container}>
            <div className={style.box}>
                <ProductsList/>
            </div>
        </div>
    );
};

export { Main };