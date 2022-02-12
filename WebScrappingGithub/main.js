const url = "https://github.com/topics";

const request = require('request');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const repoObj = require("./RepoLinks");


request(url,cb);
function cb(err,response,html){
    if(err){
        console.log("Error in main.js cb function");
    }else{
        getAll3Links(html);
    }
}
function getAll3Links(html){
    let $ = cheerio.load(html);
    let arr = $(".gutter li a");
    console.log(arr.length);
    for(let i=0;i<arr.length;i++){
        let text = $(arr[i]).attr('href');
        let fullLink = "https://github.com"+text;
        //---------------------------------
        let strig = text.split('/');
        dirCreate(strig[2].trim()); 
        //-------------------------------------
        console.log((i+1)+" "+fullLink);
        repoObj.getrepo(fullLink);
        console.log("-----------------------------------------------------------");
    }
}
function dirCreate(dirPath){
    if(fs.existsSync(dirPath)==false){
        fs.mkdirSync(dirPath);
    }
    return;
}
 