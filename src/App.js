import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("Work");
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const savedTheme = localStorage.getItem("theme") || "dark";

    setTasks(savedTasks);
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { text: input, category }]);
    setInput("");
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText) {
      const updated = [...tasks];
      updated[index].text = newText;
      setTasks(updated);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={theme === "dark" ? "app dark" : "app light"}>
      <div className="container">
        <button onClick={toggleTheme}>Toggle Theme</button>
        <h1>Smart Todo (React)</h1>

        <div className="input-section">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter task..."
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Work</option>
            <option>Study</option>
            <option>Personal</option>
          </select>

          <button onClick={addTask}>Add</button>
        </div>

        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <span>{task.text} ({task.category})</span>
              <div>
                <button onClick={() => editTask(index)}>Edit</button>
                <button onClick={() => deleteTask(index)}>X</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;