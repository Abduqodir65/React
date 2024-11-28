import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [editId, setEditId] = useState();
  const [editTodoText, setEditTodoText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!todoText.trim()) {
      toast.warn("Todo text cannot be empty!", { position: "top-center" });
      return;
    }
    const updatedTodos = [...todos, { id: Date.now(), text: todoText }];
    setTodos(updatedTodos);
    setTodoText("");
    toast.success("Todo added successfully!", { position: "top-center" });
  }

  function deleteTodo(todoId) {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
    toast.error("Todo deleted!", { position: "top-center" });
  }

  function editTodo(todoId, text) {
    if (!text.trim()) {
      toast.warn("Edited text cannot be empty!", { position: "top-center" });
      return;
    }
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, text } : todo
    );
    setTodos(updatedTodos);
    setEditTodoText("");
    setEditId(null);
    toast.info("Todo edited successfully!", { position: "top-center" });
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-8">
      <div className="max-w-lg mx-auto bg-white text-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>
        <form onSubmit={handleSubmit} className="flex mb-4">
          <input
            type="text"
            value={todoText}
            onChange={(event) => setTodoText(event.target.value)}
            placeholder="Enter your todo"
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg"
          >
            Add
          </button>
        </form>
        <ul className="space-y-2">
          {todos.map((todo) =>
            todo.id === editId ? (
              <li key={todo.id} className="flex space-x-2">
                <input
                  type="text"
                  value={editTodoText}
                  onChange={(event) => setEditTodoText(event.target.value)}
                  className="flex-grow p-2 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={() => editTodo(editId, editTodoText)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </li>
            ) : (
              <li
                key={todo.id}
                className="flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2"
              >
                <span className="font-medium">{todo.text}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      setEditId(todo.id);
                      setEditTodoText(todo.text);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
