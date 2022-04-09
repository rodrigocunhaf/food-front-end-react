import React from "react";
import style from "./ProductDescription.module.css";

const ProductDescription = (props ) => {

    return ( 
        <div className={`${style.container} ${props.isVisible ? style.isVisible : ''}`}>
            <div className={style.box}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, in consectetur illo, maxime quasi enim aperiam laboriosam, nesciunt commodi doloremque libero consequatur assumenda? Veniam, suscipit odio atque minus temporibus ducimus.</p><br/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, in consectetur illo, maxime quasi enim aperiam laboriosam, nesciunt commodi doloremque libero consequatur assumenda? Veniam, suscipit odio atque minus temporibus ducimus.</p><br/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, in consectetur illo, maxime quasi enim aperiam laboriosam, nesciunt commodi doloremque libero consequatur assumenda? Veniam, suscipit odio atque minus temporibus ducimus.</p><br/>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, in consectetur illo, maxime quasi enim aperiam laboriosam, nesciunt commodi doloremque libero consequatur assumenda? Veniam, suscipit odio atque minus temporibus ducimus.</p><br/>
            </div>
        </div>
    );
};

export { ProductDescription };