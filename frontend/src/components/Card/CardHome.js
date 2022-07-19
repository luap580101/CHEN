import React from 'react'

function CardHome() {
  return (
    <>
      <div className=" bg-white shadow-sm mb-4">
        <div className="row">
          <div className="col-5 ">
            <img
              className="img-fluid h-100"
              src={require('../../image/home/logo/Kangyaolife.jpg')}
              alt=""
            />
          </div>
          <div className="col-6 ms-2 mt-2 d-flex ">
            <div className="card-body">
              <div className="d-flex align-items-center w-100">
                <h4 className="">陶板屋</h4>
              </div>
              <div>
                <h6 className="fw-normal">用餐時間:2022/06/17</h6>
                <h6 className="fw-normal">目前人數:5人</h6>
                <div class="progress">
                  <div
                    class="progress-bar progress-bar-striped"
                    role="progressbar"
                    style={{ width: '30%' }}
                    aria-valuenow="10"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="progress-text mt-1">剩下3天</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardHome
