const cheerio = require("cheerio");
const request = require("request");
const path = require('path');
const fs = require('fs');
const issueObj = require("./getIssue.js");

let arr=[];
let i=0;
let j=0;
function RepoLinks(url){
   
    //------------------------------------
    let strig = url.split('/');
    let filePath  = strig[4].trim();
    arr.push(filePath); 
    request(url,cb);
    //--------------------------------------
    console.log("Yes shifted");
}

function cb(err,response,html){
    if(err){

    }else{
        getRepoLinks(html,arr[i++]);
    }
   
    
}

function getRepoLinks(html,filePath){
    let $ = cheerio.load(html);
    let linksArr = $('article .f3 a');
    console.log(linksArr.length);
    let count= 0;
    for(let i=0;i<linksArr.length;i++){
        let isWorthy = $(linksArr[i]).hasClass('text-bold');
        if(isWorthy==true){
             
            console.log("--------------------------------------"+filePath+"-------------------------------------------------------");
            let text = $(linksArr[i]).attr('href');
            //------------------------------------
            let strig = text.split('/');
            let name= strig[2].trim()+"";
            let pat = path.join(__dirname,filePath,name);
            FileCreater(pat,name);
            //------------------------------------
            console.log(count+"https://github.com"+text);
            let issueUrl = "https://github.com"+text+"/issues";
            count++;
            issueObj.getIssue(issueUrl,filePath);
        }
        if(count==8){
            break;
        }
    }
}


function FileCreater(dirPath){
     fs.writeFileSync(dirPath,"");
    return;
}

module.exports = {
    getrepo:RepoLinks
}

//.js-navigation-container.js-active-navigation-container a