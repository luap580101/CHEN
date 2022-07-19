// import { BrowserRouter as Link } from 'react-router-dom'
// import EmptyReserveList from './EmptyReserveList'
// import ReserveList from './ReserveList'
// import ConfirmReserveList from './ConfirmReserveList'
// import FinishReserveList from './FinishReserveList'
// import PayList from '../Pay/PayList'
// import ConfirmPay from '../Pay/ConfirmPay'
// import FinishPay from '../Pay/FinishPay'
// import React, { useEffect, useState } from 'react'
// import { API_URL } from '../../../utils/config'
// import axios from 'axios'
// import Swal from 'sweetalert2'

// const PayCart = (props) => {
//   const [step, setStep] = useState(0)
//   // 要抓使用者check的groupId
//   const [groups, setGroups] = useState([])
//   // 會員加入購物車，要抓到會員的id
//   const user = localStorage.getItem('userID')
//   //要把paylist選到的couponID傳到ConfirmPay
//   const [selectCou, setSelectCou] = useState(0)
//   //要確認結帳的payGroup
//   const payGroup = localStorage.getItem('payGroup')

//   function toggleStep(val) {
//     setStep(step + val)
//   }

//   async function SubmitList() {
//     const params = {
//       userID: user,
//       groupID: groups,
//     }
//     await axios.post(`${API_URL}/shoppingCart/finishreservelist`, params)
//     toggleStep(1)
//     window.scrollTo(0, 0)
//   }
//   //
//   function handleCouponProps(coudata) {
//     setSelectCou(coudata)
//   }

//   //確認結帳後更新coupon已使用及已結帳
//   async function updateApi() {
//     // console.log(selectCou)
//     const param = {
//       selectCou: selectCou.id,
//       payGroup: payGroup,
//       user: user,
//     }
//     await axios.post(`${API_URL}/shoppingCart/updatecoupay`, param)
//   }
//   return (
//     <>
//       <div>
//         {step === 0 ? (
//           <>
//             <EmptyReserveList />
//             <div className="d-flex flex-column align-items-center  w-100">
//               <a
//                 type="button"
//                 className="mb-5 bg-primary px-5 py-2 rounded ms-9 text-dark"
//                 onClick={() => {
//                   toggleStep(2)
//                   window.scrollTo(0, 0)
//                 }}
//               >
//                 參團去
//               </a>
//             </div>
//           </>
//         ) : (
//           ''
//         )}
//         {step === 1 ? (
//           <>
//             <PayList couponSelect={handleCouponProps} />
//             <div className="d-flex justify-content-center mb-5">
//               <div className="d-flex justify-content-around w-75">
//                 <a
//                   type="button"
//                   className="bg-info text-white px-4 py-2 mt-4 ms-5"
//                   onClick={() => {
//                     toggleStep(-1)
//                     window.scrollTo(0, 0)
//                   }}
//                 >
//                   返回訂位
//                 </a>
//                 <a
//                   type="button"
//                   className="bg-primary text-white px-4 py-2 me-5 mt-4"
//                   onClick={() => {
//                     toggleStep(1)
//                     window.scrollTo(0, 0)
//                   }}
//                 >
//                   前往結帳
//                 </a>
//               </div>
//             </div>
//           </>
//         ) : (
//           ''
//         )}
//         {step === 2 ? (
//           <>
//             <ConfirmPay selectCou={selectCou} />
//             <div className="d-flex justify-content-center mb-5">
//               <div className="d-flex justify-content-around w-75">
//                 <a
//                   type="button"
//                   className="bg-info text-white px-4 py-2 mt-4 ms-5"
//                   onClick={() => {
//                     toggleStep(-1)
//                     window.scrollTo(0, 0)
//                   }}
//                 >
//                   重選結帳項目
//                 </a>
//                 <a
//                   type="button"
//                   className="bg-primary text-white px-4 py-2 me-5 mt-4"
//                   onClick={() => {
//                     updateApi()
//                     Swal.fire({
//                       position: 'center-center',
//                       icon: 'success',
//                       title: '結帳成功',
//                       showConfirmButton: false,
//                       timer: 1500,
//                     })
//                     toggleStep(1)
//                     window.scrollTo(0, 0)
//                   }}
//                 >
//                   確認結帳
//                 </a>
//               </div>
//             </div>
//           </>
//         ) : (
//           ''
//         )}
//       </div>
//     </>
//   )
// }

// export default PayCart
