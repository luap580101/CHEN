import React, { useState } from 'react'
import Profile from '../components/MemberProfile/Profile'
import { Badge } from 'react-bootstrap'
import UpdateProfile from '../components/MemberProfile/UpdateProfile'
import MyBooking from '../components/MemberProfile/MyBooking/MyBooking'
import Coupon from '../components/MemberProfile/Coupon/Coupon'
import Favorite from '../components/MemberProfile/Favorite'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'
import { useEffect } from 'react'
import { useActivePanel } from '../context/ActivePanel'
import { CouponContext } from '../context/CouponContext'
import { FavoriteContext } from '../context/FavoriteList'

const MemberCenter = () => {
  const { active, setActive } = useActivePanel()
  useEffect(() => {}, [active])
  const [availCoupon, setAvailCoupon] = useState([
    {
      id: '',
      reason: '',
      price: '',
      used: '',
    },
  ])
  const [getCoupon, setGetCoupon] = useState(false)
  const [countCoupon, setCountCoupon] = useState('')
  const [countFavorite, setCountFavorite] = useState('')
  useEffect(() => {}, [countFavorite])
  return (
    <>
      <div className="container mt-5">
        <CouponContext.Provider
          value={{
            availCoupon,
            setAvailCoupon,
            getCoupon,
            setGetCoupon,
            countCoupon,
            setCountCoupon,
          }}
        >
          <FavoriteContext.Provider
            value={{
              countFavorite,
              setCountFavorite,
            }}
          >
            <Tab.Container
              id="left-tabs-example"
              activeKey={active}
              onSelect={(e) => {
                setActive(e)
              }}
            >
              <Row>
                <Col sm={3} className="text-center h5 me-5">
                  <Nav variant="pills" className="flex-column gap-3">
                    <Nav.Item>
                      <Nav.Link eventKey="first">基本資料設定</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">我的訂單</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">我的優惠券</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="fourth">
                        收藏店家
                        <Badge className="ms-3" bg="danger" pill>
                          {countFavorite}
                        </Badge>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={8}>
                  <Tab.Content>
                    <Tab.Pane eventKey="basic">
                      <Profile />
                    </Tab.Pane>
                    <Tab.Pane eventKey="first">
                      <UpdateProfile />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <MyBooking />
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <Coupon />
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                      <Favorite />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </FavoriteContext.Provider>
        </CouponContext.Provider>
      </div>
    </>
  )
}

export default MemberCenter
