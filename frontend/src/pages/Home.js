import React from 'react'
import CardHome from '../components/Card/CardHome'
import FamousShop from '../components/Home/FamousShop'
import Motion from '../components/Home/Motion'
import Intro from '../components/Home/Intro'
import Join from '../components/Home/Join'
import word01 from '../image/home/word01.png'
import word02 from '../image/home/word02.png'

function Home() {
  return (
    <>
      <div className="Home">
        <div className="container-fluid first ">
          <Motion />
        </div>
        <div>
          <h3 className="text-center mt-6" data-aos="fade-up">
            在每天的生活中增加一點人情味，<span>Unii 友你</span> 因此誕生
          </h3>
        </div>
        <div className="container-fluid mt-5 mb-2">
          <Intro />
        </div>
        <div>
          <h2 className="text-center mt-8 ms-5">
            <span>Unii 友你</span>為一揪團用餐平台
          </h2>
        </div>
        <div className="container">
          <div className="row d-flex">
            <div
              className="col-6 ms-8"
              data-aos="fade-left"
              data-aos-easing="linear"
              data-aos-duration="1500"
              data-aos-delay="500"
            >
              <img className="img-fluid ms-9 mt-4" src={word01} alt="" />
            </div>
            <div
              className="col-6"
              data-aos="fade-left"
              data-aos-easing="linear"
              data-aos-duration="1500"
              data-aos-delay="800"
            >
              <img className="img-fluid ms-9 mt-4" src={word02} alt="" />
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <Join />
        </div>
      </div>
    </>
  )
}

export default Home
