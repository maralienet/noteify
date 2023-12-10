const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

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


app.get('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, 'data/notes.json'), 'utf8', (err, data) => {
    if (err) {
      console.error("Ошибка чтения файла", err);
      res.status(500).send('Ошибка чтения файла');
      return;
    }

    res.send(JSON.parse(data));
  });
});

app.get('/notes/:note', (req, res) => {
  fs.readFile(path.join(__dirname, 'data/notes.json'), 'utf8', (err, data) => {
    if (err) {
      console.error("Ошибка чтения файла", err);
      res.status(500).send('Ошибка чтения файла');
      return;
    }
    let notes = JSON.parse(data);
    let noteId = req.params.note;
    let note = notes.find(n => n.id == noteId);
    res.send(note);
  });
});

app.delete('/notes/:noteId', (req, res) => {
  fs.readFile(path.join(__dirname, 'data/notes.json'), 'utf8', (err, data) => {
    if (err) {
      console.error("Ошибка чтения файла", err);
      res.status(500).send('Ошибка чтения файла');
      return;
    }
    let notes = JSON.parse(data);
    let noteId = req.params.noteId;
    let noteIndex = notes.findIndex(n => n.id == noteId);
    if (noteIndex === -1) {
      res.status(404).send('Заметка не найдена');
      return;
    }
    notes.splice(noteIndex, 1);
    fs.writeFile(path.join(__dirname, 'data/notes.json'), JSON.stringify(notes), 'utf8', (err) => {
      if (err) {
        console.error("Ошибка записи в файл", err);
        res.status(500).send('Ошибка записи в файл');
        return;
      }
      res.send(`Заметка с id ${noteId} успешно удалена`);
    });
  });
});

app.put('/notes/:noteId', (req, res) => {
  fs.readFile(path.join(__dirname, 'data/notes.json'), 'utf8', (err, data) => {
    if (err) {
      console.error("Ошибка чтения файла", err);
      res.status(500).send('Ошибка чтения файла');
      return;
    }
    let notes = JSON.parse(data);
    let noteId = req.params.noteId;
    let noteIndex = notes.findIndex(n => n.id == noteId);
    if (noteIndex === -1) {
      res.status(404).send('Заметка не найдена');
      return;
    }
    notes[noteIndex] = { ...notes[noteIndex], ...req.body };
    fs.writeFile(path.join(__dirname, 'data/notes.json'), JSON.stringify(notes), 'utf8', (err) => {
      if (err) {
        console.error("Ошибка записи в файл", err);
        res.status(500).send('Ошибка записи в файл');
        return;
      }
      res.send(`Заметка с id ${noteId} успешно обновлена`);
    });
  });
});


app.post('/notes', (req, res) => {
  const newTag = req.body;

  fs.readFile(path.join(__dirname, 'data/notes.json'), 'utf8', (err, data) => {
    if (err) {
      console.error("Ошибка чтения файла", err);
      res.status(500).send('Ошибка чтения файла');
      return;
    }

    const tags = JSON.parse(data);
    tags.push(newTag);

    fs.writeFile(path.join(__dirname, 'data/notes.json'), JSON.stringify(tags, null, 2), (err) => {
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
