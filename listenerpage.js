
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//const playButton = document.getElementById("play_button");

//playButton.innerText = playButton.textContent = 'No new messages';

const api = "http://localhost:3000";

$.get(api + "/tracks/new", function (tracks) {
  
  tracks.forEach(track => {
    console.log(track);
    var sound = document.createElement('audio');
    sound.id = 'audio-player';
    sound.controls = 'controls';
    sound.src = api + track.url;
    sound.type = 'audio/mpeg';
    document.getElementById('player-container').appendChild(sound);
    console.log(sound);
  });

});


// js get new track list on page load jQuery ajax 
// http://localhost:3000/tracks/new
