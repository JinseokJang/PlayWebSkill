const express = require('express');
const request = require('request');

const cheerio = require('cheerio');

var app = express();

app.get("/crawling",(req,res)=>{
    console.log(req.query.dramaName);
    let option = {
        url : "https://search.daum.net/search?w=tv&q="+encodeURI(req.query.dramaName),
        headers :{
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36"
        }
    }
    console.log(option.url);
    request(option,(err,respond,body)=>{
        if(err) throw err;
        const $ = cheerio.load(body);
        var json={
            broadcastStation:undefined,
            broadcastDay:undefined,
            broadcastStart:undefined,
            broadcastCount:undefined,
            synopsis:undefined,
            actor:[],
            production_crew:[],
            rating:[]
        };
        //dataSet_0 [MBC] [수, 목 오후 10:00] [2018.11.21~]
        var dataSet_0 = $('.txt_summary>.f_nb');
        json.broadcastStation = dataSet_0.eq(0).text();
        json.broadcastDay     = dataSet_0.eq(1).text();
        json.broadcastStart   = dataSet_0.eq(2).text();
        //dataSet_1 [드라마 (32부작)] [의문의 아이, 의문의 사건과 마주한 한 여자가 시(詩)를 단서로 진실을 추적하는 미스터리 스릴러 드라마]
        var dataSet_1 = $('.dl_comm.dl_row>.cont');
        if(dataSet_1.eq(0).text()){
            json.broadcastCount = (/[0-9]+/g).exec(dataSet_1.eq(0).text()).toString();
        }
        json.synopsis       = dataSet_1.eq(1).text();
        //dataSet_2 [배역][이름]
        var dataSet_2 = $('#tv_casting>.wrap_col.castingList>ul>li');
        dataSet_2.each(function(i){
            var role= $(this).find('.txt_name>a').text();
            var name= $(this).find('.sub_name').text();
            if(role){
                json.actor[i]={name:name,role:role};
            }
        })
        //dataSet_3 [역활][이름]
        var dataSet_3 = $('#tv_casting>.wrap_col.lst>ul>li');
        dataSet_3.each(function(i){
            var role = $(this).find('.txt_name').text();
            var name = $(this).find('.sub_name').text().trim();
            json.production_crew[i] = {name:name,role:role};
        })
        //dataSet_4 [날짜][시청률]
        var dataSet_4 = $(".tbl_rank.tbl_type2>tbody>tr");
        dataSet_4.each(function(i){
            var date =$(this).find('td').eq(0).text();
            var rating =$(this).find('td').eq(2).text();
            json.rating[i]={date:date,rating,rating};
        })

        res.send(json);
        res.end();
    })
})
function makeUrl(){
    s
}

app.listen(3303,()=>{
    console.log("server open");
})