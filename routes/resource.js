var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var part_controller = require('../controllers/part');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// PART ROUTES ///
// POST request for creating a Part. 
router.post('/parts', part_controller.part_create_post);
// DELETE request to delete Part.
router.delete('/parts/:id', part_controller.part_delete);
// PUT request to update Part.
router.put('/parts/:id', 
part_controller.part_update_put);
// GET request for one Part.
router.get('/parts/:id', part_controller.part_detail);

// GET request for list of all Part items.
router.get('/parts', part_controller.part_list);

const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
}

/* GET detail part page */
router.get('/detail', secured , part_controller.part_view_one_Page);
/* GET create part page */
router.get('/create', secured , part_controller.part_create_Page);
/* GET create update page */
router.get('/update', secured , part_controller.part_update_Page);
/* GET create part page */
router.get('/delete', secured , part_controller.part_delete_Page);

module.exports = router;