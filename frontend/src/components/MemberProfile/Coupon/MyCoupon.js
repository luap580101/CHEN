import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../../utils/config'
import { useLogin } from '../../../context/LoginStatus'
import { useState } from 'react'
import { useCoupon } from '../../../context/CouponContext'

const MyCoupon = () => {
  const { member } = useLogin()
  const [myCoupon, setMyCoupon] = useState([])
  const { getCoupon, countCoupon, setCountCoupon } = useCoupon()
  useEffect(() => {
    ;(async () => {
      try {
        let response = await axios.get(`${API_URL}/coupon/myCoupon`, {
          params: {
            userId: member.id,
          },
        })
        setMyCoupon(response.data.coupon)
        setCountCoupon(response.data.count)
      } catch (e) {
        console.log(e.response.data.error)
      }
    })()
  }, [member.id, getCoupon, countCoupon])
  return (
    <>
      <div className="container">
        <div className="row justify-content-between gy-3">
          {myCoupon.map((v, i) => {
            return (
              /* 卡片 */
              <div className="col-md-5 mx-3" key={v.id}>
                <div className="alert alert-coupon row justify-content-around pe-md-5">
                  <div className="col-auto col-md-7">
                    <h4 className="text-info">優惠券</h4>
                    <p>{v.reason}</p>
                  </div>
                  <div className="col-auto p-0 text-center mx-2">
                    <h3 className="text-danger">${v.price}</h3>
                    <Link to="/groups">
                      <Button variant="danger" className="py-1">
                        <h5 className="text-nowrap text-white">去使用</h5>
                      </Button>
                    </Link>
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

export default MyCoupon
