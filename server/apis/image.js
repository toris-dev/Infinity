const { Router } = require('express');
const multer = require('multer');
const path = require('path'); // path 모듈 임포트
const router = Router();
const { S3Client } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');
require('dotenv').config();
const s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const allowedExtensions = ['.png', '.jpg', '.webp', 'bmp', '.gif'];

// 이미지를 저장할 디렉토리 설정
const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'infinityimage',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, callback) => {
      const uploadDirectory = req.query.directory ?? 'productsImg';
      const extension = path.extname(file.originalname);
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error('wrong extension'));
      }
      callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`);
    },
    acl: 'public-read-write'
  })
});
router.post('/img', imageUploader.single('img'), (req, res) => {
  console.log(req.file);
  res.json({ url: req.file.location });
});

// admin 미들웨어 추가
router.post('/upload', imageUploader.array('img'), (req, res, next) => {
  if (!req.files) {
    const error = new Error('파일을 추가하세요');
    return next(error);
  }
  const result = req.files.map((file) => {
    return {
      message: '파일이 저장되었습니다.',
      fileLocation: file.location
    };
  });
  res.json(result);
});

module.exports = router;
