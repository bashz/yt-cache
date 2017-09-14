var fs = require('fs');
var path = require('path');
var express = require('express');
var youtubedl = require('youtube-dl');

var app = express();

app.use(express.static('public'));

app.get('/stream', function (req, res) {
  if (req.query.v) {
    var vid = req.query.v;
    var filename = path.resolve(__dirname + '/public/videos/',  vid + '.mp4');
    fs.access(filename, 2, function (err) {
      if (err) {
        var video = youtubedl('http://www.youtube.com/watch?v=' + vid);
        video.on('info', function (info) {
          console.log('Download started');
          console.log('filename: ' + info.filename);
          console.log('size: ' + info.size);
        });
        video.pipe(fs.createWriteStream(filename));
        video.pipe(res);
      } else {
        var video = fs.readFileSync(filename);
        res.writeHead(200, {'Content-Type': 'video/mp4'});
        res.end(video, 'binary');
      }
    });
  } else {
    res.json({status: 400, message: 'bad request'}).send();
  }
});

var server = app.listen(8088, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Custom Tiles listning at http://%s:%s", host, port);
});