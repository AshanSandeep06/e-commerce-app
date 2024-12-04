import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {removeItemFromCart, updateItemQuantity} from '../../redux/cart/CartSlice';
import {RootState} from '../../redux/Store';

const Cart: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
    const dispatch = useDispatch();

    const handleRemoveItem = (id: number) => {
        dispatch(removeItemFromCart(id));
    };

    const handleUpdateQuantity = (id: number, quantity: number) => {
        dispatch(updateItemQuantity({id, quantity}));
    };

    return (
        <div>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                cartItems.map((item) => (
                    <div key={item.id}>
                        <h3>{item.name}</h3>
                        <p>${item.price}</p>
                        <p>Quantity:
                            <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                            {item.quantity}
                            <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                        </p>
                        <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                    </div>
                ))
            )}
            <h2>Total: ${totalAmount}</h2>
        </div>
    );
};

export default Cart;