import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { API_URL } from '../utils/config'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'

const ResetPassword = () => {
  const history = useHistory()

  const { mail } = useParams()
  console.log(mail)
  const [passwordCheck, setPasswordCheck] = useState(false)
  const [memberNewPassword, setMemberNewPassword] = useState({
    password: '',
    re_password: '',
    mail: mail,
  })
  const [userName, setUserName] = useState([])
  function handleChange(e) {
    setMemberNewPassword({
      ...memberNewPassword,
      [e.target.name]: e.target.value,
    })
  }
  useEffect(() => {
    ;(async () => {
      try {
        let response = await axios.get(`${API_URL}/member/reset`, {
          params: {
            mail: mail,
          },
        })
        setUserName(response.data.result)
      } catch (e) {
        console.log(e.response.data.error)
      }
    })()
  }, [])
  useEffect(() => {
    if (memberNewPassword.password !== memberNewPassword.re_password) {
      setPasswordCheck(true)
    } else {
      setPasswordCheck(false)
    }
  }, [memberNewPassword.re_password, memberNewPassword.password])

  const handleSubmit = async () => {
    if (
      memberNewPassword.password === '' ||
      memberNewPassword.re_password === ''
    ) {
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
    } else if (memberNewPassword.password !== memberNewPassword.re_password) {
      Swal.fire({
        icon: 'error',
        title: '密碼不一致',
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
      let response = await axios.post(
        `${API_URL}/member/resetPassword`,
        memberNewPassword
      )
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
      history.push('/login')
    } catch (e) {
      console.log(e.response.data.error)
    }
  }
  return (
    <>
      <Container as={Col} md="7" className="my-8 bg-secondary p-5">
        <h3 className="mb-3 text-info">重新設定密碼</h3>
        <Form>
          <Row className="mb-3 justify-content-center">
            <Form.Group as={Col} md="6">
              <Form.Label>
                親愛的
                {userName.map((v, i) => {
                  return v.name
                })}
                您好,
              </Form.Label>
            </Form.Group>
          </Row>
          <Row className="mb-3 justify-content-center">
            <Form.Group as={Col} md="6">
              <Form.Label>請輸入新密碼</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                value={memberNewPassword.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 justify-content-center">
            <Form.Group as={Col} md="6">
              <Form.Label>請再輸入一次新密碼</Form.Label>
              <Form.Control
                required
                type="password"
                name="re_password"
                value={memberNewPassword.re_password}
                onChange={handleChange}
                isInvalid={passwordCheck}
              />
              <Form.Control.Feedback type="invalid">
                密碼不一致
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3 justify-content-center">
            <Button
              as={Col}
              md="auto"
              type="submit"
              className="text-nowrap"
              onClick={handleSubmit}
            >
              確認
            </Button>
          </Row>
        </Form>
      </Container>
    </>
  )
}

export default ResetPassword
