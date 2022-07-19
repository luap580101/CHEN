import Header from '../../Header/Header'
import Side from '../Side'
import { API_URL, IMAGE_URL } from '../../../utils/config'
import { useEffect, useState } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import Swal from 'sweetalert2'
import axios from 'axios'
import { ShoppingListContext } from '../../../context/ShoppingListContext'

const ReserveList = (props) => {
  // console.log(props)
  // const { userID } = props
  const [reser, setReser] = useState(true)

  const [data, setData] = useState([])
  useEffect(() => {
    getList()
  }, [reser])

  function getList() {
    fetch(`${API_URL}/shoppingcart/reservelist?userID=${props.userID}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        /*接到response data後要做的事情*/
        //console.log(res.result[0])
        setData(res.result)
      })
      .catch((e) => {
        /*發生錯誤時要做的事情*/
        console.log(e)
      })
  }

  function getEatTimeString(i) {
    if (data[i].eating_time === 1) {
      return '午餐12:00'
    } else if (data[i].eating_time === 2) {
      return '下午茶15:00'
    } else {
      return '晚餐18:00'
    }
  }

  const [list, setList] = useState([])
  function checkValue(e) {
    let currentVal = e.target.value
    const copyList = JSON.parse(JSON.stringify(list))
    let index = copyList.indexOf(currentVal)
    if (index !== -1) {
      copyList.splice(index, 1)
    } else {
      copyList.push(currentVal)
    }
    setList(copyList)
    props.setGroupsFunc(copyList)
  }
  //刪除
  async function Delete(item) {
    const shoppingcartID = item.id
    await axios.get(
      `${API_URL}/shoppingcart/redelete?shoppingcartID=${shoppingcartID}`
    )
    Swal.fire({
      title: '確定刪除此團單嗎?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FFB901',
      cancelButtonColor: '#d33',
      confirmButtonText: '刪除',
      cancelButtonText: '取消',
      backdrop: `rgba(255, 255, 255, 0.55)`,
      width: '35%',
      padding: '0 0 1.25em',
      customClass: {
        popup: 'shadow-sm',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '刪除成功',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          backdrop: `rgba(255, 255, 255, 0.55)`,
          width: '35%',
          padding: '0 0 1.25em',
          customClass: {
            popup: 'shadow-sm',
          },
        })
        getList()
      }
    })
  }

  return (
    <>
      <ShoppingListContext.Provider
        value={{
          reser,
          setReser,
        }}
      >
        <div className=" container my-6">
          <Header />
          <div className="d-flex">
            <Side />
            <div>
              <div className="w-75 ms-8 ">
                <img
                  className="w-75 pb-5 ms-6"
                  src={require('../../../image/shoppingCart/icongroup01.png')}
                  alt=""
                />
              </div>
              {/* List */}
              <div className="list w-100">
                <div class="show active" id="nav-home">
                  <table class="table">
                    <thead class="">
                      <tr>
                        <th></th>
                        <th>開團店家</th>
                        <th>參團時間</th>
                        <th>現在人數</th>
                        <th>目標人數</th>
                        <th>價格</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* map */}
                      {data.map((item, i) => (
                        <tr className="tr-hover" key={i}>
                          <td className="py-5">
                            <input
                              type="checkbox"
                              value={data[i].group_id}
                              onClick={(e) => {
                                checkValue(e)
                              }}
                            />
                          </td>
                          <td style={{ paddingTop: '14px' }}>
                            <img
                              style={{ width: '100px', height: '100px' }}
                              className="logo py-4 img-fluid"
                              src={`${IMAGE_URL}${data[i].img}`}
                              alt=""
                            />
                          </td>
                          <td className="py-5">
                            {data[i].eating_date} {getEatTimeString(i)}
                          </td>
                          <td className="py-5">{data[i].now_num}</td>
                          <td className="py-5">{data[i].goal_num}</td>
                          <td className="py-5">${data[i].price}</td>
                          <td className="py-5">
                            <BsFillTrashFill
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                Delete(item)
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* button */}
              </div>
            </div>
          </div>
        </div>
      </ShoppingListContext.Provider>
    </>
  )
}

export default ReserveList
