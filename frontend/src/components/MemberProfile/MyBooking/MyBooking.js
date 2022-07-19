import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import '../../../styles/_myBooking.scss'
import AllBookingCard from './AllBookingCard'
import ComBookingCard from './ComBookingCard'
import FailBookingCard from './FailBookingCard'

const MyBooking = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <Tabs
            id="controlled-tab-example"
            defaultActiveKey="all"
            className="mb-3 h5"
          >
            <Tab eventKey="all" title="全部開團">
              <AllBookingCard />
            </Tab>
            <Tab eventKey="established" title="已成團">
              <ComBookingCard />
            </Tab>
            <Tab eventKey="notEstablished" title="未成團">
              <FailBookingCard />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default MyBooking
