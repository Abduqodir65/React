import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://dummyjson.com/users")
            .then((response) => response.json())
            .then((data) => setUsers(data.users))
            .catch((error) => console.error("Xatolik yuz berdi:", error));
    }, []);

    const handleUserClick = (userId) => {
        navigate(`/user/${userId}`);
    };

    return (
        <div>
            <h1>HomePage</h1>
            <ul>
                {users.map((user) => (
                    <li
                        key={user.id}
                        onClick={() => handleUserClick(user.id)}
                        style={{ cursor: "pointer" }}
                    >
                        {user.firstName} {user.lastName}
                    </li>
                ))}
            </ul>
        </div>
    );
}
