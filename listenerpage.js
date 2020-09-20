
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

const userId = localStorage.getItem("user-id");
console.log(userId);

if (userId !== null) {
  const logoutButton = document.getElementById("logout");
  logoutButton.innerHTML = "Logout";
} else {
  window.location = "/loginpage";
};

const api = "http://localhost:3000";

$.get(api + `/users/${userId}/tracks/new`, function (tracks) {
  const tracksContainer = $("#tracks-container");

  tracks.forEach(track => {
    console.log(track);
    var trackContainer = $(document.createElement('div'));
    trackContainer.addClass("track-container");

    var sound = document.createElement('audio');

    sound.id = 'audio-player';
    sound.controls = 'controls';
    sound.src = api + track.url;
    sound.type = 'audio/mpeg';
    

    trackContainer.append(sound);

    var dateContainer = $(document.createElement('span'));
    dateContainer.addClass("date-container");
    
    var uploadDate = Date.parse(track.uploadDate);
    var config = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };

    const dateTimeFormat = new Intl.DateTimeFormat('en', config);
    const [{ value: weekday }, , { value: month }, , { value: day }, , { value: year }, , { value: hour }, , { value: minute }] = dateTimeFormat.formatToParts(uploadDate);

    var dateString = `${weekday} ${day} ${month} ${year} ${hour}:${minute}`;
    dateContainer.text(dateString);
    trackContainer.append(dateContainer);
    const clickAway = document.createElement('button');
    $(clickAway).text('X');
    $(clickAway).click((event)=>{
      alert("here");
      console.log(event);
    });

    trackContainer.append(clickAway);

    tracksContainer.append(trackContainer);
    
    console.log(sound);
  });

});


// js get new track list on page load jQuery ajax 
// http://localhost:3000/tracks/new
