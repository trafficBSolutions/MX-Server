const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const { submitWindow } = require('../controls/windowControl');

router.use(
    cors({
        credentials: true,
        origin: 'https://www.material-worx.com'
    })
);

// Use bodyParser to parse URL-encoded and JSON data
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/window-frost-tint', submitWindow);

module.exports = router;
