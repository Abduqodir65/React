import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { 
  Trash2, Edit, CheckCircle, Clock, Calendar, 
  Tag, Filter, AlertCircle, SortDesc, List, Plus, 
  Search, X, Archive, Upload, Download, Share2, 
  RotateCcw
} from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("date");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState(["Ish", "Shaxsiy", "Ta'lim"]);
  const [newCategory, setNewCategory] = useState("");
  const [dragging, setDragging] = useState(null);
  const categoryInputRef = useRef(null);

  // Local storage save va load qilish
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    const savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos') || '[]');
    const savedCategories = JSON.parse(localStorage.getItem('categories') || '["Ish", "Shaxsiy", "Ta\'lim"]');
    
    setTodos(savedTodos);
    setCompletedTodos(savedCompletedTodos);
    setCategories(savedCategories);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [todos, completedTodos, categories]);

  // Kategoriya qo'shish
  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      setNewCategory("");
      categoryInputRef.current.focus();
      toast.success("Yangi kategoriya qo'shildi!");
    }
  };

  const handleDragStart = (e, todo) => {
    setDragging(todo);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetTodo) => {
    e.preventDefault();
    if (!dragging) return;

    const updatedTodos = todos.map(todo => {
      if (todo.id === dragging.id) {
        return { ...todo, category: targetTodo.category };
      }
      return todo;
    });

    setTodos(updatedTodos);
    setDragging(null);
    toast.info("Todo kategoriyasi o'zgartirildi!");
  };

  const exportTodos = () => {
    const dataStr = JSON.stringify({ todos, completedTodos, categories });
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'todos_backup.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success("Ma'lumotlar eksport qilindi!");
  };

  const importTodos = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const { todos: importedTodos, completedTodos: importedCompletedTodos, categories: importedCategories } = JSON.parse(event.target.result);
        setTodos(importedTodos);
        setCompletedTodos(importedCompletedTodos);
        setCategories(importedCategories);
        toast.success("Ma'lumotlar import qilindi!");
      } catch (error) {
        toast.error("Noto'g'ri fayl formati!");
      }
    };
    fileReader.readAsText(e.target.files[0]);
  };

  const startEditTodo = (todo) => {
    setEditId(todo.id);
    setEditTodoText(todo.text);
  };

  const updateTodo = () => {
    if (!editTodoText.trim()) {
      toast.warn("Todo matnini kiriting!");
      return;
    }

    const updatedTodos = todos.map(todo => 
      todo.id === editId 
        ? { ...todo, text: editTodoText }
        : todo
    );

    setTodos(updatedTodos);
    setEditId(null);
    setEditTodoText("");
    toast.success("Todo muvaffaqiyatli yangilandi!");
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (!todoText.trim()) {
      toast.warn("Todo matnini kiriting!", { position: "top-center" });
      return;
    }
  
    const newTodo = { 
      id: Date.now(), 
      text: todoText, 
      priority,
      dueDate,
      category: category || "Boshqa",  
      createdAt: new Date().toISOString(),
      subtasks: []
    };
  
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    
    setTodoText("");
    setPriority("low");
    setDueDate("");
    setCategory("");  
  
    toast.success("Todo muvaffaqiyatli qo'shildi!", { position: "top-center" });
  }

  function deleteTodo(todoId) {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
    toast.error("Todo o'chirildi!", { position: "top-center" });
  }

  function markTodoAsDone(todo) {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    const updatedCompletedTodos = [...completedTodos, {...todo, completedAt: new Date().toISOString()}];
    
    setTodos(updatedTodos);
    setCompletedTodos(updatedCompletedTodos);
    
    toast.success("Todo bajarildi!", { position: "top-center" });
  }

  function deleteCompletedTodo(todoId) {
    const updatedCompletedTodos = completedTodos.filter((todo) => todo.id !== todoId);
    setCompletedTodos(updatedCompletedTodos);
    toast.error("Bajarilgan todo o'chirildi!", { position: "top-center" });
  }

  function restoreTodo(todo) {
    const updatedCompletedTodos = completedTodos.filter((t) => t.id !== todo.id);
    const updatedTodos = [...todos, {...todo, completedAt: undefined}];
    
    setCompletedTodos(updatedCompletedTodos);
    setTodos(updatedTodos);
    
    toast.info("Todo qayta tiklandi!", { position: "top-center" });
  }

  const filteredTodos = todos
    .filter(todo => 
      todo.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(todo => {
      if (filter === "high-priority") return todo.priority === "high";
      if (filter === "medium-priority") return todo.priority === "medium";
      if (filter === "low-priority") return todo.priority === "low";
      return true;
    })
    .sort((a, b) => {
      if (sort === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-8">
      <div className="max-w-4xl mx-auto bg-white text-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Todo Boshqaruv Paneli</h1>
        
        {/* Export/Import qismi */}
        <div className="flex justify-end space-x-2 mb-4">
          <button 
            onClick={exportTodos}
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg flex items-center"
          >
            <Download className="mr-2" /> Export
          </button>
          <label className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg flex items-center cursor-pointer">
            <Upload className="mr-2" /> Import
            <input 
              type="file" 
              accept=".json" 
              onChange={importTodos} 
              className="hidden" 
            />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div className="flex space-x-2">
            {editId ? (
              <>
                <input
                  type="text"
                  value={editTodoText}
                  onChange={(event) => setEditTodoText(event.target.value)}
                  placeholder="Todoni tahrirlang"
                  className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
                <button
                  type="button"
                  onClick={updateTodo}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Saqlash
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setEditTodoText("");
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Bekor qilish
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={todoText}
                  onChange={(event) => setTodoText(event.target.value)}
                  placeholder="Todo kiriting"
                  className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Qo'shish
                </button>
              </>
            )}
          </div>

          {!editId && (
            <>
              <div className="flex space-x-2">
                <select 
                  value={priority} 
                  onChange={(e) => setPriority(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg"
                >
                  <option value="low">Past darajada</option>
                  <option value="medium">O'rta darajada</option>
                  <option value="high">Yuqori darajada</option>
                </select>

                <input 
                  type="date" 
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg"
                />

                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Kategoriyani tanlang</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Kategoriya qo'shish */}
              <div className="flex space-x-2">
                <input
                  ref={categoryInputRef}
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Yangi kategoriya qo'shish"
                  className="flex-grow p-2 border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={addCategory}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <Plus className="mr-2" /> Kategoriya
                </button>
              </div>
            </>
          )}
        </form>

        <div className="flex justify-between items-center mb-4 space-x-2">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Qidirish..."
              className="w-full p-2 pl-8 border border-gray-300 rounded-lg"
            />
            <Search className="absolute left-2 top-3 text-gray-400" size={18} />
            {searchTerm && (
              <X 
                onClick={() => setSearchTerm("")} 
                className="absolute right-2 top-3 text-gray-400 cursor-pointer" 
                size={18} 
              />
            )}
          </div>

          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="all">Barchasi</option>
            <option value="high-priority">Yuqori prioritet</option>
            <option value="medium-priority">O'rta prioritet</option>
            <option value="low-priority">Past prioritet</option>
          </select>


          <select 
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="date">Sana bo'yicha</option>
            <option value="priority">Prioritet bo'yicha</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(cat => (
            <div 
              key={cat} 
              className="bg-gray-100 rounded-lg p-4"
              onDragOver={handleDragOver}
            >
              <h3 className="text-lg font-semibold mb-2">{cat}</h3>
              <ul className="space-y-2">
                {filteredTodos
                  .filter(todo => todo.category === cat)
                  .map(todo => (
                    <li
                      key={todo.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, todo)}
                      onDrop={(e) => handleDrop(e, todo)}
                      className={`rounded-lg p-2 cursor-move ${
                        todo.priority === 'high' ? 'bg-red-100' : 
                        todo.priority === 'medium' ? 'bg-yellow-100' : 
                        'bg-gray-200'
                      }`}
                    >
                      {editId === todo.id ? (
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={editTodoText}
                            onChange={(e) => setEditTodoText(e.target.value)}
                            className="flex-grow p-1 border rounded"
                          />
                          <button 
                            onClick={updateTodo}
                            className="bg-green-500 text-white p-1 rounded"
                          >
                            Saqlash
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <span>{todo.text}</span>
                          <div className="flex space-x-2">
                            <Edit 
                              onClick={() => startEditTodo(todo)}
                              className="text-blue-500 hover:text-blue-600 cursor-pointer" 
                              size={16} 
                            />
                            <CheckCircle 
                              onClick={() => markTodoAsDone(todo)}
                              className="text-green-500 hover:text-green-600 cursor-pointer" 
                              size={16} 
                            />
                            <Trash2
                              onClick={() => deleteTodo(todo.id)}
                              className="text-red-500 hover:text-red-600 cursor-pointer" 
                              size={16} 
                            />
                          </div>
                        </div>
                      )}
                      {todo.dueDate && (
                        <div className="text-xs text-gray-500 flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {todo.dueDate}
                        </div>
                      )}
                    </li>
                  ))
                }
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center mb-4">Bajarilgan Todolar</h2>
          <div className="bg-green-50 rounded-lg p-4">
            {completedTodos.length === 0 ? (
              <p className="text-center text-gray-500">Hozircha bajarilgan todolar yo'q</p>
            ) : (
              <ul className="space-y-2">
                {completedTodos.map(todo => (
                  <li 
                    key={todo.id} 
                    className="bg-green-100 rounded-lg p-2 flex justify-between items-center"
                  >
                    <div>
                      <span className="line-through text-gray-600">{todo.text}</span>
                      <div className="text-xs text-gray-500">
                        Bajarilgan sana: {new Date(todo.completedAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <RotateCcw
                        onClick={() => restoreTodo(todo)}
                        className="text-blue-500 hover:text-blue-600 cursor-pointer" 
                        size={16} 
                      />
                      <Trash2
                        onClick={() => deleteCompletedTodo(todo.id)}
                        className="text-red-500 hover:text-red-600 cursor-pointer" 
                        size={16} 
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}

export default App;