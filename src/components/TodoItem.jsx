import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoItem = ({ todo }) => {
    const { dispatch } = useContext(TodoContext);

    return (
        <li className="flex items-center justify-between p-3 rounded-md">
            <span
                className={`${todo.completed ? "line-through text-gray-500" : "text-gray-800"
                    }`}
            >
                {todo.text}
            </span>
            <button
                onClick={() => dispatch({ type: "update", id: todo.id })}
                className={`px-3 py-1 rounded-md text-sm ${todo.completed
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
            >
                {todo.completed ? "Undo" : "Complete"}
            </button>
            <button
                onClick={() => dispatch({ type: "delete", id: todo.id })}
                className="px-3 py-1 rounded-md text-sm bg-red-300"
            >
                Delete
            </button>
        </li>
    );
};

export default TodoItem;
