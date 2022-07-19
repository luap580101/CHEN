const express = require('express');
const router = express.Router();

//db連線模組
const pool = require('../utils/db');

// /api/coupon/availCoupon
router.get('/availCoupon', async (req, res, next) => {
  let [coupon] = await pool.execute('SELECT * FROM coupon');
  let [usedCoupon] = await pool.execute('SELECT coupon_id AS id FROM user_and_coupon WHERE user_id = ?', [req.query.userId]);

  return res.json({ data: coupon, used: usedCoupon });
});

// /api/coupon/getCoupon
router.get('/getCoupon', async (req, res, next) => {
  let [coupon] = await pool.execute('INSERT INTO user_and_coupon (coupon_id, user_id) VALUES (?,?)', [req.query.couponId, req.query.userId]);
  return res.json({ result: '成功領取' });
});

// /api/coupon/myCoupon
router.get('/myCoupon', async (req, res, next) => {
  let [coupon] = await pool.execute(
    'SELECT coupon.*, user_and_coupon.* FROM coupon JOIN user_and_coupon ON coupon.id = user_and_coupon.coupon_id WHERE user_and_coupon.user_id = ?',
    [req.query.userId]
  );
  let howManyCoupon = coupon.length;
  return res.json({ coupon: coupon, count: howManyCoupon });
});

module.exports = router;
