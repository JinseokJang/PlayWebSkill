var multer = require('multer');
var fs = require('fs');

const peopleStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'files/people/')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime().toString()+""+file.originalname)
    }
})
const dramaStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'files/poster/')
    },
    filename:function(req,file,cb){
        cb(null, new Date().getTime().toString()+""+file.originalname)
    }
})

var uploadPeople = multer({storage: peopleStorage}).fields([{name:'photoPath_74_107'},{name:'photoPath_160_160'}]);
var uploadDrama  = multer({storage: dramaStorage }).fields([{name:'posterPath_1200_480'},{name:'posterPath_360_210'},{name:'posterPath_89_128'}]);
var db = require('../model/db');


module.exports = {
    retrievePeopleInfo :function(req,res){
        db.retrievePeople(req.query.peopleName,(err,result)=>{
            if(err) throw err;
            else res.send(result);
        })
    },
    createPeopleInfo:(req,res)=>{
        uploadPeople(req,res,function(err){
            console.log(req.files);
            db.createPeople(req.body,(err,result)=>{
                if(err) throw err;
                else {
                    if(req.files.photoPath_74_107){
                        fs.rename(__dirname+"/../"+req.files.photoPath_74_107[0].path,__dirname+"/."+result[0],function(err){
                            if(err) throw err;
                        });
                    }
                    if(req.files.photoPath_160_160){
                        fs.rename(__dirname+"/../"+req.files.photoPath_160_160[0].path,__dirname+"/."+result[1],function(err){
                            if(err) throw err;
                        });
                    }
                }
            });
        })
        res.end();
    },
    retrieveDramaInfo:(req,res)=>{
        console.log(req.query.dramaName);
        db.retrieveDrama(req.query.dramaName,(err,result)=>{
            if(err) throw err;
            else res.send(result);
        })
    },
    createDramaInfo:(req,res)=>{
        uploadDrama(req,res,function(err){
            if(err) console.log(err);
            db.createDrama(req.body,(err,result)=>{
                if(err) throw err;
                else {
                    if(req.files.posterPath_1200_480){
                        fs.rename(__dirname+"/../"+req.files.posterPath_1200_480[0].path,__dirname+"/."+result.path[0],function(err){
                            if(err) throw err;
                        })
                    }
                    if(req.files.posterPath_360_210){
                        fs.rename(__dirname+"/../"+req.files.posterPath_360_210[0].path,__dirname+"/."+result.path[1],function(err){
                            if(err) throw err;
                        })
                    }
                    if(req.files.posterPath_89_128){
                        fs.rename(__dirname+"/../"+req.files.posterPath_89_128[0].path,__dirname+"/."+result.path[2],function(err){
                            if(err) throw err;
                        })
                    }
                    res.json(result.serial);
                    res.end();
                }
            })
        })
    },
    createRelation:(req,res)=>{
        db.createRelation(req.body.people,(err,result)=>{
            if(err) throw err;
            else{
                res.end();
            }
        })
    },
    retrieveRelation:(req,res)=>{
        db.retrieveRelation(req.query.dramaSerial,(err,result)=>{
            if(err) throw err;
            else res.send(result);
        })
    },
    createRating:(req,res)=>{
        console.log(req.body);
        db.createRating(req.body.rating,(err,result)=>{
            if(err) throw err;
            else{
                res.end();
            }
        })
    },
    retrieveRating:(req,res)=>{
        db.retrieveRating(req.query.dramaSerial,(err,result)=>{
            if(err) throw err;
            else res.send(result);
        })
    }
}