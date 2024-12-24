import React, { useState, useEffect } from 'react';
import Product from './Product';
import Footer from './Footer';


function Main() {
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('')
    const [variant, setVariant] = useState('success')
    const [show, setShow] = useState(false)
    const api = "http://localhost:5000/api";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${api}/products`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );

                const data = await response.json();

                setProducts(data.data);
            } catch (error) {
                console.error('Failed to fetch products', error);
                setMessage('Failed to fetch products');
                setVariant('error');
                setShow(true);
            }
        }

        // Вызов метода
        fetchProducts();
    }, []);

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <main className="flex-grow p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {products.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white p-4 rounded-lg shadow-lg flex flex-col"
                            >
                                <img
                                    src={`http://localhost:5000${item.image}`}
                                    alt={item.productName}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <h3 className="mt-4 text-lg font-semibold text-gray-800">
                                    {item.productName}
                                </h3>
                                <p className="mt-4 text-sm font-regular text-gray-400">
                                    {item.description}
                                </p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-2xl text-red-900">{item.price} руб.</span>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                        В корзину
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}

export default Main;
