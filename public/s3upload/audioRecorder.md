Audio Recorder
The audioRecorder module provides functionality to record audio using the device's microphone and display the recorded audio on the page.

Functions
startRecording(): Starts the audio recording process using the MediaRecorder API. Listens for the 'dataavailable' event to store the recorded audio chunks.
stopRecording(): Stops the audio recording process. Listens for the 'stop' event to create an audio blob from the recorded chunks, display the audio player on the page, and add the audio blob to the queue.
displayAudioPlayer(audioUrl): Creates an audio player element with the provided audioUrl and appends it to the page.
Usage
Import the startRecording and stopRecording functions from the audioRecorder module.
Call startRecording() to begin the audio recording process.
Call stopRecording() to stop the audio recording process. The recorded audio will be displayed on the page and added to the queue.
