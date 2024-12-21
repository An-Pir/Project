import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const [formData, setFormData] = useState({ login: "", password: "" });
    const [message, setMessage] = useState("");
    const [variant, setVariant] = useState(""); // 'success' or 'error'
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const api = "http://localhost:5000/api/auth/login";

        try {
            const response = await fetch(api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.data.token) {
                localStorage.setItem("access_token", result.data.token);
                localStorage.setItem("role", result.data.role);
                setMessage("Login successful!");
                setVariant("success");
                setShow(true);

                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setMessage(result.message || "Failed to log in");
                setVariant("error");
                setShow(true);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setMessage("An error occurred during login.");
            setVariant("error");
            setShow(true);
        }

        setTimeout(() => {
            setShow(false);
        }, 3000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Вход</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="login" className="block text-gray-700 font-medium mb-2">
                            Логин
                        </label>
                        <input
                            id="login"
                            name="login"
                            type="text"
                            value={formData.login}
                            onChange={handleInputChange}
                            placeholder="Введите логин"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Пароль
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Введите пароль"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg mt-6 hover:bg-indigo-700 transition"
                    >
                        Войти
                    </button>
                </form>
                
                {/* Message display */}
                {show && (
                    <div
                        className={`mt-4 text-center ${
                            variant === "success" ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {message}
                    </div>
                )}

                <p className="text-center text-indigo-500 hover:underline mt-4">
                    Нет аккаунта?{" "}
                    <Link
                        to="/register"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        className="text-indigo-500 hover:underline"
                    >
                        Зарегистрироваться
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
