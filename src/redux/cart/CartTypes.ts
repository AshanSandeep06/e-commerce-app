export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface CartState {
    items: CartItem[];
    totalAmount: number;
}