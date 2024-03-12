/**
  * Uploads a file to S3 using a signed URL.
  * @param {Blob} blob - The file blob to be uploaded.
  * @param {string} filenameToUploadToHost - The desired filename for the uploaded file.
  * @param {string} bucketName - The name of the S3 bucket to upload the file to.
  * @param {string} uploadURL - The URL to obtain the S3 signed URL from.
  */
async function uploadToS3(blob, filenameToUploadToHost, bucketName, uploadURL) {
  try {
    let presignResponse = await fetch(uploadURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "bucket_name": bucketName,
        "file_key": filenameToUploadToHost,
        "expiry_time": 3600,
        "action": "upload"
      })
    });

    let presignData = await presignResponse.json();
    let presignedURL = presignData.url;

    await fetch(presignedURL, {
      method: 'PUT',
      body: blob,
      headers: {
        'Content-Type': 'audio/flac'
      }
    });

    console.log('Audio file uploaded successfully');
  } catch (error) {
    console.error('Error uploading audio file:', error);
    throw error;
  }
}

export { uploadToS3 };
