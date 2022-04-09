import React, { useContext } from "react";
import { useInput } from "../../hooks/use-form-input";
import { CartResume } from "../Cart/CartResume";
import { CloseButton } from "../CloseButton/CloseButton";
import style from "./FormFinishPurchase.module.css";
import { CartContext } from "../../context/CartContext";
import { useHttpRequest } from "../../hooks/use-http-request";

const FormFinishPurchase = (props ) => {


    const { 
        inputed: firstnameInput,
        onChangeHandler: firstnameOnChange,
        isValid: isValidfirstname,
        touched: touchedInputFirstname,
        resetInput: resetFirsname

         } = useInput();

    const { 
        inputed: lastnameInput,
        onChangeHandler: lastnameOnChange,
        isValid: isValidLastname,
        touched: touchedInputLastname,
        resetInput: resetLastname
         } = useInput();

    const { 
        inputed: emailInput,
        onChangeHandler: emailOnChange,
        isValid: isValidEmail,
        touched: touchedInputEmail,
        resetInput: resetEmail
         } = useInput('EMAIL');

    const { 
        inputed: addressInput,
        onChangeHandler: addressOnChange,
        isValid: isValidAddress,
        touched: touchedInputAddress,
        resetInput: resetAddress
         } = useInput();

    const httpRequest = useHttpRequest()
    
    const validationFirstname =  !isValidfirstname && touchedInputFirstname  ? true : false;

    const validationLastname =  !isValidLastname && touchedInputLastname ? true : false;

    const validationAddress =  !isValidAddress && touchedInputAddress? true : false;

    const validationEmail =  !isValidEmail && touchedInputEmail? true : false;

    const disabledButton = !isValidfirstname || !isValidLastname || !isValidEmail  || !isValidAddress ? true : false;

    const onClickEventClose = props.onClickEvent;

    const cartContext = useContext(CartContext)

    const onSubmitHandler = ( event ) => {
        event.preventDefault();

        const obj = {
            name:firstnameInput,
            lastname:lastnameInput,
            email:emailInput,
            addressInput:addressInput,
            cart: {
                products: [...cartContext.products],
                total: cartContext.total,
                quantity: cartContext.quantity
            }
        }

        httpRequest.requestHttp('https://food-order-app-9adbd-default-rtdb.firebaseio.com/TB_PURCHASES.json','POST', obj , null);

        resetFirsname();
        resetLastname();
        resetEmail();
        resetAddress();
        cartContext.resetCart();
    };

    return (
        <div className={style.container}>
            <CloseButton onClickEvent={onClickEventClose} />
            <form onSubmit={onSubmitHandler}>
                <div className={style.box}>
                    <div className={style.formRow}>
                        <label className={ validationFirstname ? style.invalid : ''}>Firstname<input type={'text'}
                                                                                                    placeholder={'Example: Ryan'}
                                                                                                    onChange={firstnameOnChange}
                                                                                                    value={firstnameInput}
                                                                                                    className={ validationFirstname ? style.boxInvalid : style.boxValid}
                                                                                                    />
                                        <span className={ validationFirstname ? `${style.isVisible} ${style.invalid}` : '' }>
                                            {  validationFirstname ? 'Please enter a valid fistname.' : '' }
                                        </span>
                        </label>
                        <label className={ validationLastname ? style.invalid : '' }>Lastname<input type={'text'}
                                                                                                    placeholder={'Example: Carter'}
                                                                                                    onChange={lastnameOnChange}
                                                                                                    value={lastnameInput}
                                                                                                    className={ validationLastname ? style.boxInvalid : style.boxValid}
                                                                                                    />
                                        <span className={ validationLastname ? `${style.isVisible} ${style.invalid}` : '' }>
                                            {  validationLastname ? 'Please enter a valid lastname.' : '' }
                                        </span>
                        </label>
                    </div>
                    <label className={ validationEmail ? style.invalid : '' }>E-mail<input type={'text'}
                                                                                                    placeholder={'example@example.com'}
                                                                                                    onChange={emailOnChange}
                                                                                                    value={emailInput}
                                                                                                    className={ validationEmail? style.boxInvalid : style.boxValid}
                                                                                                    />
                                        <span className={ validationEmail ? `${style.isVisible} ${style.invalid}` : '' }>
                                            {  validationEmail ? 'Please enter a valid email.' : '' }
                                        </span>
                        </label>
                    <label className={ validationAddress ? style.invalid : '' }>Address<input type={'text'}
                                                                                                    placeholder={'Street of examples, Nº 9999'}
                                                                                                    onChange={addressOnChange}
                                                                                                    value={addressInput}
                                                                                                    className={ validationAddress ? style.boxInvalid : style.boxValid}
                                                                                                    />
                                        <span className={ validationAddress ? `${style.isVisible} ${style.invalid}` : '' }>
                                            {  validationAddress ? 'Please enter a valid address.' : '' }
                                        </span>
                        </label>
                </div>
                <div className={style.boxCartResume}>
                    <CartResume buttonName={'Buy'} 
                                            disabled={disabledButton}
                                            total={props.total}/>
                                            
                </div>
            </form>
        </div>);
};

export {  FormFinishPurchase  };