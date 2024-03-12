// backgroundUpload.js
import { uploadToS3 } from './s3Uploader.js';
import { addToQueue, removeFromQueue, isEmpty } from './uploadQueue.js';

async function processQueue() {
  while (!isEmpty()) {
    const { blob, filename, bucketName, uploadURL } = removeFromQueue();
    try {
      await uploadToS3(blob, filename, bucketName, uploadURL);
      console.log('Background upload completed successfully');
    } catch (error) {
      console.error('Error in background upload:', error);
      // Handle the error, e.g., retry the upload or notify the user
    }
  }
}

function backgroundUpload(blob, filename, bucketName, uploadURL) {
  addToQueue(blob, filename, bucketName, uploadURL);
  processQueue();
}

export { backgroundUpload };
