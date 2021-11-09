var Part = require('../models/part');
// List of all Part
exports.part_list = async function(req, res) {
    try{
    thePart = await Part.find();
    res.send(thePart);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    } 
   };

// for a specific Part.
exports.part_detail = function(req, res) {
 res.send('NOT IMPLEMENTED: part detail: ' + req.params.id);
};
// Handle part create on POST.
exports.part_create_post = function(req, res) {
 res.send('NOT IMPLEMENTED: part create POST');
};
// Handle part delete form on DELETE.
exports.part_delete = function(req, res) {
 res.send('NOT IMPLEMENTED: part delete DELETE ' + req.params.id);
};
// Handle part update form on PUT.
exports.part_update_put = function(req, res) {
 res.send('NOT IMPLEMENTED: part update PUT' + req.params.id);
};
