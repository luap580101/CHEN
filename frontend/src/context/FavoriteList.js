import { useContext, createContext } from 'react'

export const FavoriteContext = createContext()

export function useFavorite() {
  return useContext(FavoriteContext)
}
