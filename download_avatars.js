//setup libraries and initial variables
require('dotenv').config() //Secret keys
var request = require('request');
var fs = require('fs');
console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "zhonghaoliu";
var UA = "GitHub Avatar Downloader - Student Project";

//setup the input variables
var inputOwner = process.argv[2] || 0;
var inputName = process.argv[3] || 0;

//define the main function
function getRepoContributors(repoOwner, repoName, cb) {
  if ((repoOwner && repoName) == 0 ) {
    console.log('Invalid Input :/');
    return ;
  }
  var options = {
    url:'https://'+ GITHUB_USER + ':' + process.env.GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': UA
    }
  };

  request(options, function(err, res, body) {
    if (err) {
      console.error(err);
    } else {
      var data = JSON.parse(body);
      cb(err, data);
    }
  });
};


//the execute code, contains two input variables and a callback funcion
getRepoContributors(inputOwner, inputName, function(err, result) {
  if (err) {
    console.log('error: ', err);
  } else {
    result.forEach(function(element) {
      downloadImageByURL(element.avatar_url, element.login);
    });
  }
});

function downloadImageByURL(url, filePath) {
  request.get(url).on('error', function(err) {
           console.log ('Error: ', err);
         })
         .pipe(fs.createWriteStream(`./pics/${filePath}.jpg`));
}

