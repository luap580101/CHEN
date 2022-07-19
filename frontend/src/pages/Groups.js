import React from 'react'
import banner01 from '../image/groups/banner01.jpg'
import banner02 from '../image/groups/banner02.jpg'
import banner04 from '../image/groups/banner04.jpg'
import FamousGroups from '../components/Group/FamousGroups'
import Recommend from '../components/Group/Recommend'
import GroupPages from '../components/Group/GroupPages'
import Carousel from 'react-bootstrap/Carousel'
import { Link } from 'react-router-dom'

function Groups() {
  return (
    <>
      {/* 輪播banner */}
      <Carousel className="mb-5">
        <Carousel.Item>
          <Link to="/login">
            <img className="d-block w-100" src={banner01} alt="First slide" />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={banner02} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={banner04} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
      {/* 熱門開團 */}
      <div className="container groups mb-6">
        <h3 className=" titleH3 ps-4">熱門開團</h3>
        <FamousGroups />
      </div>
      {/* 開團頁面*/}
      <div className="container-fluid mb-6 groups">
        <GroupPages />
      </div>
      {/* 為你推薦 */}
      <div className="container groups mb-6">
        <h3 className="ps-4">為你推薦</h3>
        <Recommend />
      </div>
    </>
  )
}

export default Groups
