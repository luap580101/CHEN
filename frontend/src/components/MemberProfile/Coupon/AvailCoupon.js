import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { API_URL } from '../../../utils/config'
import { useLogin } from '../../../context/LoginStatus'
import { useCoupon } from '../../../context/CouponContext'

const AvailCoupon = () => {
  const { availCoupon, setAvailCoupon, getCoupon, setGetCoupon } = useCoupon()
  const { member } = useLogin()
  const handleUsed = async (e, id) => {
    e.currentTarget.disabled = true
    try {
      let response = await axios.get(`${API_URL}/coupon/getCoupon`, {
        params: {
          couponId: id,
          userId: member.id,
        },
      })
      setGetCoupon(!getCoupon)
    } catch (e) {
      console.log(e.response.data.error)
    }
  }
  useEffect(() => {
    ;(async () => {
      // console.log(member.id)
      try {
        let response = await axios.get(`${API_URL}/coupon/availCoupon`, {
          params: {
            userId: member.id,
          },
        })
        const usedCoupon = response.data.used
        // console.log(usedCoupon)
        const allCoupon = response.data.data
        // console.log(allCoupon)
        const availableCoupon = allCoupon.map((v) => {
          for (let i = 0; i < usedCoupon.length; i++) {
            if (v.id === usedCoupon[i].id) {
              return { ...v, used: true }
            }
          }
          return { ...v, used: false }
        })
        // console.log('可用的', availableCoupon)
        setAvailCoupon(availableCoupon)
      } catch (e) {
        // console.log(e.response.data.error)
      }
    })()
  }, [member.id])

  return (
    <>
      <div className="container">
        <div className="row justify-content-between gy-3">
          {/* 卡片 */}
          {availCoupon.map((v, i) => {
            return (
              <div className="col-md-5 mx-3" key={v.id}>
                <div className="alert alert-coupon row justify-content-around pe-md-5">
                  <div className="col-auto col-md-7">
                    <h4 className="text-info">優惠券</h4>
                    <p>{v.reason}</p>
                  </div>
                  <div className="col-auto p-0 text-center mx-2">
                    <h3 className="text-danger">${v.price}</h3>
                    <Button
                      variant="danger"
                      className="py-1 fs-5 text-white"
                      disabled={v.used}
                      onClick={(e) => {
                        handleUsed(e, v.id)
                      }}
                    >
                      領取
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default AvailCoupon
