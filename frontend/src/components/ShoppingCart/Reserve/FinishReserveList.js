import React from 'react'
import Header from '../../Header/Header'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { API_URL } from '../../../utils/config'
import { useHistory } from 'react-router-dom'

const FinishReserveList = (props) => {
  const history = useHistory()
  const [data, setData] = useState([])
  const [para, setPara] = useState({
    groups: props.groups,
    userID: `${props.userID}`,
  })

  async function getApi() {
    const res = await axios.post(`${API_URL}/shoppingCart/finishre`, para)

    setData(res.data.result)
  }
  useEffect((props) => {
    if (!para) return
    getApi()
  }, [])
  function getEatTimeString(item) {
    if (item.eating_time === 1) {
      return '午餐12:00'
    } else if (item.eating_time === 2) {
      return '下午茶15:00'
    } else {
      return '晚餐18:00'
    }
  }

  return (
    <>
      <div className=" container">
        <Header />
        <div className="d-flex justify-content-center">
          <div>
            <div className="w-75 ms-8" style={{ marginRight: '80px' }}>
              <img
                style={{ width: '500px' }}
                className="mb-5 me-5"
                src={require('../../../image/shoppingCart/icongroup03.png')}
                alt=""
              />
            </div>
            {/* List */}
            <div className="bg-secondary d-flex flex-column align-items-center">
              <div className="mt-6 mb-5">
                <img
                  style={{ width: '100px' }}
                  src={require('../../../image/shoppingCart/finish.png')}
                  alt=""
                />
              </div>
              <h3 className="pb-3 mb-5  w-75 text-center">已完成訂位</h3>

              <table class="table w-75">
                <thead class="">
                  <tr>
                    <th>訂單編號：</th>
                  </tr>
                </thead>
                <tbody>
                  {/* map */}
                  {data.map((item, i) => (
                    <tr className="tr-hover">
                      <td className="py-5">{item.id}</td>
                      <td className="py-5">{item.name}</td>
                      <td className="py-5">
                        <div>({item.eating_date})</div>
                        <div>({getEatTimeString(item)})</div>
                      </td>
                      <td className="py-5">價格：${item.price}</td>
                      <td className="py-5 text-danger">(已成團)</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                <h6 className="fw-normal mb-4">用餐時間:2022/07/20</h6>
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
    </>
  )
}

export default FinishReserveList
