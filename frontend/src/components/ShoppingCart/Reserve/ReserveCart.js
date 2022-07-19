import EmptyReserveList from './EmptyReserveList'
import ReserveList from './ReserveList'
import ConfirmReserveList from './ConfirmReserveList'
import FinishReserveList from './FinishReserveList'
import PayList from '../Pay/PayList'
import ConfirmPay from '../Pay/ConfirmPay'
import FinishPay from '../Pay/FinishPay'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../../utils/config'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link, useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useActivePanel } from '../../../context/ActivePanel'
import { useLogin } from '../../../context/LoginStatus'

const ReserveCart = (props) => {
  const history = useHistory()
  const { data } = props
  const [step, setStep] = useState(0)
  // 要抓使用者check的groupId
  const [groups, setGroups] = useState([])
  // 會員加入購物車，要抓到會員的id
  const user = localStorage.getItem('userID')
  //要把paylist選到的couponID傳到ConfirmPay
  const [selectCou, setSelectCou] = useState(0)
  //要把paylist選到的總價格傳到ConfirmPay
  const [selectPri, setSelectPri] = useState(0)
  //導頁到會員我的訂單
  const { setActive } = useActivePanel()
  const { isLogin } = useLogin()
  const loginAlert = async () => {
    await Swal.fire({
      confirmButtonText: '去登入',
      icon: 'warning',
      title: '登入後才能使用此功能',
      backdrop: `rgba(255, 255, 255, 0.55)`,
      width: '35%',
      padding: '0 0 1.25em',
      customClass: {
        popup: 'shadow-sm',
        confirmButton: 'btn btn-primary h5',
        content: 'h5',
      },
      buttonsStyling: false,
    })
    await history.push('/login')
  }

  //要確認結帳的payGroup
  const payGroup = localStorage.getItem('payGroup')
  const location = useLocation()
  let [gotoId, setGotoId] = useState('')
  async function getApi() {
    await fetch(`${API_URL}/shoppingCart/search?userID=${user}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        /*接到response data後要做的事情*/
        if (res.result.length === 0) {
          setStep(0)
        } else {
          setStep(1)
        }
      })
      .catch((e) => {
        /*發生錯誤時要做的事情*/
        console.log(e)
      })
    if (location.state !== undefined && location.state.step !== undefined) {
      setGotoId(location.state.groupId)
      setStep(location.state.step)
    } else {
      setGotoId('')
    }
  }
  useEffect(() => {
    getApi()
  }, [])

  // reserveList的checkbox
  function setGroupsFunc(groups) {
    const arrOfGroups = groups.map((str) => {
      return Number(str)
    })
    setGroups(arrOfGroups)
  }

  function toggleStep(val) {
    setStep(step + val)
  }

  async function SubmitList() {
    //查詢資料
    const params = {
      userID: user,
      groupID: groups,
    }

    //新增資料、更新目前參加人數
    await axios.post(`${API_URL}/shoppingCart/finishreservelist`, params)
    toggleStep(1)
    window.scrollTo(0, 0)
  }
  //選到的優惠卷id
  function handleCouponProps(coudata) {
    setSelectCou(coudata)
  }
  //獲得總金額
  function handleTotal(money) {
    setSelectPri(money)
  }

  //確認結帳後更新coupon已使用及已結帳
  async function updateApi() {
    // console.log(selectCou)
    const param = {
      selectCou: selectCou,
      selectPri: selectPri,
      payGroup: payGroup,
      user: user,
    }
    await axios.post(`${API_URL}/shoppingCart/updatecoupay`, param)
  }

  return (
    <>
      <div>
        {step === 0 ? (
          <>
            <EmptyReserveList />
            <div className="d-flex flex-column align-items-center  w-100">
              <a
                type="button"
                className="mb-5 bg-primary px-5 py-2 rounded ms-9 text-dark"
                onClick={() => {
                  history.push('/groups')
                  window.scrollTo(0, 0)
                }}
              >
                參團去
              </a>
            </div>
          </>
        ) : (
          ''
        )}
        {step === 1 ? (
          <>
            <ReserveList userID={user} setGroupsFunc={setGroupsFunc} />
            <div className="d-flex justify-content-end">
              <div className="d-flex justify-content-around w-75">
                <Link
                  to="/groups"
                  type="button"
                  className="bg-info text-white px-4 py-2 ms-6 mb-5"
                  style={{ marginLeft: '-102px' }}
                  onClick={() => {
                    window.scrollTo(0, 0)
                  }}
                >
                  想看更多
                </Link>
                <a
                  type="button"
                  className="bg-primary text-white px-4 py-2 me-8 mb-5"
                  style={{ marginLeft: '301px' }}
                  onClick={() => {
                    toggleStep(1)
                    window.scrollTo(0, 0)
                  }}
                >
                  前往訂位
                </a>
              </div>
            </div>
          </>
        ) : (
          ''
        )}
        {step === 2 ? (
          <>
            <ConfirmReserveList groups={groups} userID={user} />
            <div className="d-flex justify-content-end mb-4">
              <div
                className="d-flex justify-content-around w-75"
                style={{ marginRight: '163px' }}
              >
                <a
                  type="button"
                  className="bg-info text-white px-4 py-2 my-6"
                  onClick={() => {
                    toggleStep(-1)
                    window.scrollTo(0, 0)
                  }}
                >
                  重選訂位項目
                </a>
                <a
                  type="button"
                  className="bg-primary text-white px-4 py-2 my-6"
                  onClick={() => {
                    SubmitList()
                    Swal.fire({
                      position: 'center-center',
                      icon: 'success',
                      title: '訂位成功',
                      showConfirmButton: false,
                      timer: 1500,
                    })
                    toggleStep(1)
                    window.scrollTo(0, 0)
                  }}
                >
                  確定訂位
                </a>
              </div>
            </div>
          </>
        ) : (
          ''
        )}
        {step === 3 ? (
          <>
            <FinishReserveList groups={groups} userID={user} />
            <div className="d-flex justify-content-center mb-5">
              <a
                type="button"
                className="bg-info text-white px-4 py-2 mt-6"
                onClick={() => {
                  if (isLogin) {
                    setActive('second')
                    history.push('/memberCenter')
                    window.scrollTo(0, 0)
                  } else {
                    loginAlert()
                  }
                }}
              >
                查看我的訂單
              </a>
            </div>
          </>
        ) : (
          ''
        )}
        {step === 4 ? (
          <>
            <PayList
              couponSelect={handleCouponProps}
              gotoId={gotoId}
              finalTotal={handleTotal}
            />
            <div className="d-flex justify-content-center mb-5">
              <a
                type="button"
                className="bg-primary text-white px-4 py-2 mt-1 mb-3"
                onClick={() => {
                  toggleStep(1)
                  window.scrollTo(0, 0)
                }}
              >
                前往填寫資料
              </a>
            </div>
          </>
        ) : (
          ''
        )}
        {step === 5 ? (
          <>
            <ConfirmPay selectCou={selectCou} selectPri={selectPri} />
            <div className="d-flex justify-content-center mb-5">
              <div className="d-flex justify-content-around w-75">
                <a
                  type="button"
                  className="bg-info text-white px-4 py-2 mt-4 ms-5"
                  onClick={() => {
                    toggleStep(-1)
                    window.scrollTo(0, 0)
                  }}
                >
                  重選優惠
                </a>
                <a
                  type="button"
                  className="bg-primary text-white px-4 py-2 me-5 mt-4"
                  onClick={() => {
                    updateApi()
                    Swal.fire({
                      position: 'center-center',
                      icon: 'success',
                      title: '結帳成功',
                      showConfirmButton: false,
                      timer: 1500,
                    })
                    toggleStep(1)
                    window.scrollTo(0, 0)
                  }}
                >
                  確認結帳
                </a>
              </div>
            </div>
          </>
        ) : (
          ''
        )}
        {step === 6 ? (
          <>
            <FinishPay />
            <div className="d-flex justify-content-center mb-5">
              <a
                type="button"
                className="bg-info text-white px-4 py-2"
                onClick={() => {
                  if (isLogin) {
                    setActive('second')
                    history.push('/memberCenter')
                    window.scrollTo(0, 0)
                  } else {
                    loginAlert()
                  }
                }}
              >
                查看我的訂單
              </a>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default ReserveCart
