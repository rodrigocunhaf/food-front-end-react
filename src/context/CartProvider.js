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
                
                let productItems = state.products;

                productItems[productIndex] = { ...product }

                return {  
                        products: [...productItems] ,  
                        quantity: state.quantity += action.product.quantity, 
                        total: state.total += ( action.product.quantity * action.product.price)  };
            }
            else {
                return {  
                         quantity:  state.quantity += action.product.quantity,
                         products: [...state.products, action.product],
                         total: state.total += ( action.product.quantity * action.product.price )
                        }        
            }

        case 'REMOVE_ONE_PRODUCT_CART':
            productIndex = state.products.findIndex( item => item.id === action.id);

            let product =  { ...state.products[productIndex]};

            if ( product.quantity === 1){
                let productList = [...state.products ];

                productList.splice(productIndex, 1);

                return  { 
                            products:[ ...productList ],
                            total: state.total -= product.price,
                            quantity: Math.abs(state.quantity -= 1)
                        };

            } else {
                product.quantity -= 1;

                let productList = [...state.products];

                productList[productIndex]  = { ...product }

                return { 
                    products: [...productList],
                    total: state.total -= product.price,
                    quantity: state.quantity -= 1
                };
            };

        case 'ADD_ONE_PRODUCT_CART':

            productIndex = state.products.findIndex( item => item.id === action.id);

            let currentProduct =  { ...state.products[productIndex]};

            currentProduct.quantity += 1;

            let productList = [...state.products];

            productList[productIndex] = { ...currentProduct };

            return { 
                products: [...productList],
                total: state.total += currentProduct.price,
                quantity:  state.quantity += 1
             };
    
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
        return dispatchCart({type:"RESET"})
    };


    console.log(cart)

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