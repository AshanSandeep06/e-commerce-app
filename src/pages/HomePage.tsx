import React from 'react';
import {useDispatch} from 'react-redux';
import {addItemToCart} from '../redux/cart/CartSlice';
import ProductCard from '../components/product/ProductCard';
import products from "../data/Products";

const HomePage: React.FC = () => {
    const dispatch = useDispatch();

    const handleAddToCart = (productId: number) => {
        const product = products.find((prod) => prod.id === productId);
        if (product) {
            dispatch(addItemToCart({...product, quantity: 1}));
        }
    };

    return (
        <div>
            <h1>Product List</h1>
            <div>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart}/>
                ))}
            </div>
        </div>
    );
};

export default HomePage;