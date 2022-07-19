import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import { API_URL, IMAGE_URL } from '../../utils/config'
import { BsFillTrashFill } from 'react-icons/bs'
import { useShoppingCartContext } from '../../context/ShoppingCartContext'
import Swal from 'sweetalert2'

const DishList = (props) => {
  const [data, setData] = useState([])
  const { cart, setCart } = useShoppingCartContext()
  useEffect(() => {
    getDishList()
  }, [cart])
  //刪除菜色
  async function Delete(item) {
    const dishID = item.id
    await axios.get(`${API_URL}/shopbackstage/dishdelete?dishID=${dishID}`)
    Swal.fire({
      title: '確定刪除此菜色嗎?',
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
        getDishList()
      }
    })
  }
  function getDishList() {
    const shopID = localStorage.getItem('shopID')
    fetch(`${API_URL}/shopbackstage/dishlist?shopID=${shopID}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.result[0])
        setData(res.result)
      })
      .catch((e) => {
        /*發生錯誤時要做的事情*/
        console.log(e)
      })
  }

  return (
    <>
      <div className="d-flex flex-wrap">
        {/* map */}
        {data.map((item, i) => (
          <Card style={{ width: '14rem' }} className="mx-2 my-4 ">
            <Card.Img variant="top" src={`${IMAGE_URL}${data[i].photo}`} />

            <Card.Body>
              <div className="d-flex align-items-baseline justify-content-between">
                <Card.Title>{data[i].name}</Card.Title>
                <p className="fw-normal">價格：${data[i].price}</p>
              </div>

              <Card.Text style={{ height: '32px' }}>
                {data[i].description}
              </Card.Text>
              <BsFillTrashFill
                className="icon-hover icon-ms"
                onClick={() => {
                  Delete(item)
                }}
              />
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  )
}

export default DishList
