var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "zhonghaoliu";
var GITHUB_TOKEN = "443f2207a55d6386b72b778abcd6370d9c2f371a";

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
      console.log('body: ', body);
    }

  });

};

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});