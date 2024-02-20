const express = require('express');
const router = express.Router();
const { User } = require('../models');
const hashPassword = require('../utils/hash-password');

//회원 목록 조회 및 회원 조회
router.get('/', async function(req, res, next) {
  const { id } = req.query;
  // 쿼리로 id가 없을 경우 단일 회원 조회
  if (!id ){ 
    const users = await User.find();
    res.json(users);
  }

  //회원 조회
  const user = await User.findOne({id});
  res.json(user);
});

//회원 가입 users/register
router.post('/', async function(req, res, next) {
  const { id, pwd, name, email, zipCode, address, phoneNum, oauth } = req.body;
  
  let useYn, regDate;
  hashedPwd = hashPassword(pwd);

  await User.create({ id, pwd: hashedPwd, name, email, zipCode, address, phoneNum, useYn, regDate, oauth });
  const user = await User.findOne({ id });
  res.json(user);
});

//회원 정보 수정 시 변경 가능한 필드 pwd, name, email, zip_code, adress, phone_num
//모든 필드값을 body에 담지 않고 수정되는 부분만 요청해도 처리 가능 
router.put('/:id', async function(req, res, next) {
  const { id } = req.params;
  const { pwd, name, email, zipCode, address, phoneNum } = req.body;
  await User.updateOne({ id }, { pwd, name, email, zipCode, address, phoneNum });
  const user = await User.findOne({id});
  res.json(user);
});

router.delete('/:id', async function(req, res, next) {
  const { id } = req.params;
  await User.updateOne({ id }, {useYn: 2});
  const user = await User.findOne({id});
  res.send("success");
});


module.exports = router;
