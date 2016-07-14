'use strict'

const router = require('express').Router();

router.get('/', function(req,res) {
  res.send('List tasks');
});

router.post('/', function(req,res) {
  res.send('create tasks');
});

router.get('/:id/edit', function(req,res) {
  res.send('view edit task form');
});

router.get('/:id', function(req,res) {
  res.send('view task');
});

router.post('/:id', function(req,res) {
  res.send('update task');
});

router.delete('/:id', function(req,res) {
  res.send('delete task');
});


module.exports = router;