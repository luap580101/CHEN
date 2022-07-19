import React from 'react'
import { Link } from 'react-router-dom'
import GroupdetailPage from '../components/Groupdetail/GroupdetailPage'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL, IMAGE_URL } from '../utils/config'
import { useParams } from 'react-router-dom'
import dateCountdown from 'date-countdown'
import { useLogin } from '../context/LoginStatus'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { BsCaretRightSquare } from 'react-icons/bs'

function GroupDetail() {
  const { member } = useLogin()
  const history = useHistory()
  const [data, setData] = useState([])
  const { groupId } = useParams()
  useEffect(() => {
    let getDetail = async () => {
      let response = await axios.get(`${API_URL}/group/${groupId}`)
      setData(response.data.data)
    }
    getDetail()
  }, [])
  // console.log('資料', data.name)
  const addShoppingCart = async (groupId) => {
    try {
      await axios.get(
        `${API_URL}/group/shoppingcart?userID=${member.id}&groupId=${groupId}`
      )
    } catch (e) {
      console.log(e.response.data.error)
    }
  }
  return (
    <>
      {data.map((v, i) => {
        return (
          <div key={v.id} className="groupdetail container mt-7 mb-7">
            <div className="row">
              <div className="col-8 ">
                <div className="img-box ms-auto">
                  <img src={`${IMAGE_URL}${v.banner}`} alt="" />
                </div>
                <div className="ms-7 mt-5">
                  <div className="row">
                    <div className="col-3">
                      <div className="detailcover ">
                        <img
                          className="img-fulid w-80"
                          src={`${IMAGE_URL}${v.img}`}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-9 mb-5">
                      <div className="d-flex">
                        <h4 className="mt-4">{v.name}</h4>
                      </div>
                      <h5 className="mt-4 fw-normal">{v.address}</h5>
                      <h5 className="fw-normal">{v.phone}</h5>
                      <Link to={`/shopDetail/${v.shop_id}`}>
                        <div className="d-flex mt-1 ">
                          <BsCaretRightSquare className="mt-4 point" />
                          <p className="mt-4">前往店家</p>
                        </div>
                      </Link>
                    </div>

                    <hr />
                    <h5 className="mt-4 fw-normal">{v.description}</h5>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="container ps-2">
                  <h3 className="px-3 mb-5 text-info borderTitle">開團目標</h3>
                  <div className="mt-4 mb-1">
                    <div className="Gtitle d-flex align-items-center ">
                      <img
                        src={require('../image/groupdetail/icon7.png')}
                        alt=""
                      />
                      <h5 className="ms-2 mt-2">目標人數</h5>
                      <h2 className="ms-4">{v.goal_num}人</h2>
                    </div>
                  </div>
                  <div className="mt-4 mb-1">
                    <div className="Gtitle d-flex align-items-center ">
                      <img
                        src={require('../image/groupdetail/icon5.png')}
                        alt=""
                      />
                      <h5 className="ms-2 mt-2">開團倒數</h5>
                      <h2 className="ms-4">
                        {dateCountdown(
                          v.daysleft[0],
                          v.daysleft[1],
                          v.daysleft[2]
                        )}
                        天
                      </h2>
                    </div>
                  </div>
                  <div className="mt-4 mb-1">
                    <div className="Gtitle d-flex align-items-center ">
                      <img
                        src={require('../image/groupdetail/icon4.png')}
                        alt=""
                      />
                      <h5 className="ms-2 mt-2">參團價格</h5>
                      <h2 className="ms-4">{v.price}</h2>
                    </div>
                  </div>
                  <div className="ms-auto mt-5">
                    <Link to="/groups">
                      <button
                        type="button"
                        className="add-group btn btn-info"
                        onClick={() => {
                          if (member.id !== '') {
                            addShoppingCart(groupId)
                            Swal.fire({
                              position: 'top-center',
                              icon: 'success',
                              title: '成功加入購物車',
                              showConfirmButton: false,
                              timer: 1500,
                            })
                          } else {
                            Swal.fire({
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
                            history.push('/login')
                          }
                        }}
                      >
                        我要參團
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              {/* 頁面切換 */}
              <div className="px-8 mt-5 container ">
                <GroupdetailPage />
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default GroupDetail
