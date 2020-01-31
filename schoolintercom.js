const recordbutton = document.getElementById("record_play");
recordbutton.innerText = recordbutton.textContent = 'Click to record';

const sendbutton = document.getElementById("send");
sendbutton.innerText = sendbutton.textContent = 'Send to';

const cancelbutton = document.getElementById("cancel");
cancelbutton.innerText = cancelbutton.textContent = 'Cancel';

document.getElementById("send").disabled = true;
document.getElementById("cancel").disabled = true;

function onClick() {
    var click = document.getElementById("record_play");
    if (click.innerHTML === "Click to record") {
        click.innerHTML = "Recording...";
    } else {
        click.innerHTML = "Play";
    }
}



document.getElementById("send").disabled = false;
    document.getElementById("cancel").disabled = false;
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



