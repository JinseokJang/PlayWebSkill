var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'211.112.105.34',
    user:'amcake',
    password:'spot0910',
    database:'amcake'
});

connection.connect(function(err){
    if(err) throw err;
})

function syncQuery (query,args){
    return new Promise ((resolve,reject)=>{
        connection.query(query,args,function(err,res){
            if(err) reject (err);
            resolve(res);
        })
    })
}

module.exports = {
    retrievePeople : (peopleName,result) =>{
        var query =`SELECT * FROM people WHERE name = ?`;
        connection.query(query,peopleName,function(err,res){
            if(err) result(err,null);
            else    result(null,res);
        })
        
    },
    createPeople : async(peopleInfo,result) =>{
        var query = `SELECT serial FROM people ORDER BY people.serial  DESC LIMIT 1`;
        var value = await syncQuery(query);
        var serial = ++value[0].serial;
        var path = [
            `./files/people/${serial}_74_107.jpg`,
            `./files/people/${serial}_160_160.jpg`
        ];
        query = `INSERT INTO people(serial,name,job,photoPath_74_107,photoPath_160_160) \
                 VALUES (${serial},"${peopleInfo.name}","${peopleInfo.job}","${path[0]}","${path[1]}")`;
        value = await syncQuery(query);
        result(null,path);
    },
    createDrama : async(dramaInfo,result)=>{
        var query = `SELECT serial FROM drama ORDER BY drama.serial DESC LIMIT 1`;
        var value = await syncQuery(query);
        var serial = ++value[0].serial;
        var path = [
            `./files/poster/${serial}_1200_480.jpg`,
            `./files/poster/${serial}_360_210.jpg`,
            `./files/poster/${serial}_89_128.jpg`
        ];
        query = `INSERT INTO drama(serial,name,class,genre,broadcastStation,broadcastDay,broadcastTime,broadcastStart,broadcastEnd,broadcastCount,synopsis,posterPath_1200_480,posterPath_360_210,posterPath_89_128)\
                 VALUES (${serial},"${dramaInfo.name}","${dramaInfo.class}","${dramaInfo.genre}","${dramaInfo.broadcastStation}","${dramaInfo.broadcastDay}","${dramaInfo.broadTime}","${dramaInfo.broadcastStart}","${dramaInfo.broadcastEnd}",${dramaInfo.broadcastCount},"${dramaInfo.synopsis}","${path[0]}","${path[1]}","${path[2]}")`;
        value = await syncQuery(query);
        result(null,path);
    }   
}