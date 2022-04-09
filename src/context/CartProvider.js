import React, { useReducer} from "react";
import { CartContext } from "./CartContext";

const defaultCart = {
    products:[],
    quantity:0,
    total:0,
};


const cartReducer = ( state , action ) => {
    let productIndex;

    switch (action.type){
        case 'ADD_PRODUCT_CART':

            productIndex = state.products.findIndex( item => item.id === action.product.id);

            if (productIndex > -1){

                let product =  { ...state.products[productIndex] };

                product.quantity += action.product.quantity;

                state.products[productIndex] = { ...product };

                state.quantity += action.product.quantity;

                state.total += action.product.quantity * action.product.price;

                return { ...state };
            }
            else { 
                let updateQuantity = state.quantity += action.product.quantity;

                state.total += action.product.quantity * action.product.price;

                state.total.toFixed(2);

                return { ...state , quantity:updateQuantity ,products: [...state.products, action.product] };
            }

        case 'REMOVE_ONE_PRODUCT_CART':
            productIndex = state.products.findIndex( item => item.id === action.id);

            let product =  { ...state.products[productIndex]};

            if ( product.quantity === 1){
                let productList = [...state.products ];

                productList.splice(productIndex, 1);

                state.products = [ ...productList ];

                state.total -= product.price;

                state.total = Math.abs(state.total);

                state.quantity -= 1;

                return  { ...state };

            } else {
                product.quantity -= 1;

                state.products[productIndex] = { ...product };

                state.total -= product.price;

                state.total = Math.abs(state.total);

                state.quantity -= 1

                return { ...state };
            };

        case 'ADD_ONE_PRODUCT_CART':

            productIndex = state.products.findIndex( item => item.id === action.id);

            let currentProduct =  { ...state.products[productIndex]};

            currentProduct.quantity += 1;

            state.products[productIndex] = { ...currentProduct };

            state.total += currentProduct.price;

            state.quantity += 1

            return { ...state };
        
        case 'RESET_CART':
            return { ...state , products:[], quantity: 0 , total: 0};
    
        default:
            return{  products:[], quantity:0, total: 0  };
    };
};


const CartProvider = ( props ) => {

    const [cart, dispatchCart ] =  useReducer( cartReducer, defaultCart );

    const addProductOnCart = ( product ) => {
        return dispatchCart({type:'ADD_PRODUCT_CART', product});
    };

    const removeOneProductCart = ( { id }) => {
        return dispatchCart({type:'REMOVE_ONE_PRODUCT_CART', id });
    };

    const addOneProductCart = ( { id }) => {
        return dispatchCart({type:'ADD_ONE_PRODUCT_CART', id });
    };
    
    const goResetCart = ( ) => {
        return dispatchCart({type:'RESET_CART'})
    };

    return (
        <CartContext.Provider value={{...cart, 
                                        addItem:addProductOnCart , 
                                        removeOneItem:removeOneProductCart,
                                        addOneItem:addOneProductCart,
                                        resetCart:goResetCart
                                    }}>{props.children
        }</CartContext.Provider>
    )
};

export { CartProvider };