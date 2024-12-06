import React from "react";
import { TodoProvider } from "./context/TodoContext";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <TodoProvider>
      <div className="App">
        <Form />
        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default App;
