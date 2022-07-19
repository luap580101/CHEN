import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { API_URL } from '../../utils/config'
import { useHistory } from 'react-router-dom'
import { useLogin } from '../../context/LoginStatus'
import { useActivePanel } from '../../context/ActivePanel'
import { useCoupon } from '../../context/CouponContext'
import { Placeholder } from 'react-bootstrap'

const Profile = () => {
  const history = useHistory()
  const { member, setMember, setIsLogin } = useLogin()
  const { memberDetail, setMemberDetail } = useLogin()
  const { active } = useActivePanel()
  const { countCoupon } = useCoupon()
  const [display, setDisplay] = useState(false)

  let getMemberDetail = async () => {
    try {
      // console.log('profile')
      let response = await axios.post(`${API_URL}/member/profile`, member)
      // console.log(response.data)
      const newMemberDetail = {
        ...memberDetail,
        id: response.data.member.id,
        name: response.data.member.name,
        identity_card: response.data.member.identity_card,
        nick_name: response.data.member.nick_name,
        phone: response.data.member.phone,
        bir: response.data.member.bir,
        mail: response.data.member.mail,
        img: response.data.member.img,
        level: response.data.member.level,
        levelName: response.data.member.levelName,
        create_time: response.data.member.create_time.split(' '),
      }
      setMemberDetail(newMemberDetail)
    } catch (e) {
      // console.log(e.response.data.error)
    }
  }

  //重新整理或換頁面的時候要重抓資料
  useEffect(() => {
    getMemberDetail()

    //placeholder
    setTimeout(() => {
      setDisplay(true)
    }, 1000)
  }, [active, member])

  //更新頁面更新後，可以即時在會員中心首頁顯示更新後的樣子
  useEffect(() => {}, [memberDetail])

  //登出
  const logout = async () => {
    try {
      let response = await axios.get(`${API_URL}/member/logout`, {
        withCredentials: true,
      })
      // console.log(response.data.msg)
      Swal.fire({
        icon: 'success',
        title: response.data.msg,
        showConfirmButton: false,
        timer: 1500,
        backdrop: `rgba(255, 255, 255, 0.55)`,
        width: '35%',
        padding: '0 0 1.25em',
        customClass: {
          popup: 'shadow-sm',
        },
      })
      setIsLogin(false)
      setMember({
        id: '',
        identity_card: '',
        password: '',
      })
      history.push('/login')
    } catch (e) {
      console.log(e.response.data.error)
    }
  }
  if (display) {
    return (
      <>
        <div className="rounded-circle overflow-hidden border border-3 rounded-2 avatar mx-auto mb-3">
          <img
            alt="10x10"
            src={
              memberDetail.img
                ? require('../../image/memberProfile/' +
                    memberDetail.img +
                    '.png')
                : require('../../image/memberProfile/1.png')
            }
            className="position-absolute top-50 start-50 translate-middle"
          />
        </div>
        <div className="mb-3 text-center">
          <img
            src={require('../../image/memberProfile/line.png')}
            alt=""
            width={250}
          />
        </div>
        <div className="my_context text-center">
          <div className="mb-4">
            <p>{memberDetail.nick_name}</p>
          </div>
          <div className="mb-4">
            <p>
              LV.{memberDetail.level} {memberDetail.levelName}會員
            </p>
          </div>
          <div className="mb-4">
            <p>尚餘可用的優惠券{countCoupon}張</p>
          </div>
          <div className="mb-4">
            <p>{memberDetail.create_time[0]} 開始加入 Unii</p>
          </div>
          <div className="mb-4">
            <button
              className="btn h6 btn-primary text-white"
              onClick={() => {
                logout()
                // 會員id登出時清除localStorage
                localStorage.removeItem('userID')
              }}
            >
              登出
            </button>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="rounded-circle overflow-hidden border border-3 rounded-2 avatar mx-auto mb-3 bg-light"></div>
        <div className="mb-3 text-center">
          <Placeholder xs={4} animation="glow" style={{ width: '250' }} />
        </div>
        <div className="my_context text-center">
          <div className="mb-4">
            <Placeholder as="p" animation="glow">
              <Placeholder xs={4} />
            </Placeholder>
          </div>
          <div className="mb-4">
            <Placeholder as="p" animation="glow">
              <Placeholder xs={4} />
            </Placeholder>
          </div>
          <div className="mb-4">
            <Placeholder as="p" animation="glow">
              <Placeholder xs={4} />
            </Placeholder>
          </div>
          <div className="mb-4">
            <Placeholder as="p" animation="glow">
              <Placeholder xs={4} />
            </Placeholder>
          </div>
        </div>
      </>
    )
  }
}

export default Profile
