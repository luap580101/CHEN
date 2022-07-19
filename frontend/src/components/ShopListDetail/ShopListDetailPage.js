import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Nowgroups from './Nowgroups'
import Historygroups from './Historygroups'

function ShopListDetailPage() {
  return (
    <>
      <div className="container">
        <div className="row">
          <Tabs
            id="controlled-tab-example"
            defaultActiveKey="now"
            className="mb-3 h5"
          >
            <Tab eventKey="now" title="現正開團">
              <Nowgroups />
            </Tab>
            <Tab eventKey="history" title="歷史開團">
              <Historygroups />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default ShopListDetailPage
