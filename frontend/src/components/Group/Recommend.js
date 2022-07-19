import React from 'react'
import CardWord from '../Card/CardWord'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
//左右按鈕
function Recommend(props) {
  const cardWordSlider = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const slideWLeft = () => {
    let slider = document.querySelector('.sliderw')
    slider.scrollLeft = slider.scrollLeft - 500
  }
  const slideWRight = () => {
    let slider = document.querySelector('.sliderw')
    slider.scrollLeft = slider.scrollLeft + 500
  }

  return (
    <>
      <div className="w-100 slider-container d-flex justify-content-between align-items-center">
        <MdChevronLeft
          className="slider-icon left bg-info"
          size={40}
          onClick={slideWLeft}
        />
        <div className="sliderw">
          <div className="d-inline-block p-4">
            <div className="p-3 shadow-sm main-hover">
              <div className="d-flex justify-content-between">
                <h4>一風堂</h4>
                <span class="cate badge rounded-pill bg-primary">日式</span>
              </div>
              <h6 className="fw-normal">目前人數:9人</h6>
              <h6 className="fw-normal mb-4">用餐時間:2022/07/17</h6>
              <div class="progress">
                <div
                  class="progress-bar progress-bar-striped"
                  role="progressbar"
                  style={{ width: '70%' }}
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
          <div className="d-inline-block p-4">
            <div className="p-3 shadow-sm main-hover">
              <div className="d-flex justify-content-between">
                <h4>添好運</h4>
                <span class="cate badge rounded-pill bg-primary">港式</span>
              </div>
              <h6 className="fw-normal">目前人數:6人</h6>
              <h6 className="fw-normal mb-4">用餐時間:2022/07/12</h6>
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
                <p className="progress-text mt-1">剩下9天</p>
              </div>
            </div>
          </div>
          <div className="d-inline-block p-4">
            <div className="p-3 shadow-sm main-hover">
              <div className="d-flex justify-content-between">
                <h4>漢來海港</h4>
                <span class="cate badge rounded-pill bg-primary">吃到飽</span>
              </div>
              <h6 className="fw-normal">目前人數:12人</h6>
              <h6 className="fw-normal mb-4">用餐時間:2022/08/11</h6>
              <div class="progress">
                <div
                  class="progress-bar progress-bar-striped"
                  role="progressbar"
                  style={{ width: '90%' }}
                  aria-valuenow="10"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="d-flex justify-content-between">
                <p className="progress-text mt-1">剩下12天</p>
              </div>
            </div>
          </div>
          <div className="d-inline-block p-4">
            <div className="p-3 shadow-sm main-hover">
              <div className="d-flex justify-content-between">
                <h4>藝奇</h4>
                <span class="cate badge rounded-pill bg-primary">日式</span>
              </div>
              <h6 className="fw-normal">目前人數:3人</h6>
              <h6 className="fw-normal mb-4">用餐時間:2022/08/01</h6>
              <div class="progress">
                <div
                  class="progress-bar progress-bar-striped"
                  role="progressbar"
                  style={{ width: '10%' }}
                  aria-valuenow="10"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="d-flex justify-content-between">
                <p className="progress-text mt-1">剩下15天</p>
              </div>
            </div>
          </div>
          <div className="d-inline-block p-4">
            <div className="p-3 shadow-sm main-hover">
              <div className="d-flex justify-content-between">
                <h4>夏野豆行</h4>
                <span class="cate badge rounded-pill bg-primary">咖啡廳</span>
              </div>
              <h6 className="fw-normal">目前人數:4人</h6>
              <h6 className="fw-normal mb-4">用餐時間:2022/08/01</h6>
              <div class="progress">
                <div
                  class="progress-bar progress-bar-striped"
                  role="progressbar"
                  style={{ width: '10%' }}
                  aria-valuenow="10"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="d-flex justify-content-between">
                <p className="progress-text mt-1">剩下20天</p>
              </div>
            </div>
          </div>
          <div className="d-inline-block p-4">
            <div className="p-3 shadow-sm main-hover">
              <div className="d-flex justify-content-between">
                <h4>拾一鍋</h4>
                <span class="cate badge rounded-pill bg-primary">火鍋</span>
              </div>
              <h6 className="fw-normal">目前人數:2人</h6>
              <h6 className="fw-normal mb-4">用餐時間:2022/07/31</h6>
              <div class="progress">
                <div
                  class="progress-bar progress-bar-striped"
                  role="progressbar"
                  style={{ width: '20%' }}
                  aria-valuenow="10"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="d-flex justify-content-between">
                <p className="progress-text mt-1">剩下31天</p>
              </div>
            </div>
          </div>
          <div className="d-inline-block p-4">
            <div className="p-3 shadow-sm main-hover">
              <div className="d-flex justify-content-between">
                <h4>藍象廷</h4>
                <span class="cate badge rounded-pill bg-primary">火鍋</span>
              </div>
              <h6 className="fw-normal">目前人數:4人</h6>
              <h6 className="fw-normal mb-4">用餐時間:2022/08/22</h6>
              <div class="progress">
                <div
                  class="progress-bar progress-bar-striped"
                  role="progressbar"
                  style={{ width: '70%' }}
                  aria-valuenow="10"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="d-flex justify-content-between">
                <p className="progress-text mt-1">剩下40天</p>
              </div>
            </div>
          </div>
        </div>
        <MdChevronRight
          className="slider-icon right bg-info"
          size={40}
          onClick={slideWRight}
        />
      </div>
      {/* <div className="w-100 h-100 famous-groups d-flex justify-content-center align-items-center"></div> */}
    </>
  )
}

export default Recommend
