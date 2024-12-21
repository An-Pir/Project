const mongoose = require('mongoose');
const User = require('./models/User'); // Путь к вашей модели пользователя
const bcrypt = require('bcryptjs');

// Соединение с базой данных
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Error connecting to MongoDB:', err));

// Функция для добавления тестового пользователя
const seed = async () => {
  try {
    // Проверка, если пользователь с таким login/email уже существует
    const existingUser = await User.findOne({ login: 'admin' });
    if (existingUser) {
      console.log('Admin user already exists');
      return;
    }

    // Создание нового пользователя
    const adminUser = new User({
      login: 'admin',
      email: 'admin@admin.ru',
      password: 'admin',
      role: 'ADMIN'
    });

    // Сохранение пользователя в базе данных
    await adminUser.save();
    console.log('Admin user created successfully');
    
    // Закрытие соединения с базой данных
    mongoose.connection.close();
  } catch (error) {
    console.error('Error during seeding:', error);
    mongoose.connection.close();
  }
};

// Запуск функции seed
seed();
