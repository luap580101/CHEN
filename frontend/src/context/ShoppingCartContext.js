import { useContext, createContext } from 'react'

export const ShoppingCartContext = createContext()

export function useShoppingCartContext() {
  return useContext(ShoppingCartContext)
}
