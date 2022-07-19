import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { BsFillCameraFill } from 'react-icons/bs'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useLogin } from '../../context/LoginStatus'
import axios from 'axios'
import { API_URL } from '../../utils/config'
import Swal from 'sweetalert2'
import { useActivePanel } from '../../context/ActivePanel'

const UpdateProfile = () => {
  const [smShow, setSmShow] = useState(false)
  const { memberDetail, setMemberDetail } = useLogin()
  const { active, setActive } = useActivePanel()
  function handleChange(e) {
    setMemberDetail({ ...memberDetail, [e.target.name]: e.target.value })
  }
  function handleImg(e) {
    setMemberDetail({ ...memberDetail, img: e.target.name })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let response = await axios.post(`${API_URL}/member/update`, memberDetail)
      // console.log(response.data)
      await Swal.fire({
        icon: 'success',
        title: response.data.result,
        showConfirmButton: false,
        timer: 1500,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        width: '35%',
        padding: '0 0 1.25em',
        customClass: {
          popup: 'shadow-sm',
        },
      })
      // setMemberDetail([...memberDetail], phone:phoneRef.current.value)
      setActive('basic')
      // console.log(active)
    } catch (e) {
      console.log(e.response.data.error)
    }
  }
  return (
    <>
      <form>
        <div className="container">
          <div className="row justify-content-around">
            <div className="col-md-3 text-center">
              <div
                className="rounded-circle overflow-hidden border border-3 rounded-2 avatar mx-auto mb-3 position-relative avatar_pic_div_bg"
                onClick={() => setSmShow(true)}
              >
                <div className="avatar_pic_div position-absolute top-50 start-50 translate-middle">
                  <BsFillCameraFill />
                </div>
                <img
                  alt="10x10"
                  src={
                    memberDetail.img
                      ? require('../../image/memberProfile/' +
                          memberDetail.img +
                          '.png')
                      : require('../../image/memberProfile/1.png')
                  }
                  className="position-absolute top-50 start-50 translate-middle "
                />
              </div>
              <div className="mb-4 text-nowrap">
                <Modal
                  dialogClassName="pic-dialog"
                  backdropClassName="pic_modal-backdrop"
                  size="md"
                  show={smShow}
                  animation={false}
                  onHide={() => setSmShow(false)}
                  backdrop="false"
                >
                  <Modal.Header closeButton>請選擇喜愛的大頭貼</Modal.Header>
                  <Modal.Body className="change_pic">
                    <Row className="g-2 justify-content-around">
                      <Col md="auto">
                        <img
                          src={require('../../image/memberProfile/1.png')}
                          alt=""
                          name="1"
                          onClick={handleImg}
                        />
                      </Col>
                      <Col md="auto">
                        <img
                          src={require('../../image/memberProfile/2.png')}
                          alt=""
                          name="2"
                          onClick={handleImg}
                        />
                      </Col>
                      <Col md="auto">
                        <img
                          src={require('../../image/memberProfile/3.png')}
                          alt=""
                          name="3"
                          onClick={handleImg}
                        />
                      </Col>
                      <Col md="auto">
                        <img
                          src={require('../../image/memberProfile/4.png')}
                          alt=""
                          name="4"
                          onClick={handleImg}
                        />
                      </Col>
                    </Row>
                  </Modal.Body>
                </Modal>
                <p>
                  LV.{memberDetail.level} {memberDetail.levelName}會員
                </p>
              </div>
            </div>
            <div className="col-auto col-md-7">
              {/* 姓名 */}
              <label htmlFor="" className="form-label mb-1">
                會員姓名
              </label>

              <input
                type="text"
                value={memberDetail.name}
                className="form-control mb-3"
                disabled
              />

              {/* 身分證字號 */}
              <label htmlFor="" className="form-label mb-1 mt-2">
                身分證字號
              </label>
              <input
                type="text"
                value={memberDetail.identity_card}
                className="form-control mb-3"
                disabled
              />

              {/* 暱稱 */}
              <label htmlFor="" className="form-label mb-1 mt-2">
                暱稱
              </label>
              <input
                type="text"
                // placeholder={memberDetail.nick_name}
                className="form-control mb-3"
                name="nick_name"
                value={memberDetail.nick_name}
                onChange={handleChange}
                required
              />

              {/* 連絡電話 */}
              <label htmlFor="" className="form-label mb-1 mt-2">
                連絡電話
              </label>

              <input
                type="tel"
                placeholder="0912345678"
                className="form-control mb-2"
                name="phone"
                value={memberDetail.phone}
                onChange={handleChange}
                required
              />
              {/* 出生年月日 */}
              <label htmlFor="" className="form-label mb-1 mt-2">
                出生日期
              </label>

              <input
                type="date"
                value={memberDetail.bir}
                className="form-control mb-3"
                disabled
              />
              {/* email */}
              <label htmlFor="" className="form-label mb-1 mt-2">
                電子郵件
              </label>

              <input
                type="email"
                value={memberDetail.mail}
                className="form-control mb-3"
                disabled
              />

              {/* button group */}
              <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3 ">
                <button
                  className="btn btn-danger me-md-2 h5"
                  type="reset"
                  onClick={() => {
                    setActive('basic')
                  }}
                >
                  取消
                </button>
                <button
                  className="btn btn-primary h5"
                  type="submit"
                  onClick={handleSubmit}
                >
                  確認
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default UpdateProfile
