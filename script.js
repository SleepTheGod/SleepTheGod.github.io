let mediaRecorder;
let recordedChunks = [];

const startRecording = async () => {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: 'screen' }
  });
  
  const options = { mimeType: 'video/webm; codecs=vp9' };
  mediaRecorder = new MediaRecorder(stream, options);
  
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.onstop = handleStop;
  
  recordedChunks = [];
  mediaRecorder.start();
};

const handleDataAvailable = (event) => {
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
  }
};

const handleStop = () => {
  const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
  const videoElement = document.getElementById('recordedVideo');
  videoElement.src = URL.createObjectURL(recordedBlob);
};

document.getElementById('startRecording').addEventListener('click', () => {
  startRecording();
});
