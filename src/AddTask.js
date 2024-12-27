import React, { useState } from "react";
import "./AddTask.css"; 

function AddTask() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  function handleAddTask() {
    const trimmedTask = newTask.trim();

    if (!newTask.trim()) {
      alert("Task cannot be empty!");
      return;
    }
    if (tasks.includes(trimmedTask)) {
        alert("Task already exists!");
        return;
      }
      

    if (isEditing) {
      const updatedTasks = [...tasks];
      updatedTasks[currentTaskIndex] = newTask;
      setTasks(updatedTasks);
      setIsEditing(false);
      setCurrentTaskIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }
    setNewTask("");
  }

  function handleDeleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function handleEditTask(index) {
    setNewTask(tasks[index]);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  }

  return (
    <div className="container">
      <h1 className="title">Task Manager</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter task..."
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
          className="input"
        />
        <button onClick={handleAddTask} className="button" disabled={!newTask.trim()}>
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            {task}
            <button onClick={() => handleEditTask(index)} className="edit-button">
              Modifier
            </button>
            <button onClick={() => handleDeleteTask(index)} className="delete-button">
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddTask;
