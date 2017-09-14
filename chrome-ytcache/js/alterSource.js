console.log(location);
// must check server first
var res = {status: 200};
if (res.status !== 200) {
  console.warn('CogiTube: Cache server seems down!');
} else {
  var videos = document.getElementsByClassName('video-stream html5-main-video');
  // assuming main video is first in the selection array
  if (!videos.length) {
    console.warn('CogiTube: could not find the youtube running video!');
  } else {
    var video = videos[0];
    console.log(video.src);
    video.src = 'http://localhost:8088/stream' + location.search;
  }
}
