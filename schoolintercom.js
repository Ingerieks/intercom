const recordPlayButton = document.getElementById("record_play");

const sendButton = document.getElementById("send");

const cancelButton = document.getElementById("cancel");


enterReadyToRecordState();

function enterReadyToRecordState() {
    recordPlayButton.innerText = recordPlayButton.textContent = 'Click to record';
    recordPlayButton.onclick = function () {
        enterRecordingState();
    }
    document.getElementById("send").style.display = "none"
    document.getElementById("cancel").style.display = "none"
}

function enterRecordingState() {
    recordPlayButton.innerText = recordPlayButton.textContent = 'Stop';
    recordPlayButton.onclick = function () {
        enterRecordedState();
    }
}

function enterRecordedState() {
    recordPlayButton.innerText = recordPlayButton.textContent = 'Play';
    document.getElementById("cancel").style.display = "block"
    document.getElementById("send").style.display = "block"
    sendButton.innerText = sendButton.textContent = 'Send';
    cancelButton.innerText = cancelButton.textContent = 'Cancel';
}


navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        //mediaRecorder.start();

        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });


        mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();

        });

        setTimeout(() => {
            mediaRecorder.stop();
        }, 3000);
    });


/*state: ready to record
buttons:
- record (next state is recording)
 - enabled
 - label Hold to record
 - mouse down eventHandler
- send disabled
- cancel disabled

state: recording
buttons:
- record: (next state is recorded)
 - enabled
 - mouse up event handlr
   - creates next handlers
   - set label to Play
- send disabled
- cancel disabled

state: recorded
buttons:
- record_play: next state recorded
 - label: play
- send enabled  (next state ready to record)
- cancel enabled (next state ready to record)
-

enter state funtion - ready to record (before audio recording code)
*/



