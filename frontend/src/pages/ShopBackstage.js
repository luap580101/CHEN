import React from 'react'
import SideBackstage from '../components/ShopBackstage/SideBackstage'
// import Opengroup from '../components/ShopBackstage/Opengroup'
import NavbarShopbackstage from '../components/Navbar/NavbarShopbackstage'
import axios from 'axios'
import { API_URL } from '../utils/config'
import { useState, useEffect } from 'react'
const ShopBackstage = () => {
  const [shopBackstage, setShopBackstage] = useState('')
  useEffect(() => {
    let getShopBackstage = async () => {
      let response = await axios.get(`${API_URL}/shopBackstage/`, {
        withCredentials: true,
      })
      console.log(response.data)
      setShopBackstage(response.data)
    }
    getShopBackstage()
  }, [])
  return (
    <>
      <NavbarShopbackstage shopBackstage={shopBackstage} />
      <div className="d-flex">
        <SideBackstage shopBackstage={shopBackstage}/>
        {/* <Opengroup /> */}
      </div>
    </>
  )
}

export default ShopBackstage
