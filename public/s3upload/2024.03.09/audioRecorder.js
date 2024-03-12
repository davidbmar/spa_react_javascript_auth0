// audioRecorder.js

import { addToQueue } from './audioQueue.js';

let mediaRecorder;
let chunks = [];

function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.addEventListener('dataavailable', event => {
        chunks.push(event.data);
      });
      mediaRecorder.start();
    })
    .catch(error => {
      console.error('Error accessing microphone:', error);
    });
}

function stopRecording() {
  mediaRecorder.stop();
  mediaRecorder.addEventListener('stop', () => {
    const audioBlob = new Blob(chunks, { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    displayAudioPlayer(audioUrl);
    addToQueue(audioBlob);   // Queue of things to upload to S3.
    chunks = [];
  });
}

function displayAudioPlayer(audioUrl) {
  const audioPlayer = document.createElement('audio');
  audioPlayer.src = audioUrl;
  audioPlayer.controls = true;
  document.body.appendChild(audioPlayer);
}

export { startRecording, stopRecording };
