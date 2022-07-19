import React from 'react'
import { Link } from 'react-router-dom'
import Pagination from 'react-bootstrap/Pagination'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL, IMAGE_URL } from '../utils/config'
import Heart from '../components/ShopList/Heart'

function ShopList() {
  const [shops, setShops] = useState([])
  //目前第幾頁
  const [page, setPage] = useState(1)
  //總筆數
  const [lastPage, setLastPage] = useState(1)
  //資料
  useEffect(() => {
    let getShop = async () => {
      let response = await axios.get(`${API_URL}/shoplist`, {
        params: { page: page },
      })
      setShops(response.data.data)
      setLastPage(response.data.pagination.lastPage)
    }
    getShop()
  }, [page])

  const getPages = () => {
    let pages = []
    for (let i = 1; i <= lastPage; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === page}
          onClick={(e) => {
            setPage(i)
          }}
        >
          {i}
        </Pagination.Item>
      )
    }
    return pages
  }

  return (
    <>
      <div className="ShopList container mt-4 mb-5 d-flex justicy-content-center flex-wrap">
        {shops.map((v, i) => {
          return (
            <div key={v.id} className="hover01 ps-6 mt-6 ">
              <div className="zoom-in">
                <Link to={`/shopDetail/${v.id}`}>
                  <div className="piczoom">
                    <img
                      className="w-100"
                      src={`${IMAGE_URL}${shops[i].img}`}
                      alt=""
                    />
                  </div>
                </Link>
                <div className=" d-flex mt-3">
                  <h5 className="me-auto">{v.name}</h5>
                  <Heart className="ms-auto" shopId={v.id} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Pagination className="mx-auto mt-4 ps-6 mb-5">{getPages()}</Pagination>
    </>
  )
}

export default ShopList
