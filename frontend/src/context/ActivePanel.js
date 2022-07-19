import { useContext, createContext } from 'react'

export const ActivePanelContext = createContext()

export function useActivePanel() {
  return useContext(ActivePanelContext)
}
