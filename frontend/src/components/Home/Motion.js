import React from 'react'
import bg from '../../image/home/bg.png'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useState, useEffect } from 'react'
import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  MoveOut,
  Sticky,
} from 'react-scroll-motion'

function Motion() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    })
  }, [])
  return (
    <>
      <div className="wrapper">
        <div className="container-fluid mb-8 bg-info header d-flex justify-content-center align-items-center">
          <img className="img-fluid foreground" src={bg} alt="" />
          <ScrollContainer>
            <ScrollPage page={0}>
              <Animator animation={batch(Fade(), Sticky(), MoveOut(0, 300))}>
                <h1 className="title ">Unii 結交新朋友</h1>
              </Animator>
            </ScrollPage>
          </ScrollContainer>
        </div>
      </div>
    </>
  )
}

export default Motion
