import React from 'react'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { API_URL, IMAGE_URL } from '../../../utils/config'

const FinishPay = () => {
  const payGroup = localStorage.getItem('payGroup')
  const userID = localStorage.getItem('userID')
  const [data, setData] = useState({})
  const history = useHistory()

  useEffect(() => {
    fetch(
      `${API_URL}/shoppingcart/finishlist?payGroup=${payGroup}&userID=${userID}`,
      {
        method: 'GET',
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.result[0])
      })
      .catch((e) => {
        /*發生錯誤時要做的事情*/
        console.log(e)
      })
  }, [])
  function getEatTimeString() {
    if (data.eating_time === 1) {
      return '午餐12:00'
    } else if (data.eating_time === 2) {
      return '下午茶15:00'
    } else {
      return '晚餐18:00'
    }
  }
  return (
    <>
      <div className=" container my-4 ">
        <div className="d-flex justify-content-center mb-8">
          <div>
            <div className="w-75 ms-8" style={{ marginRight: '80px' }}>
              <img
                style={{ width: '500px' }}
                className="mb-5"
                src={require('../../../image/shoppingCart/icongroup06.png')}
                alt=""
              />
            </div>
            {/* List */}
            <div className="bg-secondary p-4 d-flex flex-column align-items-center h-50">
              <div className="mb-6">
                <div className="mt-7">
                  <img
                    style={{ width: '80px' }}
                    src={require('../../../image/shoppingCart/nike.png')}
                    alt=""
                  />
                </div>
                <h4 className="mt-5">結帳完成</h4>
              </div>
              <div className="w-100">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">參團店家</th>
                      <th scope="col">參團資訊</th>
                      <th scope="col">金額資訊</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="d-flex flex-column">
                        <img
                          style={{ width: '100px', height: '100px' }}
                          className="logo py-4 img-fluid"
                          src={`${IMAGE_URL}${data.img}`}
                          alt=""
                        />
                        <div style={{ marginLeft: '14px' }}> {data.name}</div>
                      </td>

                      <td className=" pt-4">
                        <div className=" pt-2">
                          用餐日期：{data.eating_date}
                        </div>
                        <div className=" pt-2">
                          用餐時間：{getEatTimeString()}
                        </div>
                      </td>
                      <td className=" pt-4">
                        <div className=" pt-2">商品金額：{data.price}</div>
                        <div className=" pt-2">總付款金額：{data.total}</div>
                        <div className=" pt-2">付款方式：信用卡支付</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* reconmand */}
            <div className="d-flex mt-6 justify-content-center">
              <div
                style={{ width: '30px', height: '20px' }}
                className="bg-primary"
              ></div>
              <h5 className="mx-2" style={{ marginTop: '-2px' }}>
                推薦開團
              </h5>
              <div
                style={{ width: '30px', height: '20px' }}
                className="bg-primary"
              ></div>
            </div>
            <div className="d-flex mt-4 justify-content-center">
              <div className="me-4 ">
                {/* card */}
                <div
                  className="little-card shadow-sm bg-white rounded main-hover"
                  onClick={() => {
                    history.push('/groupDetail/12')
                  }}
                >
                  <img
                    className="w-100 h-50 rounded-top"
                    src={require('../../../image/shopList/Kangyaolife-1.jpg')}
                    alt=""
                  />
                  <div className="p-3">
                    <div className="d-flex justify-content-between">
                      <h4>陶板屋</h4>
                      <span class="badge rounded-pill bg-primary">日式</span>
                    </div>
                    <h6 className="fw-normal">目前人數:0人</h6>
                    <h6 className="fw-normal mb-4">用餐時間:2022/07/19</h6>
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped"
                        role="progressbar"
                        style={{ width: '30%' }}
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="progress-text mt-1">剩下6天</p>
                      <p className="progress-text mt-1">目標人數:4人</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="me-4 ">
                {/* card */}
                <div
                  className="little-card shadow-sm bg-white rounded main-hover"
                  onClick={() => {
                    history.push('/groupDetail/57')
                  }}
                >
                  <img
                    className="w-100 h-50 rounded-top"
                    src={require('../../../image/shopList/DianShuiLou-1.jpg')}
                    alt=""
                  />
                  <div className="p-3">
                    <div className="d-flex justify-content-between">
                      <h4>點水樓</h4>
                      <span class="badge rounded-pill bg-primary">台式</span>
                    </div>
                    <h6 className="fw-normal">目前人數:0人</h6>
                    <h6 className="fw-normal mb-4">用餐時間:2022/07/21</h6>
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped"
                        role="progressbar"
                        style={{ width: '30%' }}
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="progress-text mt-1">剩下5天</p>
                      <p className="progress-text mt-1">目標人數:3人</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="me-4 ">
                {/* card */}
                <div
                  className="little-card shadow-sm bg-white rounded main-hover"
                  onClick={() => {
                    history.push('/groupDetail/54')
                  }}
                >
                  <img
                    className="w-100 h-50 rounded-top"
                    src={require('../../../image/shopList/Pinnada-1.jpg')}
                    alt=""
                  />
                  <div className="p-3">
                    <div className="d-flex justify-content-between">
                      <h4>品田牧場</h4>
                      <span class="badge rounded-pill bg-primary">日式</span>
                    </div>
                    <h6 className="fw-normal">目前人數:0人</h6>
                    <h6 className="fw-normal mb-4 ">用餐時間:2022/07/20</h6>
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped"
                        role="progressbar"
                        style={{ width: '30%' }}
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="progress-text mt-1">剩下7天</p>
                      <p className="progress-text mt-1">目標人數:5人</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FinishPay
