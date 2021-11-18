var express = require('express');
const part_controlers= require('../controllers/part');

var router = express.Router();

/* GET home page. */
router.get('/', part_controlers.part_view_all_Page);

/* GET create part page */
router.get('/create', part_controlers.part_create_Page);
/* GET create update page */
router.get('/update', part_controlers.part_update_Page);
/* GET create part page */
router.get('/delete', part_controlers.part_delete_Page);

module.exports = router;