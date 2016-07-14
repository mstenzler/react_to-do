'use strict'

const express    = require('express')
const path       = require('path')
const logger     = require('morgan')
const bodyParser      = require('body-parser');
const homeRoute       = require('./routes/home');
const taskRoute       = require('./routes/tasks');

const app = express()
const PORT = process.env.PORT || process.argv[2] || 3009

//setting up directories
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

//setting up morgan and json parser middleware
app.use(logger('dev'))
//app.use( bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));

//app.use('/', homeRoute);
app.use('/tasks', taskRoute);

// app.route('/tasks/:id')
//  .get((req,res)=>res.send(`show task ${req.params.id}`))
//  .put((req,res)=>res.send(`update task ${req.params.id}`))
//  .delete((req,res)=>res.send(`deletetask ${req.params.id}`))

// app.route('/tasks')
//  .get((req,res)=>res.send(`show tasks`))
//  .post((req,res)=>res.send(`update task`))

//  app.get('/', (req,res)=> {
//   res.send('home');
//  })

//start the server
app.listen(PORT, function(){
  console.log('Server started in', __dirname)
  console.log('All systems go on', PORT)
})
