import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Container, Row, Button, Form, Col, InputGroup } from 'react-bootstrap'
import registerbanner from '../../image/shop/registerbanner.png'
import axios from 'axios'
import { API_URL } from '../../utils/config'
import { AiFillEye } from 'react-icons/ai'
import Swal from 'sweetalert2'

function Register(props) {
  const { isShopLogin, setIsShopLogin } = props
  const [shopMember, setshopMember] = useState({
    name: '',
    phone: '',
    account: '',
    password: '',
    comfirmPassword: '',
    description: '',
    type_id: [],
    img: '',
    banner: '',
    address: '',
  })
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState('')
  const history = useHistory()

  function handleChange(e) {
    const newshopMember = {
      ...shopMember,
      [e.target.name]: e.target.value,
    }
    setshopMember(newshopMember)
  }

  //餐廳用checked
  function handleCheck(e) {
    if (shopMember.type_id.includes(e.target.value)) {
      setshopMember({
        ...shopMember,
        type_id: shopMember.type_id.filter((v, i) => {
          return v !== e.target.value
        }),
      })
    } else {
      setshopMember({
        ...shopMember,
        type_id: [...shopMember.type_id, e.target.value],
      })
    }
  }
  //餐廳類別
  const type = [
    '中式',
    '台式',
    '港澳',
    '日式',
    '韓式',
    '泰式',
    '美式',
    '歐式',
    '燒烤',
    '火鍋',
    '甜點',
    '套餐',
    '吃到飽',
    '咖啡廳',
  ]

  //圖片用
  function handlePhoto(e) {
    setshopMember({ ...shopMember, [e.target.name]: e.target.files[0] })
  }

  //看密碼
  const [passwordShown, setPasswordShown] = useState(false)

  async function handleSubmit(e) {
    const form = e.currentTarget
    e.preventDefault()
    if (form.checkValidity() === false) {
      e.preventDefault()
      setValidated(true)
      Swal.fire({
        icon: 'error',
        title: '請確認輸入資料是否正確',
        showConfirmButton: false,
        timer: 1500,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        width: '35%',
        padding: '0 0 1.25em',
        customClass: {
          popup: 'shadow-sm',
        },
      })
      return
    }

    console.log(
      `店家名稱:${shopMember.name}`,
      `logo圖片:${shopMember.img}`,
      `banner圖片:${shopMember.banner}`
    )
    try {
      let formData = new FormData()
      formData.append('name', shopMember.name)
      formData.append('phone', shopMember.phone)
      formData.append('account', shopMember.account)
      formData.append('password', shopMember.password)
      formData.append('comfirmPassword', shopMember.comfirmPassword)
      formData.append('description', shopMember.description)
      formData.append('address', shopMember.address)
      for (var i = 0; i < shopMember.type_id.length; i++) {
        formData.append('type_id', shopMember.type_id[i])
      }
      formData.append('img', shopMember.img)
      formData.append('banner', shopMember.banner)
      let response = await axios.post(`${API_URL}/shop/register`, formData)
      console.log(response.data.result)
      Swal.fire({
        icon: 'success',
        title: response.data.result,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 1500,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        width: '35%',
        padding: '0 0 1.25em',
        customClass: {
          popup: 'shadow-sm',
        },
      }).then((result) => {
        setIsShopLogin(true)
      })
      // history.push('/shop')
      //setIsShopLogin(true)
    } catch (e) {
      setError(e.response.data.error)
      console.error('請重新註冊', e.response.data)
      Swal.fire({
        icon: 'error',
        title: e.response.data.error,
        showConfirmButton: false,
        timer: 1500,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        width: '35%',
        padding: '0 0 1.25em',
        customClass: {
          popup: 'shadow-sm',
        },
      })
      console.log('錯誤訊息', e.response.data.error)
      return
    }
  }
  return (
    <>
      <div className="container-fulid banner">
        <img className='img-fluid"' src={registerbanner} alt="" />
      </div>
      <h3 className="mt-5 text-center">
        歡迎您!<span>Unii</span>期待眾多優秀的餐廳加入
      </h3>
      <Container className="mt-5 mb-5">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="justify-content-around">
            <Col md={5}>
              <Form.Group>
                <Form.Label>
                  店家名稱<span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  className="mb-4"
                  placeholder="這會成為您的前台顯示的名稱"
                  defaultValue={shopMember.name}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  請填寫此欄位
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-5">
                <Form.Label>
                  店家電話<span>*</span>
                </Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  className="mb-4"
                  placeholder="請填寫店家電話"
                  defaultValue={shopMember.phone}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  請填寫此欄位
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-5">
                <Form.Label>
                  店家電子信箱<span>*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  name="account"
                  className="mb-4"
                  placeholder="信箱為登入帳號，並會寄送申請結果至此Email，請確認正確填寫。"
                  defaultValue={shopMember.account}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  請填寫此欄位
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-5">
                <Form.Label>
                  密碼<span>*</span>
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    aria-label="Amount (to the nearest dollar)"
                    type={passwordShown ? 'text' : 'password'}
                    name="password"
                    className=""
                    placeholder="請填寫6位以上英文或數字"
                    defaultValue={shopMember.password}
                    onChange={handleChange}
                    minLength={6}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    請填寫此欄位
                  </Form.Control.Feedback>
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
              <Form.Group className="mt-5">
                <Form.Label>
                  確認密碼<span>*</span>
                </Form.Label>
                <Form.Control
                  aria-label="Amount (to the nearest dollar)"
                  type="password"
                  name="comfirmPassword"
                  placeholder="請確認密碼"
                  defaultValue={shopMember.comfirmPassword}
                  onChange={handleChange}
                  minLength={6}
                />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Label>
                店家說明<span>*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="請填寫100字內店家介紹"
                style={{ height: '133px' }}
                className="mb-4"
                defaultValue={shopMember.description}
                name="description"
                onChange={handleChange}
                maxLength={100}
                required
              />
              <Form.Group className="mt-4">
                <Form.Label>
                  店家類別<span>*</span>
                </Form.Label>
                <div className="px-5">
                  {type.map((v, i) => {
                    return (
                      <div key={i} className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue={i}
                          name="type_id[]"
                          onChange={handleCheck}
                        />
                        <label className="form-check-label" htmlFor="">
                          {v}
                        </label>
                      </div>
                    )
                  })}
                </div>
              </Form.Group>
              <Form.Group className="mt-5">
                <Form.Label>
                  店家封面縮圖<span>*</span>
                </Form.Label>
                <Form.Control
                  type="file"
                  name="img"
                  className="mb-4"
                  defaultValue={shopMember.img}
                  onChange={handlePhoto}
                  required
                />
              </Form.Group>
              <Form.Group className="mt-5">
                <Form.Label>
                  店家看版圖<span>*</span>
                </Form.Label>
                <Form.Control
                  type="file"
                  name="banner"
                  className="mb-4"
                  defaultValue={shopMember.banner}
                  onChange={handlePhoto}
                />
              </Form.Group>
            </Col>
            <Col md={11} className="mt-5">
              <Form.Group className="mb-3">
                <Form.Label>
                  店家地址<span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="請填寫店家地址"
                  className="mb-4"
                  defaultValue={shopMember.address}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  請填寫此欄位
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-center mt-5">
            <div className="d-flex mt-5">
              <Form.Group className="mt-2">
                <Form.Check
                  required
                  label="同意新會員註冊條款"
                  feedback="請確認新會員註冊條款"
                  feedbackType="invalid"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="btn btn-primary ms-4"
              >
                註冊
              </Button>
            </div>
          </div>
        </Form>
      </Container>

      <div className="container mt-2 mb-5">
        <div className="d-flex flex-row mt-5">
          <hr className="col-md-5 line me-auto" />
          <h5 className="me-4">或</h5>
          <hr className="col-md-5 line ms-auto" />
        </div>

        <h5 className="text-center mt-5">
          有註冊過的店家由此
          <a
            href="/#"
            onClick={(e) => {
              e.preventDefault()
              setIsShopLogin(true)
              window.scrollTo(0, 0)
            }}
          >
            立即登入
          </a>
        </h5>
      </div>
    </>
  )
}
export default Register
