// uploadWorker.js

import { removeFromQueue, isEmpty } from './audioQueue.js';
import { uploadToS3 } from './s3Uploader.js';
import { generateFilename } from './filenameGenerator.js';

function processQueue() {
  if (!isEmpty()) {
    const audioData = removeFromQueue();
    const filename = generateFilename();
    const signedUrl = getSignedUrl(); // Function to get the signed URL for S3 upload
    uploadToS3(audioData, filename, 'your-bucket-name', signedUrl)
      .then(() => {
        console.log('Audio file uploaded successfully');
        processQueue(); // Recursively process the next item in the queue
      })
      .catch(error => {
        console.error('Error uploading audio file:', error);
        // Handle the error, e.g., retry the upload or store the audio data for later processing
      });
  }
}

function uploadToS3(audioData, signedUrl) {
  return fetch(signedUrl, {
    method: 'PUT',
    body: audioData
  });
}

function getSignedUrl() {
  // Implement the logic to get the signed URL for S3 upload
  // You can make an API call to your server to generate and return the signed URL
  // Return the signed URL as a string
}

export { processQueue };
