let mediaRecorder;
let recordedChunks = [];
let audioStream;

const startRecording = async () => {
  const displayStream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: 'screen' },
    audio: true, // Capture user audio
  });

  const audioContext = new AudioContext();
  const audioDestination = audioContext.createMediaStreamDestination();

  // Create a stream to capture system audio
  const systemAudioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const systemAudioSource = audioContext.createMediaStreamSource(systemAudioStream);
  systemAudioSource.connect(audioDestination);

  // Combine screen video stream with system audio
  displayStream.addTrack(audioDestination.stream.getAudioTracks()[0]);

  const options = { mimeType: 'video/webm; codecs=vp9' };
  mediaRecorder = new MediaRecorder(displayStream, options);

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
