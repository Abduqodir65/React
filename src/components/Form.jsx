import React, { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const Form = () => {
    const [inputValue, setInputValue] = useState("");
    const { dispatch } = useContext(TodoContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            dispatch({ type: "add", payload: inputValue });
            setInputValue("");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="todo-input"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Add Todo
                    </label>
                    <input
                        id="todo-input"
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Type something..."
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Add Todo
                </button>
            </form>
        </div>
    );
};

export default Form;
