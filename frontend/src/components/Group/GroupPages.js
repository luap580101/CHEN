import icon01 from '../../image/groups/icon01.png'
import icon02 from '../../image/groups/icon02.png'
import icon03 from '../../image/groups/icon03.png'
import icon04 from '../../image/groups/icon04.png'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL, IMAGE_URL } from '../../utils/config'
import Pagination from 'react-bootstrap/Pagination'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import ScrollToTOP from '../../components/ScrollToTop'

function GroupPages() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    })
  }, [])
  const [groups, setGroups] = useState([])
  //目前第幾頁
  const [page, setPage] = useState(1)
  //總筆數
  const [lastPage, setLastPage] = useState(1)
  //資料
  useEffect(() => {
    let getGroup = async () => {
      let response = await axios.get(`${API_URL}/group`, {
        params: { page: page },
      })
      setGroups(response.data.data)
      setLastPage(response.data.pagination.lastPage)
    }
    getGroup()
  }, [page])

  const getPages = () => {
    let pages = []
    for (let i = 1; i <= lastPage; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === page}
          onClick={(e) => {
            setPage(i)
          }}
        >
          {i}
        </Pagination.Item>
      )
    }
    return pages
  }

  return (
    <>
      {/* 圖片 */}
      <div className="text-center container-fluid bg-secondary group-fliter pt-5">
        <img
          src={icon01}
          alt=""
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-delay="300"
          data-aos-duration="1500"
        />
        <img
          src={icon02}
          alt=""
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-delay="700"
          data-aos-duration="1500"
        />
        <img
          src={icon03}
          alt=""
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-delay="1100"
          data-aos-duration="1500"
        />
        <img
          src={icon04}
          alt=""
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-delay="1500"
          data-aos-duration="1500"
        />
      </div>
      <div className="container">
        <h3 className=" titleH3 ps-4 mt-8">所有開團</h3>
      </div>
      {/* 商品頁 */}
      <div className="mt-5">
        <div className="container d-flex justify-content-center flex-wrap">
          {groups.map((v, i) => {
            console.log('目標人數', v.goal_num)
            console.log('現在人數', Math.round((v.now_num / v.goal_num) * 100))
            let percent = Math.round((v.now_num / v.goal_num) * 100)
            console.log(percent)

            return (
              <div key={v.id} className="ms-5 mb-6">
                <Link to={`/groupDetail/${v.id}`}>
                  <div className="little-card shadow-sm bg-white rounded main-hover">
                    <img
                      className="w-100 h-50 rounded-top"
                      src={`${IMAGE_URL}${v.img}`}
                      alt=""
                    />
                    <div className="p-3">
                      <div className="d-flex justify-content-between">
                        <h4>{v.name}</h4>
                        {v.type_name.split(',').map((v, i) => {
                          return (
                            <span className="badge rounded-pill bg-primary">
                              {v}
                            </span>
                          )
                        })}
                      </div>
                      <h6 className="fw-normal">目前人數:{v.now_num}</h6>
                      <h6 className="fw-normal mb-4">
                        用餐時間:{v.eating_date}
                      </h6>
                      <div className="progress">
                        <div
                          className="progress-bar progress-bar-striped"
                          role="progressbar"
                          style={{ width: `${percent}%` }}
                          aria-valuenow="10"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="progress-text mt-1">
                          截止:{v.eating_date}
                        </p>
                        <p className="progress-text mt-1">
                          目標人數:{v.goal_num}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
      {/* 頁數 */}
      <div className="mt-6 d-flex justify-content-center">
        <Pagination
          className="mx-auto mt-4 ps-6 mb-4"
          onClick={window.scrollTo(0, 0)}
        >
          {getPages()}
        </Pagination>
      </div>
    </>
  )
}
export default GroupPages
