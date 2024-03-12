/**
 * Generates a filename based on the current timestamp.
 * @returns {string} - The generated filename.
 */
function generateFilename() {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  return `audio_${timestamp}.flac`;
}

export { generateFilename };


