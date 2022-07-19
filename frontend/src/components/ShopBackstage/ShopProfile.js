import React from 'react'
import { Container, Row, Button, Form, Col, InputGroup } from 'react-bootstrap'
import axios from 'axios'
import { API_URL, IMAGE_URL } from '../../utils/config'
import { useState, useEffect, useRef } from 'react'
import { AiFillEye } from 'react-icons/ai'
import Swal from 'sweetalert2'

function ShopProfile() {
  const shopID = localStorage.getItem('shopID')
  console.log('抓到的id', shopID)

  //修改資料
  const [shopDetail, setShopDetail] = useState({
    phone: '',
    password: '',
    description: '',
    address: '',
  })
  //看密碼
  const [passwordShown, setPasswordShown] = useState(false)
  //先拿資料
  const [data, setData] = useState([])

  const [shopName, setShopName] = useState('')
  const [shopAccount, setShopAccount] = useState('')
  const [shopImg, setShopImg] = useState('')
  const [shopType, setShopType] = useState('')

  //可修改
  const [shopPhone, setShopPhone] = useState('')
  const [shopDescription, setShopDescription] = useState('')
  const [shopAddress, setShopAddress] = useState('')
  const [shopPassword, setShopPassword] = useState('')

  useEffect(() => {
    let getDetail = async () => {
      let response = await axios.get(`${API_URL}/shopbackstage/${shopID}`)

      setData(response.data[0])

      console.log(
        '回傳的資料',
        `${response.data.map((v, i) => {
          return v.type_name
        })}`,
        `${response.data[1].type_name}`
      )
      console.log('長度', response.data.length)

      setShopName(response.data[0].name)
      setShopAccount(response.data[0].account)
      setShopImg(response.data[0].img)

      setShopType(
        response.data.map((v, i) => {
          return v.type_name
        })
      )

      setShopPhone(response.data[0].phone)
      setShopDescription(response.data[0].description)
      setShopAddress(response.data[0].address)
      setShopPassword(response.data[0].password)
    }

    getDetail()
  }, [])

  async function handleSubmit(e) {
    // 停掉預設行為
    e.preventDefault()
    try {
      let response = await axios.post(`${API_URL}/shopbackstage/edit`, {
        phone: shopPhone,
        description: shopDescription,
        address: shopAddress,
        password: shopPassword,
        id: shopID,
      })
      console.log(response.data)
      await Swal.fire({
        icon: 'success',
        title: '修改成功',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 1500,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        width: '35%',
        padding: '0 0 1.25em',
        customClass: {
          popup: 'shadow-sm',
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <Container>
        <Row className="justicy-content-center ms-4 ">
          <h3 className="mb-5">店家基本資料修改</h3>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col className="mt-4 ms-auto col-4 " md={5}>
                <div className="img-box ms-auto mt-3 w-100">
                  <img src={`http://localhost:3001/${shopImg}`} alt="" />
                </div>
              </Col>
              <Col md={7}>
                <Form.Group className="mb-3">
                  <Form.Label>店家名稱</Form.Label>
                  <Form.Control
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    disabled
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>店家類別</Form.Label>
                  <Form.Control
                    type="text"
                    value={shopType}
                    onChange={(e) => setShopType(e.target.value)}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>店家帳號</Form.Label>
                  <Form.Control
                    type="text"
                    value={shopAccount}
                    onChange={(e) => setShopAccount(e.target.value)}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>店家電話</Form.Label>
              <Form.Control
                type="tel"
                value={shopPhone}
                onChange={(e) => setShopPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>密碼</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type={passwordShown ? 'text' : 'password'}
                  value={shopPassword}
                  onChange={(e) => setShopPassword(e.target.value)}
                />
                <InputGroup.Text id="inputGroupPrepend">
                  <label className="eye-input ms-auto">
                    <input
                      type="radio"
                      name=""
                      onClick={() => {
                        setPasswordShown(!passwordShown)
                      }}
                    />
                    <AiFillEye
                      className="eye"
                      color={!passwordShown ? '#A7A5A5' : '#FFB901'}
                    />
                  </label>
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>店家說明</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={shopDescription}
                onChange={(e) => setShopDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>店家地址</Form.Label>
              <Form.Control
                type="text"
                value={shopAddress}
                onChange={(e) => setShopAddress(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              送出
            </Button>
          </Form>
        </Row>
      </Container>
    </>
  )
}

export default ShopProfile
