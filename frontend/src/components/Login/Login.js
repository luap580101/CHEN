import { Link, useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import axios from 'axios'
import { API_URL } from '../../utils/config'
import Swal from 'sweetalert2'
import { useLogin } from '../../context/LoginStatus'

const Login = (props) => {
  //判定登入與否以及抓取各種會員資料
  const { member, setMember, setIsLogin, isLogin } = useLogin()

  //移動頁面
  const history = useHistory()

  //忘記密碼
  const [mail, setMail] = useState('')
  function handleMail(e) {
    setMail({ ...mail, [e.target.name]: e.target.value })
  }

  //送出忘記密碼
  const handleMailReset = async () => {
    try {
      let response = await axios.get(`${API_URL}/reset`, {
        params: {
          mail: mail,
        },
      })
      await Swal.fire({
        icon: 'success',
        title: response.data.result,
        showConfirmButton: false,
        timer: 2000,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        width: '35%',
        padding: '0 0 1.25em',
        customClass: {
          popup: 'shadow-sm',
        },
      })
      setShow(false)
    } catch (e) {
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
      console.log(e.response.data.error)
      return
    }
  }

  //判定註冊還是登入畫面
  const { isLoginPage, setIsLoginPage } = props

  //忘記密碼 Modal 以及 form 表單驗證等 功能函式
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [validated, setValidated] = useState(false)

  function handleChange(e) {
    setMember({ ...member, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget
    event.preventDefault()

    if (form.checkValidity() === false) {
      event.stopPropagation()
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
    setIsLogin(true)
    try {
      let response = await axios.post(`${API_URL}/member/login`, member, {
        withCredentials: true,
      })
      // console.log(response.data)

      //會員登入id存入localStorage
      localStorage.setItem('userID', response.data.member.id)
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
      
      setMember({ ...member, id: response.data.member.id })

      if (checked === true) {
        setRememberMe()
      } else {
        removeRememberMe()
      }
      //跳轉頁面至會員中心
      history.push('/memberCenter')
    } catch (e) {
      console.log(e.response.data.error)
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
      setValidated(false)
      setMember({
        id: '',
        identity_card: '',
        password: '',
      })
      return
    }
  }

  const setRememberMe = (e) => {
    // console.log(123)
    localStorage.setItem('remember', JSON.stringify(member))
  }
  const removeRememberMe = (e) => {
    // console.log(456)
    localStorage.removeItem('remember', JSON.stringify(member))
  }

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    let remember = JSON.parse(localStorage.getItem('remember'))
    if (remember) {
      setChecked(true)

      setMember({
        ...member,
        identity_card: remember.identity_card,
        password: remember.password,
      })
    }
  }, [])

  return (
    <>
      <div className="d-flex text-center align-items-center">
        <div className="w-50 mx-4 text-nowrap">
          <h2 className="text-info">還不是會員嗎?</h2>
          <button
            className="btn btn-primary"
            onClick={() => {
              setIsLoginPage(false)
            }}
          >
            快來註冊吧 <i className="fa-solid fa-paper-plane text-info"></i>
          </button>
          {/* <h5 className='mt-3 text-white member_slogon'>與我們一同用美味的餐點，讓大家因「吃」相遇</h5> */}
        </div>
        <div className="w-50 mx-4">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <img src={require('../../image/navbar/logo.png')} alt="" />
              <h3 className="card-title text-center mb-3">登入會員</h3>
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className="d-flex flex-column align-items-center"
              >
                <Form.Group as={Col} md="10" controlId="validationIdentityCard">
                  <FloatingLabel
                    controlId="identity_card"
                    label="身分證字號"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      type="text"
                      placeholder="身分證字號"
                      name="identity_card"
                      defaultValue={member.identity_card}
                      value={member.identity_card}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      請填寫此欄位
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col} md="10" controlId="validationPassword">
                  <FloatingLabel
                    controlId="password"
                    label="會員密碼"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      type="password"
                      placeholder="會員密碼"
                      name="password"
                      defaultValue={member.password}
                      value={member.password}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      請填寫此欄位
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <div className="form-check mb-3">
                  <label
                    className="form-check-label me-5"
                    htmlFor="rememberPasswordCheck"
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberPasswordCheck"
                      checked={checked}
                      onChange={() => {
                        setChecked(!checked)
                      }}
                    />
                    記住我
                  </label>
                  {/* Modal */}
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault()
                      handleShow()
                    }}
                  >
                    忘記密碼?
                  </a>
                </div>
                <Button type="submit">登入</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdropClassName="bg-white rounded"
        contentClassName="shadow-lg border-0"
      >
        <Modal.Header closeButton>
          <Modal.Title>忘記密碼</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                <h5>
                  請輸入您註冊時所填寫的電子信箱，我們會立即發送密碼重新設定信。
                </h5>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="mail"
                value={mail.mail}
                autoFocus
                onChange={handleMail}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="text-white"
              variant="primary"
              onClick={handleMailReset}
            >
              送出
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default Login
