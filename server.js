const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid');

//mideelware
const app = express();
app.use(bodyParser.json());
app.use(cors());

//Create an array to store the notes:

let notes = [];

//Define routes for CRUD functionality

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const newNote = {
    id: uuid.v4(),
    title: req.body.title,
    content: req.body.content
  };
  
  notes.push(newNote);
  res.json(newNote);
});

app.put('/notes/:id', (req, res) => {
  const foundNote = notes.find(note => note.id === req.params.id);
  
  if (foundNote) {
    foundNote.title = req.body.title;
    foundNote.content = req.body.content;
    res.json(foundNote);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

app.delete('/notes/:id', (req, res) => {
  notes = notes.filter(note => note.id !== req.params.id);
  res.json({ message: 'Note deleted' });
});


//Start the server

const port = 5002;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



