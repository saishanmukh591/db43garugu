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
// exports.part_create_post = function(req, res) {

//  res.send('NOT IMPLEMENTED: part create POST');
// };
// Handle part create on POST.
exports.part_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Part();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"part_type":"goat", "cost":12, "size":"large"}
    document.part_name = req.body.part_name;
    document.cost = req.body.cost;
    document.size = req.body.size;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    } 
   };




// Handle part delete form on DELETE.
exports.part_delete = function(req, res) {
 res.send('NOT IMPLEMENTED: part delete DELETE ' + req.params.id);
};
// Handle part update form on PUT.
exports.part_update_put = function(req, res) {
 res.send('NOT IMPLEMENTED: part update PUT' + req.params.id);
};

// VIEWS
// Handle a show all view
exports.part_view_all_Page = async function(req, res) {
    try{
    thePart = await Part.find();
    res.render('parts', { title: 'Part Search Results', results: thePart });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    } 
   };
