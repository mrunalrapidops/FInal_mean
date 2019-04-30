const express = require ('express');
var router = express.Router();
var {Employee}  = require('../models/emp'); 
var ObjectId = require ("mongoose").Types.ObjectId;

router.get('/',(req,res)=>{
    Employee.find((err,docs)=>{
        if(!err){res.send(docs);}
        else{console.log("Error in retriving data from  employee_db" + JSON.stringify(err,undefined,2));}
    });// find all emp from Employee collections
});

router.get('/:id',(req,res)=>{
        if(!ObjectId.isValid(req.params.id))
            return res.status(400).send("no record of:"`${req.params.id}`);
        Employee.findById(req.params.id,(err,doc)=>{
            if(!err){res.send(doc);}
            else{console.log("Error in retriving data from  employee_db" + JSON.stringify(err,undefined,2));}
        });

    });


router.get('/',(reg,res)=>{
    Employee.find((err,docs)=>{
        if(!err){res.send(docs);}
        else{console.log("Error in retriving data from  employee_db" + JSON.stringify(err,undefined,2));}
    });// find all emp from Employee collections
});

router.post('/',(req,res)=>{
    var emp = new Employee({
        name:req.body.name,
        position:req.body.position,
        Branch:req.body.Branch,
        salary:req.body.salary
    });emp.save((err,docs)=>{
        if(!err){ res.send(docs);}
        else{console.log("Error in retriving data from  employee_db" + JSON.stringify(err,undefined,2));}
    });
});

router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send("no record of:"`${req.params.id}`);
    var emp = {
        name:req.body.name,
        position:req.body.position,
        Branch:req.body.Branch,
        salary:req.body.salary
    };
    Employee.findByIdAndUpdate(req.params.id,{$set:emp},{new:true},(err,doc)=>{
        if(!err){ res.send(docs);}
        else{console.log("Error in retriving data from  employee_db" + JSON.stringify(err,undefined,2));}
    });
});

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send("no record of:"`${req.params.id}`);
    
    Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){ res.send(docs);}
        else{console.log("Error in retriving data from  employee_db" + JSON.stringify(err,undefined,2));}
    });
});


 
module.exports = router;