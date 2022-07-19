import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLogin } from '../../context/LoginStatus'
import { useActivePanel } from '../../context/ActivePanel'

const NavbarDesktop = () => {
  const location = useLocation()
  const { isLogin } = useLogin()
  const { setActive } = useActivePanel()

  if (location.pathname === '/shop') return <></>
  if (location.pathname === '/shop/Register') return <></>
  if (location.pathname === '/shop/Login') return <></>
  if (location.pathname === '/shopBackstage') return <></>

  return (
    <>
      <header className="sticky-top shadow">
        <div className="head d-flex justify-content-around align-items-center py-3 ">
          <div className="logo">
            <img src={require('../../image/navbar/logo.png')} alt="" />
          </div>

          <div className="navBar">
            <ul className="d-flex text-nowrap">
              <li>
                <Link to="">
                  <h5>首頁</h5>
                </Link>
              </li>
              <li>
                <Link to="/groups">
                  <h5>立即參團</h5>
                </Link>
              </li>
              <li>
                <Link to="/shopList">
                  <h5>店家列表</h5>
                </Link>
              </li>
              <li>
                <Link to="/shop">
                  <h5>店家登入/註冊</h5>
                </Link>
              </li>
            </ul>
          </div>

          <div className="icon">
            <Link to="/ShoppingCart">
              <img src={require('../../image/navbar/shop.png')} alt="" />
            </Link>
            {isLogin ? (
              <Link
                to="/memberCenter"
                onClick={() => {
                  setActive('basic')
                }}
              >
                <img src={require('../../image/navbar/login.png')} alt="" />
              </Link>
            ) : (
              <Link to="/login">
                <img src={require('../../image/navbar/login.png')} alt="" />
              </Link>
            )}
          </div>
        </div>
        {/* <div className="header-space"></div> */}
      </header>
    </>
  )
}

export default NavbarDesktop
