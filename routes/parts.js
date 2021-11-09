var express = require('express');
const part_controlers= require('../controllers/part');

var router = express.Router();

/* GET home page. */
router.get('/', part_controlers.part_view_all_Page);

module.exports = router;