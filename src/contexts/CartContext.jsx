import { createContext, useContext, useReducer } from "react";

export const CartContext = createContext();


function reducer(state,action){
    return state
}

export const CartProvider = ({children})=>{
    const [cart,dispatch]=useReducer(reducer,[{},{}])


    return (
        <CartContext.Provider value={{cart,dispatch}}>
            {children}
        </CartContext.Provider>
    )
    
}

export function useCart(){
    const context = useContext(CartContext)

    if(!context){
        throw new Error("Curt must be inside CartProvider")
    }

    return context
}