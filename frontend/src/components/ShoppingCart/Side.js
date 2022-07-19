import React from 'react'
import { useHistory } from 'react-router-dom'
import { useActivePanel } from '../../context/ActivePanel'
import { useLogin } from '../../context/LoginStatus'
import Swal from 'sweetalert2'

const Side = () => {
  const history = useHistory()
  const { setActive } = useActivePanel()
  const { isLogin } = useLogin()
  const loginAlert = async () => {
    await Swal.fire({
      confirmButtonText: '去登入',
      icon: 'warning',
      title: '登入後才能使用此功能',
      backdrop: `rgba(255, 255, 255, 0.55)`,
      width: '35%',
      padding: '0 0 1.25em',
      customClass: {
        popup: 'shadow-sm',
        confirmButton: 'btn btn-primary h5',
        content: 'h5',
      },
      buttonsStyling: false,
    })
    await history.push('/login')
  }
  return (
    <>
      <div className="side w-25 ms-3">
        <div className="d-flex mt-3 ">
          <img src={require('../../image/shoppingCart/cart.png')} alt="" />
          <h5 className="mx-1 side-hover">購物車</h5>
        </div>
        <div className="d-flex mt-5 ">
          <img src={require('../../image/shoppingCart/heart.png')} alt="" />
          <h5
            className="mx-1 side-hover"
            onClick={() => {
              if (isLogin) {
                setActive('fourth')
                history.push('/memberCenter')
              } else {
                loginAlert()
              }
            }}
          >
            收藏清單
          </h5>
        </div>
      </div>
    </>
  )
}

export default Side
