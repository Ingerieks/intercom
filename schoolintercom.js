//<a href="https://www.freepik.com/free-photos-vectors/business">Business vector created by kraphix - www.freepik.com</a>
//<a href="https://www.freepik.com/free-photos-vectors/icon">Icon vector created by studiogstock - www.freepik.com</a>
//<a href="https://www.freepik.com/free-photos-vectors/icon">Icon vector created by studiogstock - www.freepik.com</a>
//<a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by freepik - www.freepik.com</a>

navigator.mediaDevices.getUserMedia ({ audio : true})
 .then(stream => {
     const mediaRecorder = new MediaRecorder(stream);
     mediaRecorder.start();

     const audioChunks = [];

     mediaRecorder.addEventListener("dataavailable", event => {
         audioChunks.push(event.data);
     });


     mediaRecorder.addEventListener("stop", () => {
         const audioBlob = new Blob(audioChunks);
         const audioUrl = URL.createObjectURL(audioBlob);
         const audio = new Audio (audioUrl);
         audio.play();

     });

     setTimeout(() => {
        mediaRecorder.stop();
    }, 3000);
 });

