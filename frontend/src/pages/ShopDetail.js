import React from 'react'
import ShopListDetailPage from '../components/ShopListDetail/ShopListDetailPage'
import { useState, useEffect } from 'react'
import { API_URL, IMAGE_URL } from '../utils/config'
import { useParams } from 'react-router-dom'

import axios from 'axios'

function ShopDetail() {
  const [data, setData] = useState([])
  const { shopId } = useParams()

  useEffect(() => {
    let getDetail = async () => {
      let response = await axios.get(`${API_URL}/shoplist/${shopId}`)
      setData(response.data)
    }
    getDetail()
  }, [])
  // console.log('資料', data[0].id)
  return (
    <>
      {data.map((v, i) => {
        return (
          <div key={v.id} className="container mt-7 mb-6 ">
            <div className="row d-flex">
              <div className="col-7">
                <div className="shopdetail container d-flex justify-content-center">
                  <div className="first-section ">
                    <div className="row">
                      <div className="col-4">
                        <div className="detailcover ">
                          <img
                            className="img-fulid w-80"
                            src={`${IMAGE_URL}${v.img}`}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col-8">
                        <h4 className="mt-4">{v.name}</h4>
                        <h5 className="mt-4 fw-normal">{v.address}</h5>
                        <h5 className="fw-normal">{v.phone}</h5>
                      </div>
                      <h5 className="mt-4 fw-normal">{v.description}</h5>
                    </div>
                    <a
                      className=" mt-5 btn btn-primary"
                      href="http://localhost:3000/shopList"
                    >
                      返回店家列表
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-5">
                <ShopListDetailPage />
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default ShopDetail
