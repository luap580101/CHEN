const express = require('express');
const router = express.Router();

//db連線模組
const pool = require('../utils/db');

//寄信模組
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD,
  },
});

// /api/reset/
router.get('/', async (req, res, next) => {
  const json = req.query.mail;
  console.log('json', json);
  const mail = JSON.parse(json).mail;
  console.log('mail', mail);
  let [data] = await pool.execute('SELECT mail FROM user WHERE mail = ?', [mail]);
  if (data.length === 0) {
    // 這個 email 或 身分證字號沒有註冊過
    return res.status(400).json({ code: 3002, error: '這個email沒有註冊過' });
  }

  transporter
    .sendMail({
      from: process.env.MAIL_ADDRESS,
      to: mail,
      subject: '[Unii友你]會員忘記密碼郵件通知信',
      html: `
      <div>
          <a href=${process.env.FRONTEND_URL}/resetPassword/${mail}>請點此處重置密碼</a>
          <p>或是直接複製下列網址貼到瀏覽器上重置密碼</p>
          <span>${process.env.FRONTEND_URL}/resetPassword/${mail}</span>
      </div>
          `,
    })
    .then((info) => {
      console.log({ info });
    })
    .catch(console.error);
  res.json({ result: '已成功寄出忘記密碼修改連結，請至信箱收信並變更密碼' });
});

module.exports = router;
