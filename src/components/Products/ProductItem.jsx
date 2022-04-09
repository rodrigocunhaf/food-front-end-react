import React, { useContext, useEffect, useState } from "react";
import style from "./ProductItem.module.css";
import { ProductDescription } from "./ProductDescription";
import { CartContext } from "../../context/CartContext";
import styled from 'styled-components';



const CardBox = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: ${ props => props.widowWidth < 768 ? window.screen.width+'px' :  '480px' };
    max-height: 788px;
    width: 100%;
    left: 0;
    transition-duration: 2s;
`




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
        <CardBox widowWidth={window.screen.width}>
            <div className={style.boxImage} style={{
                maxHeight:50+'%',
            }}>
                <img src={props.image}/>
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
        </CardBox>
    );
};

export { ProductItem };