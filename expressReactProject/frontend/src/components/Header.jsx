import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../utils/auth';

const Header = () => {
    const role = localStorage.getItem('role'); // Получение роли из localStorage
    const token = localStorage.getItem('access_token'); // Получение токена из localStorage (предположим, что токен хранится в localStorage)
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        removeToken()
        navigate('/');
        window.location.reload();
    }

    return (
        <header className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Левая часть с кнопкой "Главная" */}
                <div>
                    <Link
                        to="/"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        className="text-lg font-semibold hover:text-gray-300 transition duration-200"
                    >
                        Главная
                    </Link>
                </div>

                {/* Правая часть с кнопками */}
                <div className="flex space-x-6">
                    {token ? (
                        <>
                            {role === "ADMIN" && ( // Если роль ADMIN, отображаем кнопку Users
                                <Link
                                    to="/products/new"
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                    className="hover:bg-gray-700 px-4 py-2 rounded-md transition duration-200"
                                >
                                    Добавить товар
                                </Link>
                            )}
                            <Link
                                    to="/profile"
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                    className="hover:bg-gray-700 px-4 py-2 rounded-md transition duration-200"
                                >
                                    Личный кабинет
                            </Link>
                            <Link
                                to="/cart"
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                className="hover:bg-gray-700 px-4 py-2 rounded-md transition duration-200"
                            >
                                Корзина
                            </Link>
                            <button
                                type="button"
                                onClick={handleLogout}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                className="hover:bg-gray-700 px-4 py-2 rounded-md transition duration-200"
                            >
                                Выйти
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/register"
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                className="hover:bg-gray-700 px-4 py-2 rounded-md transition duration-200"
                            >
                                Регистрация
                            </Link>
                            <Link
                                to="/login"
                                style={{ textDecoration: 'none', color: 'inherit' }}
                                className="hover:bg-gray-700 px-4 py-2 rounded-md transition duration-200"
                            >
                                Войти
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
