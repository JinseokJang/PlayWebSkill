var multer = require('multer');
var fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'files/people/')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime().toString()+""+file.originalname)
    }
  })
const upload = multer({storage: storage}).fields([{name:'photoPath_74_107'},{name:'photoPath_160_160'}]);

var db = require('../model/db');


module.exports = {
    getPeopleInfo :function(req,res){
        db.getPeopleInfo(req.query.peopleName,(err,result)=>{
            if(err) throw err;
            else res.send(result);
        })
    },
    postPeopleInfo:(req,res)=>{
        upload(req,res,function(err){
            db.postPeopleInfo(req.files,req.body,(err,result)=>{
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
    }
}