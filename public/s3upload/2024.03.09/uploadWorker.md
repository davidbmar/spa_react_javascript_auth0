Upload Worker
The uploadWorker module handles the background task of processing the audio file queue and uploading the audio files to S3 using signed URLs.

Functions
processQueue(): Continuously processes the audio files from the queue. Retrieves the next audio data from the queue, obtains a signed URL for S3 upload, and calls uploadToS3() to upload the audio file. Recursively processes the next item in the queue after a successful upload.
uploadToS3(audioData, signedUrl): Uploads the provided audioData to S3 using the specified signedUrl. Returns a promise that resolves if the upload is successful and rejects if an error occurs.
getSignedUrl(): Implements the logic to obtain a signed URL for S3 upload. This function should make an API call to your server to generate and return the signed URL.
Usage
Import the processQueue function from the uploadWorker module.
Call processQueue() to start processing the audio files from the queue. The function will continuously process the queue until it is empty.
Note: The getSignedUrl() function needs to be implemented based on your specific server-side setup for generating signed URLs for S3 uploads.


