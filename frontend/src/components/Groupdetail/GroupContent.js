import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../utils/config'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

function GroupContent() {
  //網址取得id
  const { groupId } = useParams()
  const [dishes, setDishes] = useState([])
  const [list, setList] = useState([])

  useEffect(() => {
    async function dish() {
      let response = await axios.get(
        `${API_URL}/group/groupdish?groupId=${groupId}`
      )

      setDishes(response.data.result[0])
    }
    dish()
    async function grouplist() {
      let response = await axios.get(
        `${API_URL}/group/grouplist?groupId=${groupId}`
      )
      setList(response.data.result[0][0])
    }
    grouplist()
  }, [])

  function getEatTimeString() {
    if (list.eating_date === 1) {
      return '中餐12:00'
    } else if (list.eating_date === 2) {
      return '下午茶15:00'
    } else {
      return '晚餐18:00'
    }
  }
  return (
    <>
      <div className="mx-6">
        <div className="container mt-5 content-info ps-4 mb-5">
          <div>
            <h4 className="text-info">開團目標</h4>
            <h5 className="fw-normal">
              {list.eating_date} {list.goal_num}人開團成功
            </h5>
          </div>
        </div>
        {/* 開團內容 */}
        <div className="continer ">
          <div className="row ">
            <div className="col-5 bg-secondary ">
              <div className="mt-4">
                <div className="Gtitle d-flex align-items-center ">
                  <img
                    src={require('../../image/groupdetail/icon7.png')}
                    alt=""
                  />
                  <h5 className="ms-2 mt-2">目前人數</h5>
                  <h4 className="ms-4 mt-2">{list.now_num}人</h4>
                </div>
                <div className="mt-4">
                  <div className="Gtitle d-flex align-items-center ">
                    <img
                      src={require('../../image/groupdetail/icon5.png')}
                      alt=""
                    />
                    <h5 className="ms-2 mt-2">用餐日期</h5>
                    <h4 className="ms-4 mt-2">{list.eating_date}</h4>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="Gtitle d-flex align-items-center ">
                    <img
                      src={require('../../image/groupdetail/icon6.png')}
                      alt=""
                    />
                    <h5 className="ms-2 mt-2">用餐時間</h5>
                    <h4 className="ms-4">{getEatTimeString()}</h4>
                  </div>
                </div>
                <div className="mt-4 mb-4">
                  <div className="Gtitle d-flex align-items-center ">
                    <img
                      src={require('../../image/groupdetail/icon4.png')}
                      alt=""
                    />
                    <h5 className="ms-2 mt-2">參團價格</h5>
                    <h4 className="ms-4">${list.price}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 dish-set py-4 ps-4">
              <h5>菜色(每人)</h5>
              <div
                className="d-flex flex-column flex-wrap"
                style={{ height: '200px' }}
              >
                {dishes.map((item, i) => (
                  <span className="my-2">{dishes[i].name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GroupContent
