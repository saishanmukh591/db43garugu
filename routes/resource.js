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

/* GET detail part page */
router.get('/detail', part_controller.part_view_one_Page);

module.exports = router;