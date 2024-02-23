const express = require('express');
const router = express.Router();

const { User } = require('../models');

const asyncHandler = require('../utils/async-handler');

//회원 조회
router.get('/', asyncHandler(async function(req, res, next) {
  const { id } = req.query;
    const user = await User.findOne({id});
    if (!user) {
      throw new Error('회원 없음');
    }
    res.json(user);
}));

//회원 가입 users/register
router.post('/', async function(req, res, next) {
  const { id, pwd, name, email, zipCode, address, detailAddress, phoneNum, oauth } = req.body;
  
  let useYn, regDate;

  await User.create({ id, pwd, name, email, zipCode, address, detailAddress, phoneNum, useYn, regDate, oauth });
  const user = await User.findOne({ id });
  res.json(user);
});

//회원 정보 수정 시 변경 가능한 필드 pwd, name, email, zip_code, adress, phone_num
//모든 필드값을 body에 담지 않고 수정되는 부분만 요청해도 처리 가능 
router.put('/:id', async function(req, res, next) {
  const { id } = req.params;
  const { pwd, name, email, zipCode, address, detailAddress, phoneNum } = req.body;
  await User.updateOne({ id }, { pwd, name, email, zipCode, address, detailAddress, phoneNum });
  const user = await User.findOne({id});
  res.json(user);
});

/**
 * 회원 삭제(=탈퇴)
 * useYn 컬럼에 탈퇴한 현재 시점의 값이 들어가 있다면 탈퇴회원, 없다면 정상회원.
 * Date.now()만 사용할 경우, 한국 현재시간이 출력되는것이 아닌 UTC 시간이 출력되므로, 9시간을 더해줘 한국 현재시간이 담길 수 있도록 처리.
 */
router.delete('/:id', async function(req, res, next) {
  const { id } = req.params;
  await User.updateOne({ id }, {useYn: Date.now()+ 9*60*60*1000});
  const user = await User.findOne({id});
  const { useYn } = user;
  res.json({ useYn });
});


module.exports = router;
