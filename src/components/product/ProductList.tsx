import React from 'react';
import ProductCard from './ProductCard';
import products from "../../data/Products";
import {addItemToCart} from "../../redux/cart/CartSlice";
import {useDispatch} from "react-redux";

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
}

interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({products}) => {
    const dispatch = useDispatch();

    const handleAddToCart = (productId: number) => {
        const product = products.find((prod) => prod.id === productId);
        if (product) {
            dispatch(addItemToCart({...product, quantity: 1}));
        }
    };

    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart}/>
            ))}
        </div>
    );
};

export default ProductList;