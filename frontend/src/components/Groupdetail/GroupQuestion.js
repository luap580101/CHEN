import React from 'react'
import { useState } from 'react'
// import { IconName } from "react-icons/ai";
import { AiOutlineNotification } from 'react-icons/ai'
import Accordion from 'react-bootstrap/Accordion'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'
import Card from 'react-bootstrap/Card'

function GroupQuestion() {
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('totally custom!')
    )

    return (
      <button
        type="button"
        className="w-100 d-flex align-items-center bg-white mt-3"
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    )
  }
  return (
    <>
      <div className="mx-6 mt-5">
        <h4 className="mb-3">常見問題</h4>

        <Accordion defaultActiveKey="0">
          <Card style={{ border: 'none' }}>
            <Card.Header className="bg-white border-bottom-0">
              <CustomToggle eventKey="0">
                <AiOutlineNotification className="ms-3 " />

                <span className="ms-3 p-2">如何參團？</span>
              </CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body
                className="bg-secondary rounded mt-2"
                style={{ marginLeft: '70px' }}
              >
                請需註冊登入會員後，即可選擇現正開團的店家團單。
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card style={{ border: 'none' }}>
            <Card.Header className="bg-white border-bottom-0">
              <CustomToggle eventKey="1">
                <AiOutlineNotification className="ms-3 " />

                <span className="ms-3 p-2">如何查詢團單狀況？</span>
              </CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body
                className="bg-secondary rounded mt-2"
                style={{ marginLeft: '70px' }}
              >
                登入會員後，「我的訂單」即可查看您參加團單的狀態及記錄。
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card style={{ border: 'none' }}>
            <Card.Header className="bg-white border-bottom-0">
              <CustomToggle eventKey="3">
                <AiOutlineNotification className="ms-3 " />

                <span className="ms-3 p-2">何種情況才會出現付款呢？</span>
              </CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="3">
              <Card.Body
                className="bg-secondary rounded mt-2"
                style={{ marginLeft: '70px' }}
              >
                當報名解止前，目標人數已達標，在會員中心的我的訂單中會自動更換成付款按鈕，結帳後即成立。
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card style={{ border: 'none' }}>
            <Card.Header className="bg-white border-bottom-0">
              <CustomToggle eventKey="2">
                <AiOutlineNotification className="ms-3 " />

                <span className="ms-3 p-2">請問消費可以刷卡嗎？</span>
              </CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body
                className="bg-secondary rounded mt-2"
                style={{ marginLeft: '70px' }}
              >
                皆有提供刷卡服務。
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card style={{ border: 'none' }}>
            <Card.Header className="bg-white border-bottom-0">
              <CustomToggle eventKey="4">
                <AiOutlineNotification className="ms-3 " />

                <span className="ms-3 p-2">若會員忘記密碼怎麼辦？</span>
              </CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="4">
              <Card.Body
                className="bg-secondary rounded mt-2"
                style={{ marginLeft: '70px' }}
              >
                登入會員畫面中，可點擊忘記密碼按鈕，填寫完電子電子信箱後，可至信箱收取信件並更改密碼。
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </>
  )
}

export default GroupQuestion
