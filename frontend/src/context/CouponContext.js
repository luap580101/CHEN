import { useContext, createContext } from 'react'

export const CouponContext = createContext()

export function useCoupon() {
  return useContext(CouponContext)
}
