const mongoose = require('mongoose');

// Определяем схему продукта
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true, // Убирает лишние пробелы в начале и конце строки
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Цена не может быть отрицательной
  },
  image: {
    type: String,
    default: '', // Если изображения нет, можно использовать пустую строку
  },
  description: {
    type: String,
    default: '',
    trim: true, // Убирает лишние пробелы в начале и конце строки
  },
  category: {
    type: String,
    default: 'Uncategorized', // Категория по умолчанию
  },
  stock: {
    type: Number,
    default: 0, // Количество товара на складе
    min: 0, // Количество не может быть отрицательным
  },
  createdAt: {
    type: Date,
    default: Date.now, // Автоматически устанавливает текущее время при создании
  },
}, {
  timestamps: true, // Добавляет поля createdAt и updatedAt
});

// Экспорт модели продукта
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
