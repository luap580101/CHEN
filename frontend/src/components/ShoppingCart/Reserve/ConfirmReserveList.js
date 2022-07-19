import React from 'react'
import Header from '../../Header/Header'
import Side from '../Side'
import { API_URL, IMAGE_URL } from '../../../utils/config'
import { useState, useEffect } from 'react'
import axios from 'axios'

const ConfirmReserveList = (props) => {
  // console.log('我我我', props)
  const [data, setData] = useState([])
  // const { groups, userID } = props
  const [para, setPara] = useState({
    groups: props.groups,
    userID: `${props.userID}`,
  })

  async function getConfirmApi() {
    const res = await axios.post(
      `${API_URL}/shoppingCart/confirmreservelist`,
      para
    )
    setData(res.data.result)
  }

  useEffect((props) => {
    if (!para) return
    getConfirmApi()
    // fetch(
    //   `${API_URL}/shoppingcart/confirmreservelist?userID=${props.userID}&groups=${props.groups}`,
    //   {
    //     method: 'GET',
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((res) => {
    //     /*接到response data後要做的事情*/
    //     //console.log(res.result[0])
    //     setData(res.result)
    //   })
    //   .catch((e) => {
    //     /*發生錯誤時要做的事情*/
    //     console.log(e)
    //   })
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
        <div className="d-flex ">
          <Side />
          <div>
            <div className="w-75 ms-8" style={{ marginRight: '80px' }}>
              <img
                style={{ width: '500px' }}
                className="mb-5"
                src={require('../../../image/shoppingCart/icongroup02.png')}
                alt=""
              />
            </div>
            {/* List */}
            <div className="list w-100">
              <div class="show active" id="nav-home">
                <table class="table">
                  <thead class="">
                    <tr>
                      <th>開團店家</th>
                      <th>參團時間</th>
                      <th>現在人數</th>
                      <th>目標人數</th>
                      <th>價格</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* map */}
                    {data.map((item, i) => (
                      <tr className="tr-hover">
                        <td>
                          <img
                            style={{ width: '100px', height: '100px' }}
                            className="logo py-4 img-fluid"
                            src={`${IMAGE_URL}${item.img}`}
                            alt=""
                          />
                        </td>
                        <td className="py-5">
                          {item.eating_date} {getEatTimeString(item)}
                        </td>
                        <td className="py-5">{item.now_num}</td>
                        <td className="py-5">{item.goal_num}</td>
                        <td className="py-5">NT${item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* button */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmReserveList
