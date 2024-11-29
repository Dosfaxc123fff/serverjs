const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const USERS_FILE = path.join(__dirname, "users.json");
const cors = require("cors");
app.use(cors());

// Middleware для парсинга JSON
app.use(bodyParser.json());

// Маршрут для регистрации пользователя
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Введите корректные данные." });
  }

  // Читаем файл users.json
  let users = {};
  if (fs.existsSync(USERS_FILE)) {
    users = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
  }

  // Проверяем, существует ли пользователь
  if (users[email]) {
    return res.status(400).json({ message: "Пользователь с таким email уже зарегистрирован." });
  }

  // Добавляем нового пользователя
  users[email] = { email, password };

  // Сохраняем обновленный список пользователей
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.status(201).json({ message: "Пользователь успешно зарегистрирован!" });
});

// Запуск сервера
const PORT = 63342; // Повторная декларация (проблема)
; // Или любой другой порт
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
