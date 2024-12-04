import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart, updateItemQuantity } from '../redux/cart/CartSlice';
import { RootState } from '../redux/Store';

const CartPage: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const handleRemove = (id: number) => {
        dispatch(removeItemFromCart(id));
    };

    const handleQuantityChange = (id: number, quantity: number) => {
        dispatch(updateItemQuantity({ id, quantity }));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                cartItems.map((item) => (
                    <div key={item.id}>
                        <h3>{item.name}</h3>
                        <p>${item.price}</p>
                        <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        />
                        <button onClick={() => handleRemove(item.id)}>Remove</button>
                    </div>
                ))
            )}
            <h3>Total: ${calculateTotal()}</h3>
        </div>
    );
};

export default CartPage;