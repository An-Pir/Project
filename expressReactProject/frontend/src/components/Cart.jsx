import React, { useState } from 'react';

const Cart = () => {
    // Пример данных для корзины
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Товар 1', price: 100, quantity: 2 },
        { id: 2, name: 'Товар 2', price: 200, quantity: 1 },
        { id: 3, name: 'Товар 3', price: 150, quantity: 3 },
    ]);

    // Вычисление общей стоимости товаров
    const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Корзина</h1>
            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
                    >
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                {item.name}
                            </h2>
                            <p className="text-sm text-gray-600">
                                Цена: ${item.price.toFixed(2)}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-800">
                                Количество: {item.quantity}
                            </span>
                            <span className="text-gray-900 font-bold">
                                ${item.price * item.quantity}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
                <div className="text-lg font-bold text-gray-800">
                    Общая сумма: ${totalAmount.toFixed(2)}
                </div>
                <button
                    className="mt-4 sm:mt-0 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Оформить заказ
                </button>
            </div>
        </div>
    );
};

export default Cart;
