'use strict'

const tasks = require('express').Router();

let taskData = []

tasks.route('/:id')
 .get((req,res)=>res.send(`show task ${req.params.id}`))
 .put((req,res)=>res.send(`update task ${req.params.id}`))
 .delete((req,res)=>res.send(`deletetask ${req.params.id}`))

tasks.route('/')
 .get((req,res)=>res.send(`show tasks`))
 .post((req,res)=>{
  console.log('body = ', req.body)
  res.send(`update task. post`)
})




// router.get('/', function(req,res) {
//   res.json(taskData)
//   //res.send('List tasks');
// });

// router.post('/', function(req,res) {
//   let data = req.body.item;
//   console.log('body = ', req.body)
//   console.log('data = ', data)
//   if (data) {
//     taskData.push(data);
//   }
//   res.send("pushed item")
//   //res.json({'createed task'});
// });

// router.get('/:id/edit', function(req,res) {
//   res.send('view edit task form');
// });

// router.get('/:id', function(req,res) {
//   res.send('view task');
// });

// router.post('/:id', function(req,res) {
//   res.send('update task');
// });

// router.delete('/:id', function(req,res) {
//   res.send('delete task');
// });


module.exports = tasks;