const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Маршрут для чтения тегов
app.get('/tags', (req, res) => {
  fs.readFile(path.join(__dirname, 'data/tags.json'), 'utf8', (err, data) => {
    if (err) {
      console.error("Ошибка чтения файла", err);
      res.status(500).send('Ошибка чтения файла');
      return;
    }

    res.send(JSON.parse(data));
  });
});

// Маршрут для добавления тега
app.post('/tags', (req, res) => {
  const newTag = req.body;

  fs.readFile(path.join(__dirname, 'data/tags.json'), 'utf8', (err, data) => {
    if (err) {
      console.error("Ошибка чтения файла", err);
      res.status(500).send('Ошибка чтения файла');
      return;
    }

    const tags = JSON.parse(data);
    tags.push(newTag);

    fs.writeFile(path.join(__dirname, 'data/tags.json'), JSON.stringify(tags, null, 2), (err) => {
      if (err) {
        console.error("Ошибка записи в файл", err);
        res.status(500).send('Ошибка записи в файл');
        return;
      }

      res.send(newTag);
    });
  });
});

app.listen(3001, () => console.log('Сервер запущен на порту 3001'));
