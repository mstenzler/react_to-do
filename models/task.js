'use strict'
const pg = require('pg-promise')({
// Initialization Options
});

const config = {
host:       process.env.DB_HOST,
port:       process.env.DB_PORT,
database:   process.env.DB_NAME,
user:       process.env.DB_USER,
password:   process.env.DB_PASS,
};

const _db = pg(config);

module.exports = {
  getTasks(req,res,next) {
    _db.any("SELECT * from tasks;")
      .then( tasks=>{
        res.rows=tasks;
        next();
      })
      .catch( error=>{
        console.error('Error ', error)
      })
  },

  addTask(req,res,next) {
    _db.any(
      `INSERT Into 
      tasks (task_name, task_desc)
      VALUES ($/name/, $/desc/)
      returning *;`, req.body
      )
    .then(task=>{
      console.log();
      res.rows=task;
      next();
    })
    .catch(error=>{
      console.error('ERROR in adding task', error)
    })
  },

  /* PUT /tasks/:id */
  updateTask(req,res,next) {

    req.body.tID = Number.parseInt(req.params.taskID);
    req.body.completed = !!req.body.completed;
    _db.one(`UPDATE tasks
           SET task_name=$/name/, desc=$/desc/, completed=$/completed/,
           task_time_start=$/time_start/, task_time_end=$/time_end/       
           WHERE task_id=$/tID/
           returning *;`,
          req.body)
    .then( task => {
      console.log('Update successful!');
      res.rows = task; 
      next();
    })
    .catch( error => {
      console.log('Error ',error);
    });
  },

  /* DELETE /tasks/:id */
  deleteTask(req,res,next) {
     cosnt tID = Number.parseInt(req.params.taskID);
     _db.none(`DELETE FROM tasks
          WHERE task_id = $1`, [tID])
       .then(() => {
        console.log('DELETE COMPLETED');
        next();
       })
        .catch( error => {
        console.log('Error ', error);
      });
  }

}