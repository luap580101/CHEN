import React from 'react'
import { useHistory } from 'react-router-dom'

const Header = () => {
  const history = useHistory()

  return (
    <>
      <div className="header container mt-3">
        <div className="pb-3">
          <ul className="d-flex">
            <li>
              <a
                style={{ cursor: 'pointer' }}
                className="text-primary"
                onClick={() => {
                  history.push('/')
                }}
              >
                首頁
              </a>
            </li>
            <span className="mx-1">|</span>
            <li>
              <a
                style={{ cursor: 'pointer' }}
                className="text-primary"
                onClick={() => {
                  history.push('/memberCenter')
                }}
              >
                會員
              </a>
            </li>
            <span className="mx-1">|</span>
            <li>
              <a
                style={{ cursor: 'pointer' }}
                className="text-primary"
                onClick={() => {
                  history.push('/ShoppingCart')
                }}
              >
                購物車
              </a>
            </li>
          </ul>
        </div>

        <div className="header-title border-bottom border-2 border-primary d-flex pb-3 mb-5">
          <img src={require('../../image/header/dish.png')} alt="" />
          <h3 className="mx-1">購物車</h3>
        </div>
      </div>
    </>
  )
}

export default Header
