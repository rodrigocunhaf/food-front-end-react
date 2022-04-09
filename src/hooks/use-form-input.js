import React, { useReducer } from "react";
import validator from 'validator';

const InitialState = {
    dataString: '',
    isValidString: false,
    touchedByUser: false
};

const inputReducer = ( state, action ) => {
    switch ( action.type ){
        case 'ON_CHANGE_STRING':
            let validation;

            if ( action.validationType === 'EMAIL'){
                validation = validator.isEmail(action.inputed.trim()) ? true : false
                return { ...state, dataString: action.inputed , touchedByUser:true, isValidString: validation};

            } else {
                validation = action.inputed.trim().length > 0 && action.inputed.trim().dataString !== '' ? true : false;
                return { ...state, dataString: action.inputed , touchedByUser:true, isValidString: validation};
            }
        case 'RESET':
            return { ...InitialState };
        default:
            return { ...InitialState };
    };
};

const useInput = ( validationType ) => {

    const [ dataInput , dispatchDataInput ] =  useReducer( inputReducer, InitialState );

    const onChangeHandler = ( event ) => {
        dispatchDataInput({ type: 'ON_CHANGE_STRING', inputed: event.target.value , validationType:validationType});
    };

    const resetInput = ( ) => {
        dispatchDataInput({type:'RESET'});
    };

    return  {
        inputed: dataInput.dataString,
        isValid: dataInput.isValidString,
        touched: dataInput.touchedByUser,
        onChangeHandler,
        resetInput,
    }
};

export { useInput };