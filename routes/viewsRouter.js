// import express from 'express';
// import path from 'path';

const express = require('express');
const path = require('path');

const viewsRouter = express.Router();

// SPA 이기 때문에 index.html 만 제공
viewsRouter.get('/*', (req, res) => {
  res.sendFile(path.resolve('views', 'index.html'));
});

module.exports = { viewsRouter };
