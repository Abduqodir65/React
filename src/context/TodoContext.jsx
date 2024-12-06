import React, { createContext, useReducer } from "react";

export const TodoContext = createContext();

const initialTodos = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Build a project", completed: true },
  { id: 3, text: "Deploy application", completed: false },
];

function todoReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case "update":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "delete":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
}

export const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
