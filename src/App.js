//LIBS
import React from "react";

//COMPONENTS
import { CartProvider } from "./context/CartProvider";
import { Header } from "./layout/Header/Header";
import { Main } from "./layout/Main/Main";

//CUSTOM-HOOKS


//GLOBAL CSS
import "./layout/global.css"
import { Footer } from "./layout/Footer/Footer";

function App() {

  return (
    <CartProvider>
      <Header/>
      <Main/>
      <Footer/>
    </CartProvider>
  );
}

export default App;
