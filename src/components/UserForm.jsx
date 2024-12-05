import React, { useContext } from "react";
import { UserContext } from "../App";
import Input from "./Input";

const UserForm = () => {
    const { username, setUsername, email, setEmail, age, setAge } =
        useContext(UserContext);

    return (
        <form className="p-4 rounded">
            <Input
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                label="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
        </form>
    );
};

export default UserForm;
