// Our input frames will come from here.
import {drawConnectors, drawLandmarks, lerp} from '@mediapipe/drawing_utils/drawing_utils';
import {HAND_CONNECTIONS, Hands} from '@mediapipe/hands/hands';
import {Camera} from '@mediapipe/camera_utils/camera_utils';
import {ControlPanel, FPS, Slider, StaticText, Toggle} from '@mediapipe/control_utils/control_utils';

// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
// eslint-disable-next-line
export const fpsControl = new FPS();

const noop = () => {
};

function onResults(results, canvasElement, callback = noop) {
  const canvasCtx = canvasElement.getContext('2d');
  // Update the frame rate.
  fpsControl.tick();

  // Draw the overlays.
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiHandLandmarks && results.multiHandedness) {
    for (let index = 0; index < results.multiHandLandmarks.length; index++) {
      const classification = results.multiHandedness[index];
      const isRightHand = classification.label === 'Right';
      const landmarks = results.multiHandLandmarks[index];
      // eslint-disable-next-line
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {color: isRightHand ? '#00FF00' : '#FF0000'});
      drawLandmarks(canvasCtx, landmarks, {
        color: isRightHand ? '#00FF00' : '#FF0000',
        fillColor: isRightHand ? '#FF0000' : '#00FF00',
        radius: (x) => {
          return lerp(x.from.z, -0.15, .1, 10, 1);
        }
      });
    }
  }
  canvasCtx.restore();
  callback(results);
}

export function initHands(canvasElement, resultsCb) {
  const hands = new Hands({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/${file}`;
    }
  });
  hands.onResults((results) => onResults(results, canvasElement, resultsCb));
  return hands;
}

/**
 * Instantiate a camera. We'll feed each frame we receive into the solution.
 */
export function initCamera(videoElement, hands) {
  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await hands.send({image: videoElement});
    },
    width: 480,
    height: 360
  });
  camera.start();
}

export function initControlPanel(controlsElement, videoElement, hands) {
// Present a control panel through which the user can manipulate the solution
// options.
  new ControlPanel(controlsElement, {
    selfieMode: true,
    maxNumHands: 1,
    minDetectionConfidence: 0.8,
    minTrackingConfidence: 0.5
  })
    .add([
      new StaticText({title: 'MediaPipe Hands'}),
      fpsControl,
      new Toggle({title: 'Selfie Mode', field: 'selfieMode'}),
      new Slider(
        {title: 'Max Number of Hands', field: 'maxNumHands', range: [1, 4], step: 1}),
      new Slider({
        title: 'Min Detection Confidence',
        field: 'minDetectionConfidence',
        range: [0, 1],
        step: 0.01
      }),
      new Slider({
        title: 'Min Tracking Confidence',
        field: 'minTrackingConfidence',
        range: [0, 1],
        step: 0.01
      }),
    ])
    .on(options => {
      videoElement.classList.toggle('selfie', options.selfieMode);
      hands.setOptions(options);
    });
}
