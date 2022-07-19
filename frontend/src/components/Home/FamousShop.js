import React from 'react'
// import CardWord from '../../image/home/logo/Kangyaolife'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
//左右按鈕
function FamousShop(props) {
  const cardWordSlider = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const slideHomeLeft = () => {
    let slider = document.querySelector('.sliderHome')
    slider.scrollLeft = slider.scrollLeft - 500
  }
  const slideHomeRight = () => {
    let slider = document.querySelector('.sliderHome')
    slider.scrollLeft = slider.scrollLeft + 500
  }

  return (
    <>
      <div className="w-100 slider-container d-flex justify-content-between align-items-center">
        <MdChevronLeft
          className="slider-icon left bg-info"
          size={40}
          onClick={slideHomeLeft}
        />
        <div className="sliderHome d-flex">
          <img
            className="pe-3 img-fluid"
            src={require('../../image/home/logo/Timhowan.jpg')}
            alt=""
          />

          <img
            className="pe-3"
            src={require('../../image/home/logo/siammore.jpg')}
            alt=""
          />
          <img
            className="pe-3"
            src={require('../../image/home/logo/kfc.jpg')}
            alt=""
          />
          <img
            className="pe-3"
            src={require('../../image/home/logo/ippudo.jpg')}
            alt=""
          />
          <img
            className="pe-3"
            src={require('../../image/home/logo/Kangyaolife.jpg')}
            alt=""
          />
        </div>
        <MdChevronRight
          className="slider-icon right bg-info"
          size={40}
          onClick={slideHomeRight}
        />
      </div>
      {/* <div className="w-100 h-100 famous-groups d-flex justify-content-center align-items-center"></div> */}
    </>
  )
}

export default FamousShop
