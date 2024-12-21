import React from 'react';


function Product({productName, image, price}) {
    return(
        <div className='Product'>
            <img src={image} />
            <h1>{productName}</h1>
            <p>{`${price} руб.`}</p>
            <button>В корзину</button>
        </div>
    );
};

export default Product;