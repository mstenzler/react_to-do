DROP TABLE if exists tasks;

create table tasks (
          task_id serial unique PRIMARY KEY,
          task_name varchar(64) NOT NULL,
          task_description text,
          completed boolean NOT NULL DEFAULT false,
          task_time_start timestamp,
          task_time_end timestamp,
          task_created timestamp NOT NULL DEFAULT now()
     );

CREATE INDEX on tasks(completed);
CREATE INDEX on tasks(task_time_start);
CREATE INDEX on tasks(task_created);
