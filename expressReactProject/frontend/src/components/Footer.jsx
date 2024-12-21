import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto text-center space-y-4">
                <p className="text-sm">&copy; 2024 Анатолий Пироженко. Все права защищены.</p>
                <nav className="flex justify-center space-x-6">
                    <a
                        href="/privacy-policy"
                        className="text-sm text-gray-300 hover:text-white transition"
                    >
                        Политика конфиденциальности
                    </a>
                    <a
                        href="/terms-of-service"
                        className="text-sm text-gray-300 hover:text-white transition"
                    >
                        Условия использования
                    </a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
