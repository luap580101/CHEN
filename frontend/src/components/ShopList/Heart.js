import React, { useState } from 'react'
import { useEffect } from 'react'
import { FaHeart } from 'react-icons/fa'
import { useLogin } from '../../context/LoginStatus'
import axios from 'axios'
import { API_URL } from '../../utils/config'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'

function Heart(props) {
  const [heart, setHeart] = useState(false)
  const { member } = useLogin()
  const { shopId } = props
  const history = useHistory()

  if (member) {
  } else {
  }
  useEffect(() => {
    if (member.id) {
      ;(async () => {
        try {
          let response = await axios.get(`${API_URL}/favorite/shopList`, {
            params: {
              userId: member.id,
              shopId: shopId,
            },
          })
          if (response.data.result > 0) {
            setHeart(!heart)
          }
        } catch (e) {
          console.log(e.response.data.error)
        }
      })()
    }
  }, [member.id])
  const inputFavorite = async () => {
    if (member.id != '') {
      if (heart === false) {
        try {
          let response = await axios.get(`${API_URL}/favorite/shopLike`, {
            params: {
              userId: member.id,
              shopId: shopId,
            },
          })
          setHeart(!heart)
        } catch (e) {
          console.log(e.response.data.error)
        }
      } else {
        setHeart(false)
        try {
          let response = await axios.get(`${API_URL}/favorite/delete`, {
            params: {
              userId: member.id,
              shopId: shopId,
            },
          })
          setHeart(!heart)
        } catch (e) {
          console.log(e.response.data.error)
        }
      }
    } else {
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
      history.push('/login')
    }
  }

  return (
    <>
      <label className="heart-input">
        <input
          type="radio"
          name=""
          onClick={() => {
            inputFavorite()
          }}
        />
        <FaHeart
          size={20}
          color={heart ? '#EF8062' : '#A7A5A5'}
          className="heart"
        />
      </label>
    </>
  )
}

export default Heart
