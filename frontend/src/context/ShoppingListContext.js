import { useContext, createContext } from 'react'

export const ShoppingListContext = createContext()

export function useShoppingListContext() {
  return useContext(ShoppingListContext)
}
