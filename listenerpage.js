
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
  const tracksContainer = $("#tracks-container");

  tracks.forEach(track => { 
    console.log(track);
    var trackContainer =  $(document.createElement('div'));
    trackContainer.addClass("track-container");

    var sound = document.createElement('audio');

    sound.id = 'audio-player';
    sound.controls = 'controls';
    sound.src = api + track.url;
    sound.type = 'audio/mpeg';
    
    trackContainer.append(sound);

    var dateContainer = $(document.createElement('span'));
    dateContainer.addClass("date-container");
    dateContainer.text(track.uploadDate);
    trackContainer.append(dateContainer);
    
    tracksContainer.append(trackContainer);

    console.log(sound);
           
  });

});


// js get new track list on page load jQuery ajax 
// http://localhost:3000/tracks/new
