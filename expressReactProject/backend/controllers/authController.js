require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const messageFunction = require('../utils/messageFunction');

// @desc     Register user
// @access   Public
const register = async (req, res) => {
    const { email, login, password } = req.body;

    try {
        // Проверка существующего пользователя по логину или email
        const existingUser = await User.findOne({ $or: [{ login }, { email }] });

        if (existingUser) {
            return res
                .status(403)
                .json(messageFunction(true, 'Login or Email Already Exists'));
        }

        // Создание пользователя
        const user = new User({
            login,
            password: password,
            email,
        });

        await user.save();

        return res
            .status(201)
            .json(
                messageFunction(false, 'User Created', {
                    user: { id: user._id, login: user.login, email: user.email }
                })
            );
    } catch (error) {
        console.error(error.message);
        return res
            .status(500)
            .json(messageFunction(true, 'Failed to Register User'));
    }
};

// @desc     Register user
// @access   Public
const login = async (req, res) => {
    const { login, password } = req.body;

    try {
        // Проверка существующего пользователя по логину или email
        const user = await User.findOne({ $or: [{ login }] });

        if (!user) {
            return res
                .status(401)
                .json(messageFunction(true, 'Invalid credentials'));
        }

        // Сравнение пароля с хэшированным значением
        const isMatch = await user.comparePassword(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json(messageFunction(true, 'Invalid credentials'));
        }

        // Создание полезной нагрузки для JWT
        const payload = {
            id: user._id,
            login: user.login,
            role: user.role
        };

        // Генерация JWT
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '3h' }, // Для 3 часов
            (error, token) => {
                if (error) {
                    return res.status(401).json(messageFunction(true, 'Unauthorized'));
                }

                // Отправка ответа с токеном
                return res.status(200).json(
                    messageFunction(false, "You've Logged in.", {
                        _id: payload.id,
                        login: payload.login,
                        token,
                        role: payload.role
                    })
                );
            }
        );
    } catch (error) {
        console.error(error.message);
        return res.status(500).json(messageFunction(true, 'Failed to Login User'));
    }
};

module.exports = { register, login };
