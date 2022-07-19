import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'
import Opengroup from './Opengroup'
import GroupList from './GroupList'
import DishList from './DishList'
import ShopProfile from './ShopProfile'
import OpenDish from './OpenDish'
import { useState, useEffect } from 'react'
import { API_URL } from '../../utils/config'
const SideBackstage = (props) => {
  //console.log(props)
  const [selectedKey, setSelectedKey] = useState('first')
  function handleGroupProps(key) {
    window.scrollTo(0, 0)
    setSelectedKey(key)
  }
  // shop登入存在localStorage
  const [data, setData] = useState('')
  useEffect(() => {
    const shopID = localStorage.getItem('shopID')
    fetch(`${API_URL}/shopbackstage/search?shopID=${shopID}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        /*接到response data後要做的事情*/
        setData(res.result)
      })
      .catch((e) => {
        /*發生錯誤時要做的事情*/
        console.log(e)
      })
  }, [])
  return (
    <>
      <div className="w-100 h-100">
        <Tab.Container id="left-tabs-example" activeKey={selectedKey}>
          <Row className="w-100">
            <Col sm={3} className="bg-secondary py-3 pe-0">
              <Nav variant="pills" className="flex-column">
                <h4 className="text-center my-4">
                  {props.shopBackstage.name}後台管理
                </h4>
                <Nav.Item>
                  <Nav.Link
                    eventKey="first"
                    className="text-center py-4"
                    onClick={() => handleGroupProps('first')}
                  >
                    基本資料
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="second"
                    className="text-center py-4"
                    onClick={() => handleGroupProps('second')}
                  >
                    我要開團
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="third"
                    className="text-center py-4"
                    onClick={() => handleGroupProps('third')}
                  >
                    歷史開團
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="forth"
                    className="text-center py-4"
                    onClick={() => handleGroupProps('forth')}
                  >
                    上架菜色
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="fifth"
                    className="text-center py-4"
                    onClick={() => handleGroupProps('fifth')}
                  >
                    菜色清單
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={7} className="mx-auto my-5">
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <ShopProfile />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Opengroup groupProps={handleGroupProps} data={data} />
                </Tab.Pane>
                <Tab.Pane
                  eventKey="third"
                  style={{ marginLeft: '-58px', marginRight: '-54px' }}
                >
                  <GroupList />
                </Tab.Pane>
                <Tab.Pane eventKey="forth">
                  <OpenDish groupProps={handleGroupProps} data={data} />
                </Tab.Pane>
                <Tab.Pane eventKey="fifth">
                  <DishList groupProps={handleGroupProps} shop={data} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  )
}

export default SideBackstage
