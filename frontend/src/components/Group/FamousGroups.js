import React from 'react'
import Card from '../Card/Card'
import { API_URL, IMAGE_URL } from '../../utils/config'

import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
//左右按鈕
function FamousGroups(props) {
  const cardSlider = [1, 2, 3, 4, 5, 6, 7, 8]
  const slideLeft = () => {
    let slider = document.querySelector('.slider')
    slider.scrollLeft = slider.scrollLeft - 500
  }
  const slideRight = () => {
    let slider = document.querySelector('.slider')
    slider.scrollLeft = slider.scrollLeft + 500
  }

  return (
    <>
      <div className="w-100 slider-container d-flex justify-content-between align-items-center">
        <MdChevronLeft
          className="slider-icon left bg-info"
          size={40}
          onClick={slideLeft}
        />
        <div className="slider">
          <div className="d-inline-block p-4">
            <div className="little-card shadow-sm bg-white rounded main-hover">
              <img
                className="w-100 h-50 rounded-top"
                src={`${IMAGE_URL}/shopImg/DinTaiFung.jpg`}
                alt=""
              />
              <div className="p-3">
                <div className="d-flex justify-content-between">
                  <h4>鼎泰豐</h4>
                  <span class="badge rounded-pill bg-primary">港式</span>
                </div>
                <h6 className="fw-normal">目前人數:20人</h6>
                <h6 className="fw-normal mb-4">用餐時間:2022/07/17</h6>
                <div class="progress">
                  <div
                    class="progress-bar progress-bar-striped bg-danger"
                    role="progressbar"
                    style={{ width: '120%' }}
                    aria-valuenow="10"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-inline-block p-4">
            <div className="little-card shadow-sm bg-white rounded main-hover">
              <img
                className="w-100 h-50 rounded-top"
                src={`${IMAGE_URL}/shopImg/Harbour.jpg`}
                alt=""
              />
              <div className="p-3">
                <div className="d-flex justify-content-between">
                  <h4>鼎泰豐</h4>
                  <span class="badge rounded-pill bg-primary">吃到飽</span>
                </div>
                <h6 className="fw-normal">目前人數:22人</h6>
                <h6 className="fw-normal mb-4">用餐時間:2022/07/23</h6>
                <div class="progress">
                  <div
                    class="progress-bar progress-bar-striped bg-danger"
                    role="progressbar"
                    style={{ width: '120%' }}
                    aria-valuenow="10"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-inline-block p-4">
            <div className="little-card shadow-sm bg-white rounded main-hover">
              <img
                className="w-100 h-50 rounded-top"
                src={`${IMAGE_URL}/shopImg/Kangyaolife.jpg`}
                alt=""
              />
              <div className="p-3">
                <div className="d-flex justify-content-between">
                  <h4>陶板屋</h4>
                  <span class="badge rounded-pill bg-primary">吃到飽</span>
                </div>
                <h6 className="fw-normal">目前人數:15人</h6>
                <h6 className="fw-normal mb-4">用餐時間:2022/08/20</h6>
                <div class="progress">
                  <div
                    class="progress-bar progress-bar-striped bg-danger"
                    role="progressbar"
                    style={{ width: '120%' }}
                    aria-valuenow="10"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-inline-block p-4">
            <div className="little-card shadow-sm bg-white rounded main-hover">
              <img
                className="w-100 h-50 rounded-top"
                src={`${IMAGE_URL}/shopImg/Pinnada.jpg`}
                alt=""
              />
              <div className="p-3">
                <div className="d-flex justify-content-between">
                  <h4>品田牧場</h4>
                  <span class="badge rounded-pill bg-primary">日式</span>
                </div>
                <h6 className="fw-normal">目前人數:24人</h6>
                <h6 className="fw-normal mb-4">用餐時間:2022/07/28</h6>
                <div class="progress">
                  <div
                    class="progress-bar progress-bar-striped bg-danger"
                    role="progressbar"
                    style={{ width: '120%' }}
                    aria-valuenow="10"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-inline-block p-4">
            <div className="little-card shadow-sm bg-white rounded main-hover">
              <img
                className="w-100 h-50 rounded-top"
                src={`${IMAGE_URL}/shopImg/McDonald.jpg`}
                alt=""
              />
              <div className="p-3">
                <div className="d-flex justify-content-between">
                  <h4>麥當勞</h4>
                  <span class="badge rounded-pill bg-primary">美式</span>
                </div>
                <h6 className="fw-normal">目前人數:19人</h6>
                <h6 className="fw-normal mb-4">用餐時間:2022/07/18</h6>
                <div class="progress">
                  <div
                    class="progress-bar progress-bar-striped bg-danger"
                    role="progressbar"
                    style={{ width: '120%' }}
                    aria-valuenow="10"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-inline-block p-4">
            <div className="little-card shadow-sm bg-white rounded main-hover">
              <img
                className="w-100 h-50 rounded-top"
                src={`${IMAGE_URL}/shopImg/2floor.jpg`}
                alt=""
              />
              <div className="p-3">
                <div className="d-flex justify-content-between">
                  <h4>貳樓</h4>
                  <span class="badge rounded-pill bg-primary">咖啡廳</span>
                </div>
                <h6 className="fw-normal">目前人數:15人</h6>
                <h6 className="fw-normal mb-4">用餐時間:2022/07/18</h6>
                <div class="progress">
                  <div
                    class="progress-bar progress-bar-striped bg-danger"
                    role="progressbar"
                    style={{ width: '120%' }}
                    aria-valuenow="10"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MdChevronRight
          className="slider-icon right bg-info"
          size={40}
          onClick={slideRight}
        />
      </div>
      {/* <div className="w-100 h-100 famous-groups d-flex justify-content-center align-items-center"></div> */}
    </>
  )
}

export default FamousGroups
