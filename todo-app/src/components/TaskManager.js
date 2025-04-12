import { createContext, useContext, useEffect, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

// Contexts for handling delete and edit actions
export const DeleteHandlerContext = createContext();
export const EditHandlerContext = createContext();

// API base URL
const API_BASE = "http://localhost:5000/api/tasks";

// Main Task Manager Component
const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editedText, setEditedText] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null); // Track which task is being edited

  const fetchTasks = async (token) => {
    try {
      const res = await fetch(API_BASE, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data.map(({ id, title, description = "" }) => ({ id, text: title, description })));
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    fetch(`${API_BASE}/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEdit = (id, text, description) => {
    setEditingTaskId(id);
    setEditedText(text);
    setEditedDescription(description);
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const payload = { title: editedText, description: editedDescription };

    await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    setTasks((prev) => prev.map((task) =>
      task.id === id ? { ...task, text: editedText, description: editedDescription } : task
    ));
    setEditingTaskId(null); // Reset the editing state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in to add tasks.");

    const res = await fetch(`${API_BASE}/add`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-type": "application/json" },
      body: JSON.stringify({ title: editedText, description: editedDescription }),
    });

    if (!res.ok) return alert("Failed to add task");

    const data = await res.json();
    setTasks([...tasks, { id: data.id, text: editedText, description: editedDescription }]);
    setEditedText("");
    setEditedDescription("");
  };

  // Fetch tasks when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    } else {
      fetchTasks(token);
    }
  }, []);

  return (
    <DeleteHandlerContext.Provider value={handleDelete}>
      <EditHandlerContext.Provider value={handleEdit}>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-violet-900 to-purple-800 text-white">
          <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-10 px-5">
            <header className="text-center text-4xl font-bold text-indigo-100">Task Tracker</header>
            {/* Show this form only if no task is being edited */}
            {editingTaskId === null && (
              <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-10 w-full flex flex-col gap-5 justify-center items-center md:flex-row md:justify-between rounded-xl shadow-xl">
                <div className="flex flex-col gap-2 w-full md:w-2/3">
                  <input value={editedText} onChange={(e) => setEditedText(e.target.value)} required placeholder="Title (required)" className="bg-transparent text-white border-b-2 border-white/40 py-2 px-5 focus:border-violet-400 duration-300" />
                  <input value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} placeholder="Description (optional)" className="bg-transparent text-white border-b-2 border-white/40 py-2 px-5 focus:border-violet-400 duration-300" />
                </div>
                <button type="submit" className="bg-indigo-800 hover:bg-indigo-600 text-white font-semibold py-4 px-6 rounded transition duration-300">
                  Add task
                </button>
              </form>
            )}
            <div className="flex flex-col gap-3 w-full">
              {loading ? (
                <p className="text-center text-white">{error || "Loading..."}</p>
              ) : tasks.length === 0 ? (
                <p className="text-center text-white">No task to show</p>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className="task-item flex justify-between items-center bg-gradient-to-r from-indigo-900 via-violet-900 to-purple-800 p-5 rounded-2xl hover:from-violet-800 hover:to-indigo-800 group shadow-md">
                    <div className="flex gap-3 w-full">
                      <input type="checkbox" className="accent-violet-400 cursor-pointer self-start mt-1" checked={task.isChecked} onChange={() => setTasks((prev) => prev.map(t => t.id === task.id ? { ...t, isChecked: !t.isChecked } : t))} />
                      {task.id === editingTaskId ? (
                        <form onSubmit={(e) => handleEditSubmit(e, task.id)} className="flex flex-col w-full">
                          <input className="bg-transparent outline-none border-b-2 border-white/40 pb-1 w-full focus:border-violet-500 text-white" type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} required />
                          <textarea className="bg-transparent outline-none border-b-2 border-white/40 pb-1 w-full focus:border-violet-500 mt-2 text-white" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} placeholder="Description" />
                        </form>
                      ) : (
                        <div className="w-full">
                          <p className={`group-hover:text-violet-400 ${task.isChecked ? "line-through text-gray-500 group-hover:text-violet-600" : ""}`}>{task.text}</p>
                          {task.description && <p className="text-sm text-white">{task.description}</p>}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      {task.id === editingTaskId ? (
                        <button onClick={(e) => handleEditSubmit(e, task.id)} className="text-violet-400">Save</button>
                      ) : (
                        <button className="text-violet-400 hover:text-violet-600 duration-300" onClick={() => handleEdit(task.id, task.text, task.description)}><FiEdit /></button>
                      )}
                      <button onClick={() => handleDelete(task.id)} className="text-red-400 hover:text-red-600 duration-300"><FiTrash /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <footer className="text-center pt-10 text-sm text-white">&copy; {new Date().getFullYear()} Task Manager App by Shreya Maharjan</footer>
          </div>
        </div>
      </EditHandlerContext.Provider>
    </DeleteHandlerContext.Provider>
  );
};

export default TaskManager;
