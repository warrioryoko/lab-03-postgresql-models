const express = require('express');
const app = express();
const Planeswalker = require('./models/planeswalker');

app.use(express.json());

app.post('/api/v1/planeswakers', async(req, res, next) => {
  try {
    const createdPlaneswalker = await Planeswalker.insert(req.body);
    res.send(createdPlaneswalker);
  } catch(error) {
    next(error);
  }
});

app.delete('/api/v1/planeswalkers/:id', async(req, res, next) => {
  try {
    const deletedPlaneswalker = await Planeswalker.delete(req.params.id);
    res.send(deletedPlaneswalker);
  } catch(error) {
    next(error);
  }
});

app.get('/api/v1/planeswalkers', async(req, res, next) => {
  try {
    const fetchedPlaneswalkers = await Planeswalker.find();
    res.send(fetchedPlaneswalkers);
  } catch(error) {
    next(error);
  }
});

app.get('/api/v1/planeswalkers/:id', async(req, res, next) => {
  try {
    const fetchedPlaneswalker = await Planeswalker.findById(req.params.id);
    res.send(fetchedPlaneswalker);
  } catch(error) {
    next(error);
  }
});

app.put('/api/v1/planeswalkers/:id', async(req, res, next) => {
  try {
    const updatedPlaneswalker = await Planeswalker.update(req.params.id, req.body);
    res.send(updatedPlaneswalker);
  } catch(error) {
    next(error);
  }
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
