import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useSelector(
        (state) => state.userAuth.isAuthenticated
    );

    if (isAuthenticated) {
        navigate("/");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.get("https://dummyjson.com/users");
            const users = response.data.users;

            const user = users.find(
                (u) => u.username === userName && u.password === password
            );

            if (user) {
                dispatch(login({ token: "blabla", user }));
                navigate("/");
            } else {
                setError("Invalid username or password.");
            }
        } catch (err) {
            setError("An error occurred.Please try again.");
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form
                className="flex flex-col max-w-40 mx-auto gap-3"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    style={{ border: "solid" }}
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="password"
                    style={{ border: "solid" }}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="bg-black text-white p-2">
                    Login
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}
