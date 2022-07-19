import React from 'react'
import { useState, useEffect } from 'react'
import { API_URL, IMAGE_URL } from '../../utils/config'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Nowgroups() {
  const [data, setData] = useState([])
  const { shopId } = useParams()

  useEffect(() => {
    let getDetail = async () => {
      let response = await axios.get(`${API_URL}/shoplist/nowopen/${shopId}`)
      setData(response.data)
    }
    getDetail()
  }, [])
  return (
    <>
      {data.map((v, i) => {
        let percent = Math.round((v.now_num / v.goal_num) * 100)
        return (
          <Link to={`/groupDetail/${v.id}`}>
            <div className="p-3 shadow-sm mb-5 nowgroups_card">
              <div className="d-flex">
                <h4 className="fw-normal">目前人數:{v.now_num}人</h4>
                <h4 className="ms-auto text-danger">參團價:{v.price}</h4>
              </div>
              <h6 className="fw-normal mb-4">用餐時間:{v.eating_date}</h6>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped"
                  role="progressbar"
                  style={{ width: `${percent}%` }}
                  aria-valuenow="10"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="d-flex justify-content-between">
                <p className="progress-text mt-1">{v.end_time}截止</p>
              </div>
            </div>
          </Link>
        )
      })}
    </>
  )
}

export default Nowgroups
