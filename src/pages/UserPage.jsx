import { useParams } from "react-router-dom";

export default function UserPage() {
    const { userId } = useParams();

    return (
        <div>
            <h1>User Page</h1>
            <p>Foydalanuvchi ID: {userId}</p>
        </div>
    );
}
