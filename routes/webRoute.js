const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const { submitWeb } = require('../controls/webControl');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
);

// Use bodyParser to parse URL-encoded and JSON data
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/new-website', submitWeb);

module.exports = router;
