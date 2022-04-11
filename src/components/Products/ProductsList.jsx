import React, { useCallback, useEffect, useState } from "react";
import { useHttpRequest } from "../../hooks/use-http-request";
import { ProductItem } from "./ProductItem";
import loadingImage from "../../assets/icons/loading.png";
import style from "./ProductsList.module.css";

const ProductsList = ( ) => {

    const [ products, setProducts ] = useState([]);

    const { requestHttp: getProducts , isLoading:loading} =  useHttpRequest();

    const updateList = ( data ) => {
        setProducts(data)
    };

    const updateProductList =  useCallback(( ) => {
        getProducts('https://food-order-app-9adbd-default-rtdb.firebaseio.com/TB_FOODS.json','GET', null , updateList)
    },[getProducts]);

    useEffect ( ( ) => {
        updateProductList()
    },[updateProductList]);

    const [moveRight, setMoveRight ] = useState(false);
    
    const goToRight = ( ) => {
        setMoveRight(true)
    };

    const goToLeft = ( ) => {
        setMoveRight(false)
    };

    return (
        <div className={style.boxContent} >
            <button onMouseEnter={goToLeft}  className={style.buttonLeft}>{'<'}</button>
            { <ul className={style.container}>
                { !loading ? products.map ( product=> {
                    return <ProductItem key={product.id} id={product.id} name={product.name} price={product.price} image={product.image} move={moveRight} />
                }): <div className={style.loading}>
                        <img src={loadingImage} alt={'loading...'}/>
                        <p>Loading...</p>
                    </div> }
                {
                    !loading && products.length === 0 && 
                    <div className={style.error}>Something went wrong.</div>
                }
            </ul> }
            <button onMouseEnter={goToRight}  className={style.buttonRight}>{'>'}</button>
        </div>)
};

export { ProductsList };


