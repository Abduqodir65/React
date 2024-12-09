import { useEffect, useState } from "react";
import logo from "../assets/icons/logo.svg";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import Sidebar from "./Sidebar";

const Header = () => {
  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    function watchScroll() {
      window.scrollY > 60 ? setIsHeaderActive(true) : setIsHeaderActive(false);
    }
    window.addEventListener("scroll", watchScroll);

    return () => {
      window.removeEventListener("scroll", watchScroll);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header
        className={`fixed z-20 w-full transition-all ${isHeaderActive ? "py-4 bg-white shadow-lg" : "py-6"
          }`}
      >
        <div className="flex items-center justify-between mx-auto container px-6">
          <div className="w-10">
            <a href="/" className="w-full h-full">
              <img src={logo} alt="Logo icon" />
            </a>
          </div>

          <button className="relative" onClick={toggleSidebar}>
            <ShoppingBag className="w-7 h-7" />
            {cart.length > 0 && (
              <span className="absolute -right-2 -bottom-2 bg-red-500 px-2 rounded-full text-white text-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
};

export default Header;