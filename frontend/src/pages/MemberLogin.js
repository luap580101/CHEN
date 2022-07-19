import React, { useState } from 'react'
import Login from '../components/Login/Login'
import Register from '../components/Login/Register'
import share from '../image/login/share.mp4'
const MemberLogin = () => {
  const [isLoginPage, setIsLoginPage] = useState(true)

  return (
    <>
      <div className="video-box">
        <div className="container top-50 start-50 translate-middle">
          {isLoginPage ? (
            <Login isLoginPage={isLoginPage} setIsLoginPage={setIsLoginPage} />
          ) : (
            <Register
              isLoginPage={isLoginPage}
              setIsLoginPage={setIsLoginPage}
            />
          )}
        </div>
        <div className="over-lay" />
        <video
          className="video"
          autoPlay="autoplay"
          muted="muted"
          loop="loop"
          playsInline
        >
          <source src={share} type="video/mp4" />
        </video>
      </div>
    </>
  )
}

export default MemberLogin
