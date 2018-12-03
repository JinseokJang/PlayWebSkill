const request = require('request');
const cheerio = require('cheerio');
module.exports = {
    daumDramaInfo:function(req,res){
        let option = {
            url : "https://search.daum.net/search?w=tv&q="+encodeURI(req.query.dramaName),
            headers :{
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36"
            }
        }
        request(option,(err,respond,body)=>{
            if(err) throw err;
            const $ = cheerio.load(body);
            var drama = {
                broadcastCount: undefined,
                broadcastDay: undefined,
                broadcastEnd: undefined,
                broadcastStart: undefined,
                broadcastStation: undefined,
                broadcastTime: undefined,
                class: undefined,
                genre: undefined,
                name: undefined,
                posterPath_89_128: undefined,
                posterPath_200_200: undefined,
                posterPath_360_210: undefined,
                posterPath_1200_480: undefined,
                serial: undefined,
                synopsis: undefined,
                actor:[undefined],
                crew:[undefined],
                rating:[undefined]
            };
            //dataSet_0 [MBC] [수, 목 오후 10:00] [2018.11.21~]
            var dataSet_0 = $('.txt_summary>.f_nb');
            drama.broadcastStation = dataSet_0.eq(0).text();
            var time_day   = dataSet_0.eq(1).text();
            drama.broadcastTime    = ((tmp = (/\d+:\d+/).exec(time_day))==null) ? "":tmp[0];
            drama.broadcastDay     = time_day.replace(/\s\W.\s\d+:\d+/,"");
            var start_end  = dataSet_0.eq(2).text();
            // start_end = start_end.replace(/[.]/g,"-");
            start_end = start_end.split("~");
            drama.broadcastStart   = start_end[0]; 
            drama.broadcastEnd     = (start_end[1]) ? start_end[1] : "0000.00.00";
            //dataSet_1 [드라마 (32부작)] [의문의 아이, 의문의 사건과 마주한 한 여자가 시(詩)를 단서로 진실을 추적하는 미스터리 스릴러 드라마]
            var dataSet_1 = $('.dl_comm.dl_row>.cont');
            var broadcastcount =  dataSet_1.eq(0).text();
            drama.broadcastCount = ((tmp = (/[0-9]+/g).exec(broadcastcount))==null) ? "":tmp[0];
            drama.synopsis       = dataSet_1.eq(1).text();
            // //dataSet_2 [배역][이름]
            var dataSet_2 = $('#tv_casting>.wrap_col.castingList>ul>li');
            dataSet_2.each(function(i){
                var role= $(this).find('.txt_name>a').text().trim();
                var name= $(this).find('.sub_name').text().trim();
                if(role){
                    if(name=="출연"||name=="특별출연"){
                        drama.actor[i] = {name:role,role:name};
                    }else{
                        drama.actor[i]={name:name,role:role};
                    }
                }
            })
            // //dataSet_3 [역활][이름]
            var dataSet_3 = $('#tv_casting>.wrap_col.lst>ul>li');
            dataSet_3.each(function(i){
                var name = $(this).find('.txt_name').text().trim();
                var role = $(this).find('.sub_name').text().trim();
                drama.crew[i] = {name:name,role:role};
            })
            // //dataSet_4 [날짜][시청률]
            var dataSet_4 = $(".tbl_rank.tbl_type2>tbody>tr");
            dataSet_4.each(function(i){
                var date =$(this).find('td').eq(0).text();
                var rating =$(this).find('td').eq(2).text().replace("%","");
                drama.rating[i]={date:date,rating,rating};
            })
    
            res.send(drama);
            res.end();
        })
    }
}