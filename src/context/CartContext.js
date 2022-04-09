import React from "react";

const CartContext = React.createContext({
    products:[],
    quantity:0,
    total:0,
    addItem: ( ) => {},
    removeOneItem: ( ) => {},
    addOneItem: ( )=>{},
    resetCart:()=>{}
});

export { CartContext };