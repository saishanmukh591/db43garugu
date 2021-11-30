var express = require('express');
const part_controlers= require('../controllers/part');

var router = express.Router();

const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
    }

/* GET home page. */
router.get('/', part_controlers.part_view_all_Page);

/* GET detail part page */
router.get('/detail', part_controlers.part_view_one_Page);

/* GET create part page */
router.get('/create',  secured, part_controlers.part_create_Page);
/* GET create update page */
router.get('/update', secured, part_controlers.part_update_Page);
/* GET create part page */
router.get('/delete', secured, part_controlers.part_delete_Page);


module.exports = router;