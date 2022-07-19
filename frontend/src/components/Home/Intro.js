import React from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useState, useEffect } from 'react'
import fliterpic from '../../image/home/fliterpic.png'

function Intro() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    })
  }, [])
  return (
    <>
      <div className="intro mt-8">
        <div class="container d-flex ">
          <div className="row">
            <div className="col-6">
              <img className="img-fluid" src={fliterpic} alt="" />
            </div>
            <div className="col-6">
              <div className="contaner">
                <div className="row">
                  <div className="col-6 mt-5" data-aos="fade-right">
                    <div className="join">
                      <a class="card1" href="/login">
                        <h3>加入會員</h3>
                        <h6>
                          會員參團系統，同樣在孤寂城市的人們一同在這短暫的用餐時光中逃離寂寞的喧囂
                        </h6>
                        <div class="go-corner" href="#">
                          <div class="go-arrow">→</div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-6 mt-9" data-aos="fade-left">
                    <div className="join">
                      <a class="card1" href="/shop">
                        <h3>加入店家</h3>
                        <h6>
                          透過平台的會員參團預約獲得更高的來客量，並做好食材與座位安排的管理
                        </h6>
                        <div class="go-corner" href="#">
                          <div class="go-arrow">→</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Intro
