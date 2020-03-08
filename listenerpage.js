   
/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

const playButton = document.getElementById("play_button");

      playButton.innerText = playButton.textContent = 'No new messages';

$.get( "http://localhost:3000/tracks/new", function( tracks ) {
   console.log(tracks);
   tracks.forEach(track => { 
     (new Audio()).play;
   });
   
});



// js get new track list on page load jQuery ajax 
// http://localhost:3000/tracks/new
