const express = require('express');
const router = express.Router();

//db連線模組
const pool = require('../utils/db');

//圖片用
const multer = require('multer');
const path = require('path');
//圖片儲存位置
const storage = multer.diskStorage({
  // 設定儲存的目的地 （檔案夾）
  destination: function (req, file, cb) {
    if (file.fieldname != 'img') {
      cb(null, path.join(__dirname, '..', 'assets', 'shopBanner'));
    } else {
      cb(null, path.join(__dirname, '..', 'assets', 'shopImg'));
    }
  },
  filename: function (req, file, cb) {
    let newFilename = file.originalname;
    cb(null, newFilename);
  },
});
const uploader = multer({
  // 設定儲存的位置
  storage: storage,
  // 過濾圖片
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/png') {
      cb('這些是不被接受的格式', false);
    } else {
      // cb(錯誤, 結果)
      cb(null, true);
    }
  },
  // 檔案尺寸的過濾
  limits: {
    // 1k = 1024
    fileSize: 200 * 1024,
  },
});

//多圖上傳方法
const cpUpload = uploader.fields([
  { name: 'img', maxCount: 1 },
  { name: 'banner', maxCount: 1 },
]);

//註冊
router.post('/register', cpUpload, async (request, respond, next) => {
  console.log('註冊確認有拿到資料', request.body);
  console.log('註冊上傳圖片', request.file);

  //確認 email 有沒有註冊過
  let [shopMember] = await pool.execute('SELECT id, account FROM shop WHERE account = ?', [request.body.account]);
  if (shopMember.length !== 0) {
    // 這個 email 有註冊過
    return respond.status(400).json({ code: 3002, error: '這個帳號已經註冊過' });
  }

  //確認密碼一致
  console.log('密碼是否一致', request.body.password, request.body.comfirmPassword);
  if (request.body.password !== request.body.comfirmPassword) {
    return respond.status(400).json({ code: 3007, error: '密碼與確認密碼不一致' });
  }

  //找到圖片的名字
  console.log('查看圖片的資料', request.files['img'][0].filename, request.files['banner'][0]);
  let img = request.files['img'] && request.files['img'].length > 0 ? '/shopImg/' + request.files['img'][0].filename : '';
  let banner = request.files['banner'] && request.files['banner'].length > 0 ? '/shopBanner/' + request.files['banner'][0].filename : '';
  console.log(banner, img);

  //存入shop資料表
  let [result] = await pool.execute('INSERT INTO shop (name,phone,account,password,description,address,img,banner) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
    request.body.name,
    request.body.phone,
    request.body.account,
    request.body.password,
    request.body.description,
    request.body.address,
    img,
    banner,
  ]);

  //抓shop最後一筆資料
  const [newShop] = await pool.execute('select id from shop order by id desc limit 1');

  console.log('最後一筆id:', newShop); //[ { id: 15 } ]
  console.log(newShop[0].id);

  //存入shop_type 資料表
  for (let i = 0; i < request.body.type_id.length; i++) {
    let [cate] = await pool.execute('INSERT INTO shop_and_type (shop_id,type_id) VALUES (?,?)', [newShop[0].id, request.body.type_id[i]]);
    // console.log('存入的資料:', cate);
  }

  // console.log('存入的資料:', result);

  respond.json({ result: '歡迎成為Uii開團店家' });
});

//登入
router.post('/login', async (request, respond, next) => {
  //確認資料有收到
  console.log('確認有拿到資料', request.body);

  //確認有無帳號
  //確認 email 有沒有註冊過
  let [shopMember] = await pool.execute('SELECT * FROM shop WHERE account = ?', [request.body.account]);
  if (shopMember.length === 0) {
    // 這個 email 沒有註冊過 就回復錯誤
    return respond.status(400).json({ code: 3003, error: '您的帳號尚未註冊' });
  }
  // 如果程式碼能執行到這裡，表示 members 裡至少有一個資料
  // 把這個會員資料拿出來
  console.log('有符合的資料', shopMember[0]); //有符合的資料 { id: 15, account: 'dintaifung@test.com', password: '151515' }
  let LoginShopMember = shopMember[0];
  let nowShopMember = shopMember[0].password; //使用者輸入的密碼
  let dataShopMember = request.body.password; //資料庫的密碼

  //如果有 確認密碼
  if (nowShopMember !== dataShopMember) {
    // 如果密碼不符合，回覆登入錯誤
    return respond.status(401).json({ code: 3004, error: '帳號或密碼錯誤' });
  }
  // console.log('登入店家', LoginShopMember);
  //密碼符合 寫入session
  let returnShopMember = { id: LoginShopMember.id, name: LoginShopMember.name };
  console.log('登入店家id和名字', returnShopMember);
  request.session.LoginShopMember = returnShopMember;

  //回復資料給前端
  respond.json({ code: 0, LoginShopMember: returnShopMember, result: '正前往您的店家後台' });
});

//店家登出
router.get('/logout', (request, respond, next) => {
  request.session.LoginShopMember = null;
  request.sendStatus(202);
});

module.exports = router;
