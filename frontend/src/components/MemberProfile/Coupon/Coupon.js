import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import '../../../styles/_coupon.scss'
import MyCoupon from './MyCoupon'
import AvailCoupon from './AvailCoupon'


const Coupon = () => {

  return (
    <Tabs
      defaultActiveKey="MyCoupon"
      id="uncontrolled-tab-example"
      className="mb-3 h5"
    >
      <Tab eventKey="AvailCoupon" title="可領取">
        <AvailCoupon />
      </Tab>
      <Tab eventKey="MyCoupon" title="可使用">
        <MyCoupon />
      </Tab>
    </Tabs>
  )
}

export default Coupon
