import React from "react";
import { useTheme } from "../ThemeContext";

const Input = ({ label, type = "text", value, onChange }) => {
  const { theme } = useTheme();

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full p-2 rounded border ${
          theme === "dark"
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-white text-black border-gray-300"
        }`}
      />
    </div>
  );
};

export default Input;
