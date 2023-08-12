const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// Routes---------------------------

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => res.json(notes));

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = Date.now();
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(newNote);
});

// Start the server--------------------------------------------

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
