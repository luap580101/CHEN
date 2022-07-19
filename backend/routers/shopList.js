const express = require('express');
const router = express.Router();

//db連線模組
const pool = require('../utils/db');

//TODO: 取得 shop 的列表
router.get('/', async (request, response, next) => {
  let [data] = await pool.execute('SELECT id,name,img FROM shop');

  //全部資料筆數
  const total = data.length;
  console.log('總共幾筆', total);

  //取得目前在第幾頁
  let page = request.query.page || 1;
  console.log('目前在第幾頁', page);

  //計算總共有幾頁
  const perPage = 8;
  const lastPage = Math.ceil(total / perPage);
  console.log('共幾頁', lastPage);

  //計算 offset 是多少
  let offset = (page - 1) * perPage;
  console.log('總共要跳過幾筆', offset);

  //取得這頁資料
  let [pageResult] = await pool.execute('SELECT id,name,img FROM shop ORDER BY id ASC LIMIT ? OFFSET ?', [perPage, offset]);

  //回給前端
  response.json({
    //頁碼
    pagination: {
      total,
      lastPage,
      page,
    },
    //真的資料
    data: pageResult,
  });
});

//TODO: 取得單一 shop 詳細頁
router.get('/:shopId', async (request, response, next) => {
  let [data] = await pool.execute('SELECT * FROM shop WHERE id=?', [request.params.shopId]);
  response.json(data);
});

//開團資料
router.get('/nowopen/:shopId', async (request, response, next) => {
  console.log('開團', request.params);
  let [data] = await pool.execute(
    'SELECT groups.*,shop.id AS shop_id FROM groups,shop WHERE groups.shop_id=shop.id AND now() >= start_time AND  now() <= end_time AND groups.shop_id=?',
    [request.params.shopId]
  );

  response.json(data);
});

//歷史資料
router.get('/history/:shopId', async (request, response, next) => {
  console.log('開團', request.params);
  let [data] = await pool.execute(
    'SELECT groups.*,shop.id AS shop_id FROM groups,shop WHERE groups.shop_id=shop.id AND now() > eating_date AND now_num>goal_num AND groups.shop_id=?',
    [request.params.shopId]
  );

  response.json(data);
});
module.exports = router;
