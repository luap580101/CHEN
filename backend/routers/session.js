const express = require('express');
const router = express.Router();

//db連線模組
const pool = require('../utils/db');

// /api/session/member
router.get('/member', (req, res, next) => {
  if (req.session.member) {
    //表示登入過
    return res.json(req.session.member);
  } else {
    //表示尚未登入
    return res.status(403).json({ code: 3002, error: '尚未登入' });
  }
});

module.exports = router;
