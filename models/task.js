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
        throw error;
      })
  },

  addTask(req,res,next) {
    _db.any(
      `INSERT Into 
      tasks (task_name, task_description)
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
      throw error;
    })
  },

  /* PUT /tasks/:id */
  updateTask(req,res,next) {

    console.log('completed = ', req.body.completed);
    req.body.tID = Number.parseInt(req.params.tID);
    req.body.completed = req.body.completed === 'false' ? false : !!req.body.completed;
    console.log('completed = ', req.body.completed);
   // console.log(req.body)
    let names = ['task_name', 'task_description', 'completed', 'task_time_start', 'task_time_end'];
    let updateString = '';

    names.forEach(function(name) {
      if (name in req.body) {
        if (updateString) updateString += ", ";
        updateString += `${name}=$/${name}/`;
      }
    })
    if (!updateString) {
      let error = 'Did not pass in any valid fields to update'
      console.log(error);
      throw error;
    }
    console.log('updateString = ', updateString);
    _db.one(`UPDATE tasks
           SET ${updateString}    
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
      throw error;
    });
  },

  /* DELETE /tasks/:id */
  deleteTask(req,res,next) {
     const tID = Number.parseInt(req.params.tID);
     _db.none(`DELETE FROM tasks
          WHERE task_id = $1`, [tID])
       .then(() => {
        console.log('DELETE COMPLETED');
        next();
       })
        .catch( error => {
        console.log('Error ', error);
        throw error;
      });
  }

}