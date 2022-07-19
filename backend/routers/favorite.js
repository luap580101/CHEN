const express = require('express');
const router = express.Router();

//db連線模組
const pool = require('../utils/db');

// /api/favorite/list
router.get('/list', async (req, res, next) => {
  let [favorite] = await pool.execute(
    'SELECT user_shop.id, user_shop.user_id, user_shop.shop_id, shop.img AS shopImg, shop.name AS shopName, GROUP_CONCAT(type.name) AS typeName FROM user_shop LEFT JOIN shop ON user_shop.shop_id = shop.id LEFT JOIN shop_and_type ON user_shop.shop_id = shop_and_type.shop_id LEFT JOIN type ON shop_and_type.type_id = type.id WHERE user_shop.user_id = ? GROUP BY user_shop.shop_id',
    [req.query.userId]
  );

  let howManyList = favorite.length;
  return res.json({ favorite: favorite, count: howManyList });
});

// /api/favorite/delete
router.get('/delete', async (req, res, next) => {
  await pool.execute('DELETE FROM user_shop WHERE `user_shop`.`user_id` = ? AND `user_shop`.`shop_id` = ? ', [req.query.userId, req.query.shopId]);

  return res.json({ cancel: 'OK' });
});

// /api/favorite/shopList
router.get('/shopList', async (req, res, next) => {
  let [responseList] = await pool.execute('SELECT * FROM user_shop WHERE user_id = ? AND shop_id = ?', [req.query.userId, req.query.shopId]);
  let count = responseList.length;
  return res.json({ result: count });
});

// /api/favorite/shopLike
router.get('/shopLike', async (req, res, next) => {
  await pool.execute('INSERT INTO user_shop (user_id , shop_id ) VALUES (? , ? )', [req.query.userId, req.query.shopId]);

  return res.json({ result: 'ok' });
});

module.exports = router;
