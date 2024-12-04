import React from 'react';
import {Product} from '../../redux/cart/CartTypes';

interface ProductCardProps {
    product: Product;
    onAddToCart: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({product, onAddToCart}) => {
    return (
        <div>
            <img src={product.image} alt={product.name}/>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;