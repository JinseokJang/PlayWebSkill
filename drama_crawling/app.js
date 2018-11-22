const express = require('express');
const request = require('request');

const cheerio = require('cheerio');

var app = express();

app.get("/crawling",(req,res)=>{
    let url = "https://ko.wikipedia.org/wiki/%EC%B5%9C%EA%B3%A0%EC%9D%98_%EC%9D%B4%ED%98%BC_(2018%EB%85%84_%EB%93%9C%EB%9D%BC%EB%A7%88)";
    request(url,(err,respond,body)=>{
        // console.log(body);

        const $ = cheerio.load(body);
        let th = $('table.infobox>tbody>tr>th');
        let td = $('table.infobox>tbody>tr>td');
        
        // console.log(td[5].children[0].data);
        // console.log(td[6].children[0].data);
        for(var i = 0 ;i<th.length;i++){
            console.log(th[i].children[0].data);
            // if(td[i+1)
            if(td[i+1].children[0].data===undefined){
                td[i+1].children.forEach((ddddd)=>{
                    if(ddddd.data===undefined){
                        console.log(ddddd.children[0].data);
                    }
                    else{
                        console.log(ddddd.data);

                    }
            //         // console.log(ddddd.hasOwnProperty(attrbs));
            //         // console.log(data.children.hasOwnProperty(data));
            //         // if(data.children.hasOwnProperty(data)){

            //         // }
            //         // if(data.hasOwnProperty(children[0])){
            //             // console.log(data.children[0]);
            //         // }
            //         // if(data.children[0].hasOwnProperty(atrribs)){

            //         // }
            //             // if(data.children[0].attribs.href!=undefined){
            //             // }
            //             // }else{
            //                 // console.log(data.children[0].data);
            //             // }
                })
            }else{
                console.log(td[i+1].children[0].data);
            }
        }
        // for(var i=0;i<colArr.length;i++){
            // console.log
        // }
        // console.log(colArr[1])
        // console.log(colArr[1].children[1].children[0].data);
        // console.log(colArr[1].children[2].children[0].data);
        res.setHeader('Content-Type', 'application/json');
        res.send();
    })
})

app.listen(3303,()=>{
    console.log("server open");
})