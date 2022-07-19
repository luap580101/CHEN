import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="bg-primary mt-auto">
        {/* footer link */}
        <div className="container pt-5">
          {/* footer 最外 分兩欄  左logo + 右連結 */}
          <div className="row">
            <div className="col-12 col-md-3 mb-3">
              <a className="footerlogo" href="/">
                <img
                  src={require('../../image/footer/footerLogo.png')}
                  alt=""
                />
              </a>
            </div>
            {/* footer 右連結 分兩欄  裡面再分兩欄 md-6 */}
            <div className="col-12 col-md-9 d-flex justify-content-end">
              <div className="row">
                <div className="col-6">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h5 className="mb-4">關注我們</h5>
                      <ul className="list-group">
                        <a href="/">Twitter</a>
                        <a href="/">Youtube</a>
                        <a href="/">Facebook</a>
                        <a href="/">Instagram</a>
                      </ul>
                    </div>
                    <div className="col-12 col-md-6">
                      <h5 className="mb-4">關於我們</h5>
                      <ul className="list-group ">
                        <a href="/">平台介紹</a>
                        <a href="/">人才招募</a>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <h5 className="mb-4">幫助</h5>
                      <ul className="list-group">
                        <a href="/shopBackstage">店家後台</a>
                        <a href="/">加入會員</a>
                        <a href="/">加入店家</a>
                        <a href="/">退訂政策</a>
                      </ul>
                    </div>
                    <div className="col-12 col-md-6">
                      <h5 className="mb-4">條款與政策</h5>
                      <ul className="list-group">
                        <a href="/">會員規範</a>
                        <a href="/">申訴管道</a>
                        <a href="/">服務政策</a>
                        <a href="/">隱私權政策</a>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* footer © */}
        <div className="footer_end container d-md-flex pt-4 mt-4">
          <div className="d-flex flex-column flex-md-row mb-4">
            <p className="me-3">Unii is a final project for mfee25</p>
            <p>© 2022 mfee25-Team1, All rights reserved.</p>
          </div>
          <div className="d-flex flex-column flex-md-row  ms-auto">
            <p>Team 1</p>
            <p className="ps-md-3">僅供學習使用</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
