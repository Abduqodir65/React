import { useEffect, useState } from "react";
import logo from "../assets/icons/logo.svg";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const {cart} = useCart()
  useEffect(() => {
    function watchScroll() {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    }
    window.addEventListener("scroll", watchScroll);

   
    return () => {
      window.removeEventListener("scroll", watchScroll);
    };
  }, []); 



  return (
    <header
      className={`fixed w-full transition-all ${
        isActive ? "py-4 bg-white shadow-lg" : "py-6"
      }`}
    >
      <div className="flex items-center justify-between mx-auto container px-6">
        <div className="w-10">
          <a href="/" className="w-full h-full">
            <img src={logo} alt="Logo icon" />
          </a>
        </div>

        <button className="relative">
          <ShoppingBag className="w-7 h-7" />
          <span className="absolute -right-2 -bottom-2 bg-red-500 px-2 rounded-full text-white text-center">
            {cart.length}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
