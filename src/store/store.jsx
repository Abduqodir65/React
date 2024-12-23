import { create } from 'zustand';

const useStore = create((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const exists = state.cart.find((item) => item.id === product.id);
      if (exists) return state;
      return { cart: [...state.cart, product] };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
}));

export default useStore;
