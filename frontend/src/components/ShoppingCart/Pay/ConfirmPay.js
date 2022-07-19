import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'
import { API_URL } from '../../../utils/config'
import axios from 'axios'
import Accordion from 'react-bootstrap/Accordion'

const ConfirmPay = (props) => {
  const { selectCou, selectPri } = props
  const payGroup = localStorage.getItem('payGroup')
  const userID = localStorage.getItem('userID')
  const [data, setData] = useState({})
  //存放抓到的selectCou的詳細資料
  const [detail, setDetail] = useState({})
  //信用卡
  const [card1, setCard1] = useState('xxxx')
  const [card2, setCard2] = useState('xxxx')
  const [card3, setCard3] = useState('xxxx')
  const [card4, setCard4] = useState('xxxx')
  const [cardDate, setCardDate] = useState('xx')
  const [cardTime, setCardTime] = useState('xx')
  const [cardSafe, setCardSafe] = useState('xxx')

  useEffect(() => {
    fetch(
      `${API_URL}/shoppingcart/paylist?payGroup=${payGroup}&userID=${userID}`,
      {
        method: 'GET',
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.result[0])
        //console.log(data)
      })
      .catch((e) => {
        /*發生錯誤時要做的事情*/
        console.log(e)
      })
  }, [])

  //抓選擇的selectCou去搜尋coupon資料
  useEffect(() => {
    getSelectedOption()
  }, [])

  async function getSelectedOption() {
    const res = await axios.get(
      `${API_URL}/shoppingCart/selectcou?couID=${selectCou}`
    )
    console.log('我要得到', res.data.result[0])
    setDetail(res.data.result[0])
  }

  function getEatTimeString() {
    if (data.eating_time === 1) {
      return '午餐12:00'
    } else if (data.eating_time === 2) {
      return '下午茶15:00'
    } else {
      return '晚餐18:00'
    }
  }
  function isEstablish() {
    if (data.established === 0) {
      return '未成團'
    } else {
      return '已成團'
    }
  }

  return (
    <>
      <div className=" container my-6">
        <div className="d-flex justify-content-center">
          <div className="w-75">
            <div className="w-75" style={{ marginLeft: '192px' }}>
              <img
                style={{ width: '500px' }}
                className="mb-5"
                src={require('../../../image/shoppingCart/icongroup05.png')}
                alt=""
              />
            </div>
            {/* List */}
            {/* dropdown */}
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>總計1件商品</Accordion.Header>
                {/* sale */}
                <div
                  className="bg-secondary p-4 w-100"
                  style={{ marginTop: '-10px' }}
                >
                  <div className="mb-4 w-100"></div>
                  <tr className="d-flex justify-content-around align-items-center mb-4 pb-4 pt-4">
                    <td>
                      <img
                        style={{ width: '90px' }}
                        src={require('../../../image/shoppingCart/dSquare.png')}
                        alt=""
                      />
                    </td>
                    <td>
                      <h6 className="fw-normal">{data.name}</h6>
                      <h6 className="fw-normal">
                        {data.eating_date} {getEatTimeString()}{' '}
                      </h6>
                    </td>
                    {/* 已成團 */}
                    <td>{isEstablish()}</td>
                    <td>NT${data.price}</td>
                  </tr>
                </div>
                <Accordion.Body className="p-0">
                  <div className="p-4" style={{ backgroundColor: '#FFE7A9' }}>
                    <div className="d-flex justify-content-between align-items-center border-bottom border-dark my-4 pb-4">
                      <h6 className="fw-normal">商品金額：</h6>
                      <h6 className="fw-normal">NT${data.price}</h6>
                    </div>

                    <div className="d-flex mb-2">
                      <img
                        style={({ width: '20px' }, { height: '20px' })}
                        src={require('../../../image/shoppingCart/sale.png')}
                        alt=""
                      />
                      <h6 className="ms-1">您所選擇的折價卷：</h6>
                    </div>

                    <div className="mb-3">
                      <div
                        className="w-100 h-25 bg-light text-start py-1 ps-3
                        "
                        style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
                      >
                        <span className="text-danger">{detail.reason}</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mb-3">
                      <h6 className="fw-normal">NT$-{detail.price}</h6>
                    </div>
                    <div className="d-flex justify-content-between align-items-center border-top border-dark pt-4 mt-2">
                      <h6 className="fw-normal">總計：</h6>
                      <h6 className="fw-normal">NT${selectPri} </h6>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            {/* information */}
            <div className="bg-secondary" style={{ marginTop: '20px' }}>
              <h5 className="p-3">帳單資訊：</h5>
              <Form>
                <Form.Group className="mb-3 d-flex mx-3" controlId="name">
                  <h6 className="w-25 ms-4">姓名</h6>
                  <Form.Control
                    className="w-75 me-6"
                    type="email"
                    placeholder="請輸入完整名字"
                  />
                </Form.Group>
                <Form.Group className="mb-3 d-flex mx-3" controlId="phone">
                  <h6 className="w-25 ms-4">聯絡電話</h6>
                  <Form.Control
                    className="w-75 me-6"
                    type="email"
                    placeholder="請輸入電話號碼"
                  />
                </Form.Group>
                <Form.Group className="mb-3 d-flex mx-3" controlId="email">
                  <h6 className="w-25 ms-4">電子郵件</h6>
                  <Form.Control
                    className="w-75 me-6"
                    type="email"
                    placeholder="請輸入電子郵件"
                  />
                </Form.Group>
                <Form.Group className="mb-3 d-flex mx-3" controlId="email">
                  <h6 className="w-25 ms-4">地址</h6>
                  <Form.Control
                    className=""
                    style={{ width: '308px' }}
                    type="email"
                    placeholder="縣/市"
                  />
                  <Form.Control
                    className="me-6"
                    style={{ width: '292px' }}
                    type="email"
                    placeholder="鄉鎮區"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 d-flex mx-3  ms-7  justify-content-center"
                  style={{ paddingLeft: '14px' }}
                  controlId="address"
                >
                  <Form.Control
                    className="w-75 mb-4"
                    type="text"
                    placeholder="街道,巷弄,門號,樓層"
                  />
                </Form.Group>
              </Form>
            </div>

            {/* functionPay */}
            <div className="bg-secondary p-4">
              <div>
                <Form.Check
                  label="ATM轉帳/銀行臨櫃匯款"
                  name="group1"
                  type="radio"
                  id={`radio-1`}
                />
                <div className="ms-6 mt-3">
                  <p>
                    將您的款項直接匯入我們的帳號，點選您的訂單編號會有付款說明。
                  </p>
                  <p>匯款完成後請至『匯款回報』填寫表單，才會完成訂單呦！</p>
                </div>
              </div>
              <div className="pt-4">
                <Form.Check
                  label="信用卡支付"
                  name="group1"
                  type="radio"
                  id={`radio-2`}
                />
                {/* credit-card */}
                <div className="d-flex justify-content-end me-5">
                  <div class="credit-card">
                    <div class="card__front card__part">
                      <img
                        class="card__front-square card__square"
                        src={require('../../../image/shoppingCart/card/ic.png')}
                      />
                      <img
                        class="card__front-logo card__logo"
                        src={require('../../../image/shoppingCart/card/master.png')}
                      />
                      <p class="card_numer">
                        {card1} {card2} {card3} {card4}
                      </p>
                      <div class="card__space-75">
                        <span class="card__label">Card holder</span>
                        <p class="card__info">Unii </p>
                      </div>
                      <div class="card__space-25">
                        <span class="card__label">Expires</span>
                        <p class="card__info">
                          {cardDate}/{cardTime}
                        </p>
                      </div>
                    </div>

                    <div class="card__back card__part">
                      <div class="card__black-line"></div>
                      <div class="card__back-content">
                        <div class="card__secret">
                          <p class="card__secret--last">{cardSafe}</p>
                        </div>

                        <img
                          class="card__back-logo card__logo"
                          src={require('../../../image/shoppingCart/card/master.png')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex mt-5">
                <h6>卡片號碼：</h6>
                <div>
                  <input
                    className="credit-number mx-3"
                    type="text"
                    maxLength="4"
                    onChange={(e) => {
                      setCard1(e.target.value)
                    }}
                  />
                  -
                  <input
                    className="credit-number mx-2"
                    type="text"
                    maxLength="4"
                    onChange={(e) => {
                      setCard2(e.target.value)
                    }}
                  />
                  -
                  <input
                    className="credit-number mx-2"
                    type="text"
                    maxLength="4"
                    onChange={(e) => {
                      setCard3(e.target.value)
                    }}
                  />
                  -
                  <input
                    className="credit-number mx-2"
                    type="text"
                    maxLength="4"
                    onChange={(e) => {
                      setCard4(e.target.value)
                    }}
                  />
                </div>
              </div>
              <div className="d-flex mt-5">
                <h6>到期日期：</h6>
                <div>
                  <input
                    className="credit-date mx-3"
                    type="text"
                    maxLength="2"
                    onChange={(e) => {
                      setCardDate(e.target.value)
                    }}
                  />
                  月
                  <input
                    className="credit-date mx-3"
                    type="text"
                    maxLength="2"
                    onChange={(e) => {
                      setCardTime(e.target.value)
                    }}
                  />
                  年
                </div>
              </div>
              <div className="d-flex mt-5">
                <h6>安全碼：</h6>
                <div className="m-13">
                  <input
                    className="credit-date mx-4"
                    type="text"
                    maxLength="3"
                    onChange={(e) => {
                      setCardSafe(e.target.value)
                    }}
                  />
                  末三碼
                </div>
              </div>
            </div>
            {/* button */}
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmPay
