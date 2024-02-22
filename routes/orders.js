const express = require('express');
const router = express.Router();
const { User } = require('../models');
const hashPassword = require('../utils/hash-password');
const asyncHandler = require('../utils/async-handler');