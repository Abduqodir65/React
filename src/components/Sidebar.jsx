import { X } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const Sidebar = ({ isOpen, onClose }) => {
    const { cart } = useCart();

    return (
        <>
            <div
                className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-30 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">SideBar</h2>
                        <button onClick={onClose}>
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20"
                    onClick={onClose}
                />
            )}
        </>
    );
};

export default Sidebar;