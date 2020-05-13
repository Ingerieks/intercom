/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }   

const recordPlayButton = document.getElementById("record_play");
const sendButton = document.getElementById("send");
const cancelButton = document.getElementById("cancel");

const fsm = new machina.Fsm({

    namespace: "test",

    initialState: "readyToRecord",

    states: {
        readyToRecord: {
            _onEnter: function () {
                console.log('entering readyToRecord');
                recordPlayButton.innerText = recordPlayButton.textContent = 'Click to record';

                document.getElementById("send").style.display = "none"
                document.getElementById("cancel").style.display = "none"

                this.mediaRecorder = undefined;
                this.audioChunks = undefined;
                this.audio = undefined;
                this.audioBlob = undefined;
            },

            clickRecordPlay: function () {
                console.log('in readyToRecord received clickRecordPlay');

                this.transition("startingRecorder");
            },

            _onExit: function () {
                console.log('exiting readyToRecord');
            },
        },
        startingRecorder: {
            _onEnter: function () {
                console.log('entering startingRecorder');

                navigator.mediaDevices.getUserMedia({ audio: true })
                    .then(stream => {
                        const mediaRecorder = new MediaRecorder(stream);
                        mediaRecorder.start();

                        this.audioChunks = [];

                        mediaRecorder.addEventListener("dataavailable", event => {
                            this.audioChunks.push(event.data);
                        });

                        this.mediaRecorder = mediaRecorder;

                        fsm.handle('recordStarted');

                    });
            },

            recordStarted: function (mediaRecorder) {

                console.log('recordingStarted', mediaRecorder);

                this.transition("recording", mediaRecorder);
            },

            _onExit: function () {
                console.log('exiting startingRecorder');
            },
        },
        recording: {
            _onEnter: function (mediaRecorder) {
                console.log('entering recording', mediaRecorder)
                recordPlayButton.innerText = recordPlayButton.textContent = 'Stop';

                document.getElementById("send").style.display = "none"
                document.getElementById("cancel").style.display = "none"
            },

            clickRecordPlay: function () {

                console.log('In recording, received clickRecordPlay')

                this.mediaRecorder.addEventListener("stop", () => {
                    this.audioBlob = new Blob(this.audioChunks);
                    const audioUrl = URL.createObjectURL(this.audioBlob);
                    this.audio = new Audio(audioUrl);

                    this.handle("stopped");

                });

                this.mediaRecorder.stop();

                this.transition("stopping");

            },

            _onExit: function () {
                console.log('exiting recording');
            }
        },
        stopping: {
            _onEnter: function () {
                console.log('entering stopping')
            },

            stopped: function () {

                console.log('In stopping, received stopped')
                this.transition("recorded");

            },

            _onExit: function () {
                console.log('exiting stopping');
            }
        },
        recorded: {
            _onEnter: function () {
                console.log('entering recorded')
                recordPlayButton.innerText = recordPlayButton.textContent = 'Play';

                document.getElementById("send").style.display = "block"
                document.getElementById("cancel").style.display = "block"

                sendButton.innerText = sendButton.textContent = 'Send';
                cancelButton.innerText = cancelButton.textContent = 'Cancel';

            },

            clickRecordPlay: function () {
                console.log('In recorded, received clickRecordPlay')
                this.audio.play();

            },

            clickCancel: function () {
                this.transition("readyToRecord");
            },

            _onExit: function () {
                console.log('exiting recorded');
            },
            
            clickSend: function () {
              
                const fd = new FormData();
                      fd.append('fname', 'test.wav');
                      fd.append('audio', this.audioBlob);
                $.ajax({
                      type: 'POST',
                      url: 'http://localhost:3000/tracks',
                      data: fd,
                      processData: false,
                      contentType: false
                  }).done(function(data) {
                     console.log(data);

                     fsm.transition("readyToRecord");
                  });

            },
            
            
        },
    }
});

recordPlayButton.onclick = function () {
    fsm.handle('clickRecordPlay')

}

cancelButton.onclick = function () {
    fsm.handle('clickCancel');

}

sendButton.onclick = function () {
    fsm.handle('clickSend');
}











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



