import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const NewProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null); // Для хранения файла
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Uncategorized');
    const [stock, setStock] = useState(0);

    const token = localStorage.getItem('access_token');

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('price', price);
        formData.append('image', image); // Добавляем файл изображения
        formData.append('description', description);
        formData.append('category', category);
        formData.append('stock', stock);

        try {
            const response = await fetch('http://localhost:5000/api/products/add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Product added successfully:', result);
                alert('Товар добавлен успешно!');
                navigate('/');
            } else {
                const errorResult = await response.json();
                console.error('Failed to add product:', errorResult.message);
                alert('Ошибка при добавлении товара: ' + errorResult.message);
            }
        } catch (error) {
            console.error('Error:', error.message);
            alert('Не удалось добавить товар. Попробуйте позже.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Добавить новый товар</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Название товара</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Введите название товара"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Цена</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Введите цену товара"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Изображение</label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])} // Установка выбранного файла
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Описание</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Введите описание товара"
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Категория</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="Uncategorized">Без категории</option>
                        <option value="Electronics">Электроника</option>
                        <option value="Clothing">Одежда</option>
                        <option value="Food">Еда</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Количество на складе</label>
                    <input
                        type="number"
                        id="stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Введите количество товара"
                        required
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Добавить товар
                    </button>
                    <button
                        type="button"
                        onClick={handleBack}
                        className="w-full bg-red-600 mt-2 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 transition"
                    >
                        Назад
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewProduct;
