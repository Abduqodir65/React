import Header from "./components/Header"
import { CartProvider } from "./contexts/CartContext"
import Hero from "./pages/Hero"
import Products from "./pages/Products"
function App() {
  return (
    <>

    <CartProvider>
    <Header/>
    </CartProvider>
    <Hero/>
    <Products />
      

    </>
  )
}

export default App
