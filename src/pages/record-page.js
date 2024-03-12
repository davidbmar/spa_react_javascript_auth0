import React, { useEffect, useRef } from "react";
import { PageLayout } from "../components/page-layout";
import { uploadToS3 } from './s3Uploader.js';
import { backgroundUpload } from './backgroundUpload.js';



export const RecordPage = () => {
  const startRecordingButton = useRef(null);
  const stopRecordingButton = useRef(null);
  const chunkDurationSlider = useRef(null);
  const chunkDurationValue = useRef(null);
  const recordingInfo = useRef(null);
  const recordingsList = useRef(null);

  let mediaRecorder;
  let startTime;
  let chunkDuration = 5;
  let chunkCount = 0;
  let isRecording = false;
  let stopRecordingFlag = false;

  useEffect(() => {
    startRecordingButton.current.addEventListener('click', startRecording);
    stopRecordingButton.current.addEventListener('click', stopRecording);
    chunkDurationSlider.current.addEventListener('input', updateChunkDuration);
  }, []);

  function startRecording() {
    stopRecordingFlag = false;
    startRecordingChunk();
  }

  function startRecordingChunk() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = event => {
          if (event.data && event.data.size > 0) { // Add this condition
            const blob = new Blob([event.data], { type: 'audio/wav' });
            addMediaFile(blob);
          }
        };
        mediaRecorder.start(chunkDuration * 1000);
        startTime = Date.now();
        isRecording = true;
        updateRecordingInfo();
        startRecordingButton.current.disabled = true;
        stopRecordingButton.current.disabled = false;
        setTimeout(stopRecordingChunk, chunkDuration * 1000);
      })
      .catch(console.error);
  }

  function stopRecordingChunk() {
    mediaRecorder.stop();
    isRecording = false;
    updateRecordingInfo();

    if (stopRecordingFlag) {
      stopRecording();
    } else {
      startRecordingChunk();
    }
  }

  function stopRecording() {
    stopRecordingFlag = true;
    startRecordingButton.current.disabled = false;
    stopRecordingButton.current.disabled = true;
  }

  function updateChunkDuration() {
    chunkDuration = parseInt(chunkDurationSlider.current.value);
    chunkDurationValue.current.textContent = chunkDuration;
  }

  function updateRecordingInfo() {
    const duration = isRecording ? Date.now() - startTime : 0;
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    recordingInfo.current.textContent = `Chunk: ${chunkCount}, Duration: ${formattedDuration}`;
  }

  let fileCounter = 1;

  async function addMediaFile(blob) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    const counter = String(fileCounter).padStart(6, '0');
  
    const filename = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}-${milliseconds}-${counter}.flac`;
  
    const uploadURL = 'https://3llwzi00h3.execute-api.us-east-2.amazonaws.com/test/file-upload';
    const bucketName = 'presigned-url-audio-uploads';
  
    console.log('Uploading file:', filename);
    console.log('Blob type:', blob.type);
    console.log('Blob size:', blob.size);
  
    const audioURL = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.src = audioURL;
    chunkCount++;
    recordingsList.current.appendChild(audio);
    recordingsList.current.scrollTop = recordingsList.current.scrollHeight;
  
    backgroundUpload(blob, filename, bucketName, uploadURL);
  
    fileCounter++;
  }
  return (
    <PageLayout>
      <h1>Audio Recorder</h1>
      <div>
        <button ref={startRecordingButton}>Start Recording</button>
        <button ref={stopRecordingButton} disabled>Stop Recording</button>
      </div>
      <div>
        <label htmlFor="chunkDuration">Chunk Duration:</label>
        <input type="range" ref={chunkDurationSlider} min="5" max="30" defaultValue="5" />
        <span ref={chunkDurationValue}>5</span> seconds
      </div>
      <div ref={recordingInfo}></div>
      <h2>Recordings:</h2>
      <div ref={recordingsList} className="recordings-list" style={{ maxHeight: '300px', overflowY: 'auto' }}></div>
    </PageLayout>
  );
};
