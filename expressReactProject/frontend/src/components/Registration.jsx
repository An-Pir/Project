import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
    const [formData, setFormData] = useState({ login: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const base_url = 'http://localhost:5000';

        try {
            const response = await fetch(base_url + '/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.is_error === false && data.message === 'User Created') {
                setMessage('Registration successful! Redirecting to login...');
                setVariant('success');
                setShow(true);

                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setMessage(data.message || 'Registration failed');
                setVariant('error');
                setShow(true);
            }

            setFormData({ login: '', email: '', password: '' });

            setTimeout(() => {
                setShow(false);
            }, 3000);
        } catch (error) {
            console.error('Registration failed', error);
            setMessage('Registration failed');
            setVariant('error');
            setShow(true);

            setTimeout(() => {
                setShow(false);
            }, 3000);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Регистрация</h1>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Логин"
                        value={formData.login}
                        onChange={(e) => setFormData({ ...formData, login: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <input
                        type="email"
                        placeholder="Эл.почта"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg mt-6 hover:bg-indigo-600 transition"
                    >
                        Зарегистрироваться
                    </button>
                </form>
                {show && (
                    <div
                        className={`mt-4 text-center ${
                            variant === 'success' ? 'text-green-500' : 'text-red-500'
                        }`}
                    >
                        {message}
                    </div>
                )}
                <p className="text-center text-indigo-500 hover:underline mt-4">
                    Уже есть аккаунт?{' '}
                    <Link
                        to="/login"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        className="text-indigo-500 hover:underline"
                    >
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Registration;
