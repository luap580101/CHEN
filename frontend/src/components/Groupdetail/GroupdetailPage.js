import React from 'react'
import GroupContent from './GroupContent'
import GroupQuestion from './GroupQuestion'
import { Container, Row, Tabs, Tab } from 'react-bootstrap'

function GroupdetailPage() {
  return (
    <>
      <Container className="page">
        <Row className="justicy-content-center">
          <Tabs
            justify
            variant="pills"
            defaultActiveKey="tab-1"
            className="mb-1 p-0"
          >
            <Tab eventKey="tab-1" title="開團內容">
              <GroupContent />
            </Tab>
            <Tab eventKey="tab-2" title="常見問題">
              <GroupQuestion />
            </Tab>
          </Tabs>
        </Row>
      </Container>
    </>
  )
}

export default GroupdetailPage
