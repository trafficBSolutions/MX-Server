const express = require('express');
const router = express.Router();
const { submitJobApplication } = require('../controls/jobApplicationControl');

router.post('/apply-now', submitJobApplication);

module.exports = router;
