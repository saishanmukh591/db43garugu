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

// Handle part create on POST.
exports.part_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Part();
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

   // Handle Part delete on DELETE.
   exports.part_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await Part.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
   };
// Handle part update form on PUT.
exports.part_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
     try {
     let toUpdate = await Part.findById( req.params.id)
     // Do updates of properties
     console.log(req.params.id)
     if(req.body.part_name)  toUpdate.part_name = req.body.part_name;
     if(req.body.cost) toUpdate.cost = req.body.cost;
     if(req.body.size) toUpdate.size = req.body.size;
     let result = await toUpdate.save();
     console.log("Sucess " + result)
     res.send(result)
     } catch (err) {
     res.status(500)
     res.send(`{"error": ${err}: Update for id ${req.params.id} 
    failed`);
     }
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

// for a specific Part.
exports.part_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await Part.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
   };

   // Handle a show one view with id specified by query
exports.part_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await Part.findById(req.query.id)
        res.render('partdetail',
            { title: 'Part Detail', toShow: result });
    }
    catch (err) {
        res.status(500)
    }
};

// Handle building the view for creating a part.
// No body, no in path parameter, no query.
// Does not need to be async
exports.part_create_Page = function (req, res) {
    console.log("create view")
    try {
        res.render('partcreate', { title: 'Part Create' });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a part.
// query provides the id
exports.part_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id)
    try {
        let result = await Part.findById(req.query.id)
        res.render('partupdate', { title: 'Part Update', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle a delete one view with id from query
exports.part_delete_Page = async function (req, res) {
    console.log("Delete view for id " + req.query.id)
    try {
        result = await Part.findById(req.query.id)
        res.render('partdelete', {
            title: 'Part Delete', toShow:
                result
        });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};