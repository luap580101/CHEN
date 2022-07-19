import React from 'react'
import join from '../../image/home/join.png'

function Join() {
  return (
    <>
      <div className="container clickme mt-9">
        <div className="row">
          <div className="col-6 d-flex flex-column justicy-content-center align-items-md-center mt-9 ">
            <h2 className="text-info text-center">一起吃飯嗎?</h2>
            <a className="btn-lg btn-primary" href='/groups'>
              <h2 className="text-info">參團吧</h2>
            </a>
          </div>
          <div className="col-6">
            <img className="img-fluid" src={join} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Join
