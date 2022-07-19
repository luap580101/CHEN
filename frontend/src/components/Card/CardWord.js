import React from 'react'

const CardWord = () => {
  return (
    <>
      <div className="p-3 shadow-sm main-hover">
        <div className="d-flex justify-content-between">
          <h4>添好運</h4>
          <span class="cate badge rounded-pill bg-primary">港式</span>
        </div>
        <h6 className="fw-normal">目前人數:6人</h6>
        <h6 className="fw-normal mb-4">用餐時間:2022/06/17</h6>
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
    </>
  )
}

export default CardWord
