const e = require('cors');
const Task = require('../models/Task');



exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, UserId: req.userId });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear tarea' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll(
      // { where: { UserId: req.userId } }
    );
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener tarea' });
  }
}

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    await task.update(req.body);
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar tarea' });
  } 
}

 exports.deleteTask = async (req, res) => {
    try {
      const task = await Task.findByPk(req.params.id);
      if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
      await task.destroy();
      res.json({ message: 'Tarea eliminada' });
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar tarea' });
    }
  }