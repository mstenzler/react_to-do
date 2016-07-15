'use strict'

const tasks = require('express').Router();
const db = require('../models/task');

//let taskData = []
const sendJSONResp = (req,res)=>res.json(res.rows);

tasks.route('/:tID')
 // .get((req,res)=>res.send(`show task ${req.params.tID}`))
 // .put((req,res)=>res.send(`update task ${req.params.id}`))
 // .delete((req,res)=>res.send(`deletetask ${req.params.id}`))
 .put(db.updateTask, sendJSONResp)
 .delete(db.deleteTask, (req,res)=>res.send(req.params.taskID))

// tasks.route('/')
//  .get((req,res)=>res.send(`show tasks`))
//  .post((req,res)=>{
//   console.log('body = ', req.body)
//   res.send(`update task. post`)
// })

tasks.route('/')
  .get(db.getTasks, sendJSONResp)
  .post(db.addTask, sendJSONResp)


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