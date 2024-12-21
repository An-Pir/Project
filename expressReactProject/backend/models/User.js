const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Определяем схему пользователя
const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  role: {
    type: String,
    required: true,
    enum: ['USER', 'ADMIN', 'MODERATOR'], // Пример возможных ролей
    default: 'USER' // Значение по умолчанию
  }
}, {
  timestamps: true // автоматически добавляет createdAt и updatedAt
});

// Хэширование пароля перед сохранением
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      next(err);
    }
  }
  next();
});

// Метод для проверки пароля
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Экспорт модели пользователя
const User = mongoose.model('User', userSchema);

module.exports = User;
