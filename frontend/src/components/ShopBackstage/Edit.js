import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../utils/config'

// import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Swal from 'sweetalert2'
import { useShoppingCartContext } from '../../context/ShoppingCartContext'

const Edit = (props) => {
  const shopID = localStorage.getItem('shopID')
  // console.log(props)
  const { data } = props
  const { setCart } = useShoppingCartContext()

  // const goPath = useHistory()
  const [group, setGroup] = useState({
    startTime: '',
    endTime: '',
    eatingDate: '',
    eatingTime: '',
    goalNum: '',
    price: '',
    shopID: `${shopID}`,
  })
  // const checkList = ['小籠包', '酸辣湯', '炒飯', '炒手']
  const [checkList, setCheckList] = useState([])
  useEffect(() => {
    fetch(`${API_URL}/shopbackstage/checklist?shopID=${shopID}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        setCheckList(res.result)
      })
      .catch((e) => {
        /*發生錯誤時要做的事情*/
        console.log(e)
      })
  }, [])

  const [dish, setDish] = useState([])

  function checkValue(e) {
    let currentVal = e.target.value
    const copyDish = JSON.parse(JSON.stringify(dish))
    let index = copyDish.indexOf(currentVal)
    if (index !== -1) {
      copyDish.splice(index, 1)
    } else {
      copyDish.push(currentVal)
    }
    setDish(copyDish)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const params = group
      params['dish'] = dish
      let response = await axios.post(
        `${API_URL}/shopbackstage/opengroup`,
        params
      )
      console.log(response.data)
      setGroup({
        startTime: '',
        endTime: '',
        eatingDate: '',
        eatingTime: '',
        goalNum: '',
        price: '',
      })
      setDish([])
      await Toast.fire({
        icon: 'success',
        title: 'Success',
      })
      setCart(true)
      props.groupProps('third')
    } catch (e) {
      console.error(e)
    }
  }
  //alert
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  })
  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>店家名稱</Form.Label>
          <div
            class="border border-dark"
            style={{ height: '40px', paddingLeft: '10px', paddingTop: '5px' }}
          >
            {data ? data[0].name : ''}
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="start">
          <Form.Label>開團開始時間</Form.Label>
          <Form.Control
            type="date"
            value={group.startTime}
            onChange={(e) => setGroup({ ...group, startTime: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="end">
          <Form.Label>截止時間</Form.Label>
          <Form.Control
            type="date"
            value={group.endTime}
            onChange={(e) => setGroup({ ...group, endTime: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="time">
          <Form.Label>用餐時間</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="date"
              value={group.eatingDate}
              onChange={(e) =>
                setGroup({ ...group, eatingDate: e.target.value })
              }
            />

            <Form.Select
              aria-label="Default select example"
              value={group.eatingTime}
              onChange={(e) =>
                setGroup({ ...group, eatingTime: e.target.value })
              }
            >
              <option>請選擇用餐時段</option>
              <option value="1">午餐 12:00</option>
              <option value="2">下午茶 15:00</option>
              <option value="3">晚餐 18:00</option>
            </Form.Select>
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="amount">
          <Form.Label>成團人數</Form.Label>
          <Form.Control
            type="number"
            placeholder="請輸入最少成團人數"
            value={group.goalNum}
            onChange={(e) => setGroup({ ...group, goalNum: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>價格</Form.Label>
          <Form.Control
            type="text"
            placeholder="請輸入價格"
            value={group.price}
            onChange={(e) => setGroup({ ...group, price: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="dish">
          <Form.Label>選擇菜色：</Form.Label>
          {/* map動態產生 */}
          {checkList.map((item, i) => (
            <InputGroup className="mb-3 bg-secondary" key={i}>
              <InputGroup.Checkbox
                aria-label="Checkbox for following text input"
                onChange={(e) => {
                  checkValue(e)
                }}
                value={i}
              />
              <h6 className="mt-2 ms-3">{item.name}</h6>
            </InputGroup>
          ))}
        </Form.Group>
        <div className="d-flex justify-content-end ">
          <Button
            type="submit"
            variant="primary"
            className="w-25 mt-4"
            style={{ height: '40px' }}
            onClick={
              handleSubmit
              // props.groupProps('third')
            }
          >
            <h5>送出</h5>
          </Button>
        </div>
      </Form>
    </>
  )
}

export default Edit
