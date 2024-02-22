// import express from 'express';
// import path from 'path';

const express = require('express');
const path = require('path');

const viewsRouter = express.Router();
// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serverStatic(resource) {
  const resourcePath = path.join(__dirname, `../views/${resource}`);
  const option = { index: `${resource}.html` };

  // express.static 은 express 가 정적인 파일을 제공할 때 쓰는 함수
  return express.static(resourcePath, option);
}

viewsRouter.use('/', serverStatic('home'));
viewsRouter.use('/login', serverStatic('login'));

module.exports = { viewsRouter };
