// audioQueue.js

let queue = [];

function addToQueue(audioData) {
  queue.push(audioData);
}

function removeFromQueue() {
  if (!isEmpty()) {
    return queue.shift();
  }
}

function isEmpty() {
  return queue.length === 0;
}

function size() {
  return queue.length;
}

export { addToQueue, removeFromQueue, isEmpty, size };
