import React, { useContext, useEffect, useState } from "react";
import style from "./ProductItem.module.css";
import { ProductDescription } from "./ProductDescription";
import { CartContext } from "../../context/CartContext";


const ProductItem = ( props ) => {

    const [ productQuanty, setProductQuanty ] = useState(0);

    const [infoIsVisible , setInfoIsVisible ] = useState(false);

    const cartContext = useContext(CartContext);

    const [quantyIsValid, setQuantyIsValid ] = useState(true);

    const onChangeHandler = ( event ) => {
        if ( Number(event.target.value) || event.target.value === '') {
            setProductQuanty(Number(event.target.value));
        }
    };

    const onClickInfo = ( ) => {
        setInfoIsVisible(!infoIsVisible);
    };

    const addItem = ( ) => {
        cartContext.addItem({
            id:props.id,
            name:props.name,
            price:props.price,
            quantity:Number(productQuanty)
        });
        setProductQuanty(0);
    };

    const resetInput = ( ) => {
        setProductQuanty('');
    };

    const onBlurInputHandler = ( event ) => {
        if ( productQuanty === ''){
            setProductQuanty(0);
        };
    };

    useEffect ( ( ) => {
        if ( Number(productQuanty)> 0 && productQuanty !== ''){
            setQuantyIsValid(false);
        } else {
            setQuantyIsValid(true);
        }
    },[productQuanty]);


    const classCSS = `${style.container} ${ props.move ? style.toRight : ''}`;

    return ( 
        <li className={classCSS}>
            <div className={style.boxImage}>
                <img src={props.image} alt={props.name}/>
                <ProductDescription isVisible={infoIsVisible}/>
            </div>
            <div className={style.boxInfo}>
                <p>{props.name}</p>
                <p>${props.price}</p>
            </div>
            <div className={style.boxController}>
                <button onClick={onClickInfo}>+info</button>
                <input type={'text'} maxLength={2} 
                        onClick={resetInput} 
                        onChange={onChangeHandler} 
                        onBlur={onBlurInputHandler}
                        value={productQuanty}/>
                <button onClick={addItem} disabled={quantyIsValid}>Add</button>
            </div>
        </li>
    );
};

export { ProductItem };