import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <nav>
                <ul className="flex gap-3 [&_a]:bg-black [&_a]:text-white">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
