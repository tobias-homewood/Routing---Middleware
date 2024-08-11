// ROUTES
// Get /items
// Post /items
// Get /items/:name
// Patch /items/:name
// Delete /items/:name
import express from 'express';
import items from '../data/fakeDB.js';

const shoppingRouter = express.Router();

// Get /items
shoppingRouter.get('/', (req, res) => {
  res.json(items);
});

// Post /items
shoppingRouter.post('/', (req, res) => {
  items.push(req.body);
  res.status(201).json({ added: req.body });
});

// Get /items/:name
shoppingRouter.get('/:name', (req, res) => {
  const item = items.find(item => item.name === req.params.name);
  if (item === undefined) {
    res.sendStatus(404);
  }
  res.json(item);
});

// Patch /items/:name
shoppingRouter.patch('/:name', (req, res) => {
  const item = items.find(item => item.name === req.params.name);
  if (item === undefined) {
    res.sendStatus(404);
  }
  item.name = req.body.name;
  item.price = req.body.price;
  res.json({ updated: item });
});

// Delete /items/:name
shoppingRouter.delete('/:name', (req, res) => {
  const itemIndex = items.findIndex(item => item.name === req.params.name);
  if (itemIndex === -1) {
    res.sendStatus(404);
  }
  items.splice(itemIndex, 1);
  res.json({ message: 'Deleted' });
});

export default shoppingRouter;