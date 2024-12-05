import React, { useContext } from "react";
import { UserContext } from "../App";
import { useTheme } from "../ThemeContext";

const UserSummary = () => {
    const { theme } = useTheme();
    const { username, email, age } = useContext(UserContext);

    return (
        <div
            className={`p-4 mt-4 rounded ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
                }`}
        >
            <h2 className="text-xl font-bold">User Summary</h2>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            <p>Age: {age}</p>
        </div>
    );
};

export default UserSummary;
