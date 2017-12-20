'use strict';
module.exports = function(app) {
  var todoController = require('../controllers/todoController');

  // todo routes
  app.route('/tasks')
    .get(todoController.list_all_tasks)
    .post(todoController.create_a_task);

  app.route('/tasks/:taskId')
    .get(todoController.read_a_task)
    .put(todoController.update_a_task)
    .delete(todoController.delete_a_task);
};
