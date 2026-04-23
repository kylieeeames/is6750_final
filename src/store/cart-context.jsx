import { createContext, useEffect, useState } from 'react';

const CartContext = createContext({
    items: [],
    numItems: 0,
    subtotal: 0,
    shipping: 0,
    total: 0,
    addItem: (item) => {},
    removeItem: (itemId) => {},
    updateItemQuantity: (itemId, newQuantity) => {},
    resetCart: () => {}
});

export const CartContextProvider = (props) => {

    const [items, setItems] = useState(() => {
        const storedItems = sessionStorage.getItem('cartItems');
        if (storedItems !== null) {
            return JSON.parse(storedItems);
        }
        return [];
    });

    useEffect(() => {
        const handleCartStorageChange = () => {
            const storedItems = sessionStorage.getItem('cartItems');
            if (storedItems !== null) {
                setItems(JSON.parse(storedItems));
            } else {
                setItems([]);
            }
        };

        window.addEventListener('cartstoragechange', handleCartStorageChange);

        return () => {
            window.removeEventListener('cartstoragechange', handleCartStorageChange);
        };
    }, []);

    const saveItems = (updatedItems) => {
        setItems(updatedItems);
        sessionStorage.setItem('cartItems', JSON.stringify(updatedItems));
    };

    const addItem = (item) => {
        const updatedItems = [...items];
        const existingItemIndex = updatedItems.findIndex(existingItem => existingItem.id === item.id);

        if (existingItemIndex === -1) {
            updatedItems.push({
                id: item.id,
                title: item.title,
                price: item.price,
                thumbnail: item.thumbnail,
                quantity: item.quantity
            });
        } else {
            updatedItems[existingItemIndex].quantity += item.quantity;
        }

        saveItems(updatedItems);
    };

    const removeItem = (itemId) => {
        const updatedItems = items.filter(item => item.id !== itemId);
        saveItems(updatedItems);
    };

    const updateItemQuantity = (itemId, newQuantity) => {
        const updatedItems = items.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        saveItems(updatedItems);
    };

    const resetCart = () => {
        setItems([]);
        sessionStorage.removeItem('cartItems');
        window.dispatchEvent(new Event('cartstoragechange'));
    };

    const numItems = items.length;
    const subtotal = items.reduce((totalAmount, item) => totalAmount + (item.price * item.quantity), 0);
    const shipping = subtotal * 0.1;
    const total = subtotal + shipping;

    return (
        <CartContext.Provider value={{
            items,
            numItems,
            subtotal,
            shipping,
            total,
            addItem,
            removeItem,
            updateItemQuantity,
            resetCart
        }}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContext;
