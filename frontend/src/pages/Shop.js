import React, { useState } from 'react'
import NavbarShop from '../components/Navbar/NavbarShop'
import Login from '../components/Shop/Login'
import Register from '../components/Shop/Register'

function Shop() {
  const [isShopLogin, setIsShopLogin] = useState(true)
  return (
    <>
      <NavbarShop />
      {isShopLogin ? (
        <Login isShopLogin={isShopLogin} setIsShopLogin={setIsShopLogin} />
      ) : (
        <Register isShopLogin={isShopLogin} setIsShopLogin={setIsShopLogin} />
      )}
    </>
  )
}

export default Shop
