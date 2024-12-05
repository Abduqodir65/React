import React, { createContext, useState } from "react";
import { ThemeContextProvider, useTheme } from "./ThemeContext";
import UserForm from "./components/UserForm";
import UserSummary from './components/UserSummery'

export const UserContext = createContext();

const App = () => {
  return (
    <ThemeContextProvider>
      <MainApp />
    </ThemeContextProvider>
  );
};

const MainApp = () => {
  const { theme, toggleTheme } = useTheme();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  return (
    <div
      className={`container mx-auto p-6 max-w-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
    >
      <button
        onClick={toggleTheme}
        className={`mb-6 p-2 rounded ${theme === "dark" ? "bg-gray-600" : "bg-gray-200"
          }`}
      >
        Toggle Theme
      </button>
      <UserContext.Provider
        value={{ username, setUsername, email, setEmail, age, setAge }}
      >
        <h1 className="text-2xl font-bold mb-6">User Registration Form</h1>
        <UserForm />
        <UserSummary />
      </UserContext.Provider>
    </div>
  );
};

export default App;
