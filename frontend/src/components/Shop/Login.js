import React from 'react'
import { useHistory } from 'react-router-dom'

import { useState } from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import shoploginvideo from '../../image/shop/shoploginvideo.mp4'
import axios from 'axios'
import { API_URL } from '../../utils/config'
import Swal from 'sweetalert2'

function Login(props) {
  //控制header轉換
  const { isShopLogin, setIsShopLogin } = props
  const [shopMember, setshopMember] = useState({
    account: '',
    password: '',
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
    try {
      //跨源寫cookie
      let response = await axios.post(`${API_URL}/shop/login`, shopMember, {
        // 如果想要跨源讀寫 cookie
        withCredentials: true,
      })
      console.log('登入成功', response.data.result)
      //登入存入localStorage
      localStorage.setItem('shopID', response.data.LoginShopMember.id)
      await Swal.fire({
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
      })
      history.push('/shopBackstage')
    } catch (e) {
      setError(e.response.data.error)
      console.error('登入失敗', e.response.data)
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
      return
    }
  }

  return (
    <>
      {/* {error} */}
      <div className="container-fluid d-flex">
        <div className=" col-md-12 col-lg-7  d-flex justify-content-start align-items-center">
          <div className="text-center position-absolute content">
            <h2 className="mb-4">加入Unii店家</h2>
            <button
              className="btn btn-primary mb-3"
              onClick={() => {
                setIsShopLogin(false)
              }}
            >
              快速註冊
            </button>
            <h5>與我們一同用美味的餐點，讓大家因「吃」相遇</h5>
          </div>
          <video className="img-fluid" autoPlay muted loop>
            <source src={shoploginvideo} type="video/mp4" />
          </video>
          {/* <div className="video-viewpoint position-relative"></div> */}
        </div>
        <Col lg></Col>
        <div className="col-md-12 col-lg-5">
          <div className="form-size mt-7 ms-6">
            <h2 className="text-center mb-5">店家登入</h2>
            {/* {error} */}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label>帳號</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="請填寫帳號"
                  name="account"
                  defaultValue={shopMember.account}
                  onChange={(e) =>
                    setshopMember({
                      ...shopMember,
                      account: e.target.value,
                    })
                  }
                  required
                />
                <Form.Control.Feedback type="invalid">
                  請填寫此欄位
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>密碼</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="請填寫密碼"
                  name="password"
                  defaultValue={shopMember.password}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  請填寫此欄位
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex justify-content-between mb-3">
                <a href="/">忘記密碼</a>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                  <label className="form-check-label">記住我</label>
                </div>
              </div>
              <div className="d-grid gap-2 mx-auto">
                <Button
                  variant="primary"
                  type="submit"
                  className="btn btn-danger"
                >
                  登入
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
