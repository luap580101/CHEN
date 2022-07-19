import React from 'react'
import { Link } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'

function NavbarShopbackstage(props) {
  return (
    <>
      <header className="sticky-top shadow bg-white ps-7 pe-5">
        <div className="head d-flex justify-content-start align-items-center py-3 ps-4 container-fluid">
          <div className="logo">
            <Link to="/">
              <img src={require('../../image/navbar/logo.png')} alt="" />
            </Link>
          </div>
          <h4 className="ms-4 mt-3">店家後台</h4>
          <div className="d-flex mt-3 ms-auto">
            <h4 className="text-primary me-4">{props.shopBackstage.name}</h4>
            <h4 className="me-4">歡迎回來</h4>
            <Link to="/shop" onClick={() => localStorage.removeItem('shopID')}>
              <FiLogOut className="text-primary ms-auto me-4 mt-1" size={25} />
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}

export default NavbarShopbackstage
