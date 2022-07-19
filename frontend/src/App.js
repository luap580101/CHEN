import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './components/Navbar/NavbarDesktop'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import MemberLogin from './pages/MemberLogin'
import Shop from './pages/Shop'
import ShoppingCart from './pages/ShoppingCart'
import MemberCenter from './pages/MemberCenter'
import Groups from './pages/Groups'
import GroupDetail from './pages/GroupDetail'
import NotFoundPage from './pages/NotFoundPage'
import ShopBackstage from './pages/ShopBackstage'
import ShopList from './pages/ShopList'
import ShopListDetail from './pages/ShopDetail'
import { LoginContext } from './context/LoginStatus'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from './utils/config'
import { ActivePanelContext } from './context/ActivePanel'
import { ShoppingCartContext } from './context/ShoppingCartContext'
import { ShoppingListContext } from './context/ShoppingListContext'

import ResetPassword from './pages/ResetPassword'
import ScrollToTOP from './components/ScrollToTop'
function App() {
  //存登入會員的資料
  const [member, setMember] = useState({
    id: '',
    identity_card: '',
    password: '',
  })
  const [memberDetail, setMemberDetail] = useState({
    name: '',
    identity_card: '',
    nick_name: '',
    phone: '',
    bir: '',
    mail: '',
    img: '',
    level: '',
    levelName: '',
    create_time: '',
  })
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    ;(async () => {
      try {
        let response = await axios.get(`${API_URL}/session/member`, {
          withCredentials: true,
        })
        // console.log(response.data)
        setIsLogin(true)
        setMember(response.data)
      } catch (e) {
        console.log(e.response.data.error)
      }
    })()
  }, [])

  //useEffect(() => {}, [isLogin])

  //切換Nav的會員中心首頁連向何處
  const [active, setActive] = useState('basic')
  const [cart, setCart] = useState(false)
  const [reser, setReser] = useState(false)

  return (
    <LoginContext.Provider
      value={{
        member,
        setMember,
        memberDetail,
        setMemberDetail,
        isLogin,
        setIsLogin,
      }}
    >
      <ActivePanelContext.Provider value={{ active, setActive }}>
        {/* <Router> */}
        <ScrollToTOP />
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <MemberLogin />
          </Route>
          <Route path="/memberCenter">
            <MemberCenter />
          </Route>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/groups">
            <Groups />
          </Route>
          <Route path="/groupDetail/:groupId">
            <GroupDetail />
          </Route>
          <Route path="/resetPassword/:mail">
            <ResetPassword />
          </Route>
          <Route path="/shopList">
            <ShopList />
          </Route>
          <Route path="/shopDetail/:shopId">
            <ShopListDetail />
          </Route>
          <Route path="/shoppingCart">
            <ShoppingCart />
          </Route>
          <ShoppingCartContext.Provider value={{ cart, setCart }}>
            <Route path="/shopBackstage">
              <ShopBackstage />
            </Route>
          </ShoppingCartContext.Provider>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
        <Footer />
        {/* </Router> */}
      </ActivePanelContext.Provider>
    </LoginContext.Provider>
  )
}

export default App
