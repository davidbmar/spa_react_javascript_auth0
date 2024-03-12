// uploadQueue.js
let queue = [];

function addToQueue(blob, filename, bucketName, uploadURL) {
  queue.push({ blob, filename, bucketName, uploadURL });
}

function removeFromQueue() {
  if (!isEmpty()) {
    return queue.shift();
  }
}

function isEmpty() {
  return queue.length === 0;
}

export { addToQueue, removeFromQueue, isEmpty };
