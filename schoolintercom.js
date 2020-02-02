
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

                        const audioChunks = [];

                        mediaRecorder.addEventListener("dataavailable", event => {
                            audioChunks.push(event.data);
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
               
                this.mediaRecorder.stop();

                this.transition("recorded");

            },

            _onExit: function () {
                console.log('exiting recording');
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

            recordPlayButton: function () {
                this.transition("recorded");
            },

            _onExit: function () {
                console.log('exiting recorded');
            }
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










/*const recordPlayButton = document.getElementById("record_play");

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

        const mediaRecorder = startRecording();

    }
}

function enterRecordedState(mediaRecorder) {
    recordPlayButton.innerText = recordPlayButton.textContent = 'Play';

    document.getElementById("cancel").style.display = "block"
    document.getElementById("send").style.display = "block"

    mediaRecorder.stop();

    sendButton.innerText = sendButton.textContent = 'Send';
    cancelButton.innerText = cancelButton.textContent = 'Cancel';

    cancelButton.onclick = function () {
        enterReadyToRecordState();
    }

    sendButton.onclick = function () {
        enterReadyToRecordState();
    }

    recordPlayButton.onclick = function () {
        enterRecordedState();
    }
}


function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            const audioChunks = [];

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            enterRecordedState(mediaRecorder);
        });
};*/



/*mediaRecorder.addEventListener("stop", () => {
    const audioBlob = new Blob(audioChunks);
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();

});

setTimeout(() => {
    mediaRecorder.stop();
});*/


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



