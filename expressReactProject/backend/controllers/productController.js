require('dotenv').config();
const Product = require('../models/Product'); // Импорт модели Product
const messageFunction = require('../utils/messageFunction'); // Сообщения для ответа
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Указываем папку для хранения
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Уникальное имя файла
    },
});

// @desc     Get all products
// @access   Public
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        return res.status(200).json({
            success: true,
            message: 'Products retrieved successfully',
            data: products,
        });
    } catch (error) {
        // Обработка ошибок
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve products',
        });
    }
};


const upload = multer({ storage });

// @desc     Add a new product
// @access   Private (можно ограничить доступ по роли, если нужно)
const addNewProduct = async (req, res) => {
    try {
        const { productName, price, description, category, stock } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : ''; // Путь к изображению

        const newProduct = new Product({
            productName,
            price,
            image,
            description,
            category,
            stock,
        });

        await newProduct.save();

        return res.status(201).json({
            success: true,
            message: 'Product added successfully',
            data: newProduct,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to add product',
        });
    }
};

module.exports = { getAllProducts, addNewProduct, upload };
