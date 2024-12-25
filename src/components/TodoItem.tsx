import React from "react";
import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <li style={styles.item}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        style={styles.checkbox}
      />
      <span
        style={{
          ...styles.text,
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.title}
      </span>
      <button onClick={() => deleteTodo(todo.id)} style={styles.deleteButton}>
        Delete
      </button>
    </li>
  );
};

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 15px",
    borderBottom: "1px solid #ddd",
  },
  checkbox: {
    marginRight: "10px",
  },
  text: {
    flex: 1,
    fontSize: "16px",
    color: "#333",
  },
  deleteButton: {
    padding: "5px 10px",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#dc3545",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default TodoItem;
