var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "zhonghaoliu";
var GITHUB_TOKEN = "443f2207a55d6386b72b778abcd6370d9c2f371a";
//the token need to be hidden later!!!

function getRepoContributors(repoOwner, repoName, cb) {
  var UA = "GitHub Avatar Downloader - Student Project";
  var options = {
    url:'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': UA
    }
  };
  // var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  request(options, function(err, res, body) {
    console.log("StatusCode: ", res.statusCode);
    if (err) {
      console.error(err);
    } else {
      var data = JSON.parse(body.toString());
      cb(err, data);
    }

  });

};


getRepoContributors("jquery", "jquery", function(err, result) {
  if (err) {
    console.log('error: ', err);
  } else {
    // console.log(typeof result);
    result.forEach(function(element) {
      downloadImageByURL(element.avatar_url, element.login);

    });
  }
});

function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', function(err) {
           console.log ('Error: ', err);
         })
         .pipe(fs.createWriteStream(`./pics/${filePath}.jpg`));

}

