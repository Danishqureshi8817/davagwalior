import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "./storage";
import { create } from "zustand";

interface CartItem {
  id: string | number;
  item: any;
  count: number;
}

interface CartStore {
  cart: CartItem[];
  addItem: (item: any) => void;
  removeItem: (id: string | number) => void;
  deleteItem: (id: string | number) => void;
  clearCart: () => void;
  getItemCount: (id: string | number) => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addItem: (item: any) => {
        const currentCart = get().cart
        const existingItemIndex = currentCart?.findIndex(cartItem => cartItem?.id === item?.id)

        //when item exist
        if (existingItemIndex >= 0) {
          const updatedCart = [...currentCart]
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            count: updatedCart[existingItemIndex]?.count + 1
          }
          set({ cart: updatedCart })
        } else {
          set({
            cart: [...currentCart, { id: item?.id, item: item, count: 1 }]
          })
        }
      },
      clearCart: () => set({ cart: [] }),
      removeItem: (id) => {
        const currentCart = get().cart
        const existingItemIndex = currentCart?.findIndex(cartItem => cartItem?.id === id)

        if (existingItemIndex >= 0) {
          const updatedCart = [...currentCart]
          const existingItem = updatedCart[existingItemIndex];

          if (existingItem?.count > 1) {
            updatedCart[existingItemIndex] = {
              ...existingItem,
              count: existingItem?.count - 1
            }
          } else {
            updatedCart.splice(existingItemIndex, 1)
          }

          set({ cart: updatedCart })
        }
      },
      deleteItem: (id) => {
        const currentCart = get().cart;
        const updatedCart = currentCart.filter(cartItem => cartItem.id !== id);
        set({ cart: updatedCart });
      },
      getItemCount: (id) => {
        const currentItem = get()?.cart?.find(cartItem => cartItem?.id === id)
        return currentItem ? currentItem?.count : 0
      },
      getTotalPrice: () => {
        return get()?.cart?.reduce((total, cartItem) => total + cartItem.item?.price * cartItem?.count, 0)
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => mmkvStorage)
    }
  )
)