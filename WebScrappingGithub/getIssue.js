const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const path = require('path');

let arr=[];
let i=0;
function issue(url,file){
    
    request(url,cb);
    let strig= url.split('/');
    let filePath = strig[4];
    arr.push(filePath,file);
    console.log("inside getIssue");
}

function cb(err,response,html){
    if(err){

    }else{
        let name = arr[i++];
        let dir = arr[i++];
        let pah=  path.join(__dirname,dir,name);
        getAllIssue(html,pah);
    }
}

function getAllIssue(html,file){
    let $ = cheerio.load(html);
    let arr = $('.js-navigation-container.js-active-navigation-container .flex-auto>a');
    console.log(arr.length);
    for(let i=0;i<arr.length;i++){
        let text = $(arr[i]).attr('href');
        console.log((i+1)+$(arr[i]).attr('href'));
        fs.appendFileSync(file,text+"\n");        
    }
}









module.exports ={
    getIssue: issue
}