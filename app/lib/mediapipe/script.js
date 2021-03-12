// Our input frames will come from here.
import {getDistance} from "./geometry";
import * as assert from "assert";

function appendLines() {}

// const videoElement =
//   document.getElementsByClassName('input_video')[0];
// const canvasElement =
//   document.getElementsByClassName('output_canvas')[0];
// const controlsElement =
//   document.getElementsByClassName('control-panel')[0];
// const canvasCtx = canvasElement.getContext('2d');

// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
const fpsControl = new FPS();

let lastResults = undefined;
let labels = new Map();
labels.set("None", 0);

const getAvg = (values) => {
  return values.reduce((a, b) => a + b, 0) / values.length;
}
assert(getAvg([1, 2, 3]) === 2);
//
// document.getElementById("debugBtn").onclick = () => {
//   const pairs = [[7,8], [6, 8], [5,8], [4,3], [4,2], [12, 11], [11,10], [12, 10], [16, 15], [16, 14]];
//   const a = 7;
//   const b = 8;
//
//   if(lastResults && lastResults.length > 0) {
//     const ax = getAvg(lastResults.map(res => res[0][a].x));
//     const ay = getAvg(lastResults.map(res => res[0][a].y));
//     const az = getAvg(lastResults.map(res => res[0][a].z));
//     const bx = getAvg(lastResults.map(res => res[0][b].x));
//     const by = getAvg(lastResults.map(res => res[0][b].y));
//     const bz = getAvg(lastResults.map(res => res[0][b].z));
//
//     const pointA = {ax, ay, az};
//     const pointB = {bx, by, bz};
//     getDistance(pointA, pointB);
//   }
// }
//
// document.getElementById("save").onclick = () => {
//   lastResults = [];
// }
//
// function getLabel() {
//   return document.getElementById("name").value;
// }

function save(results) {
  if (lastResults) {
    if (lastResults.length < 3) {
      results.forEach(result => result.push(getLabel()));
      console.debug(results);
      lastResults.push(results);
    } else {
      console.debug("saving", results);
      appendLines(lastResults);
      lastResults = undefined;
    }
  }
}

function onResults(results, canvasElement) {
  const canvasCtx = canvasElement.getContext('2d');
  save(results);

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
      drawConnectors(
        canvasCtx, landmarks, HAND_CONNECTIONS,
        {color: isRightHand ? '#00FF00' : '#FF0000'}),
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
}

export function initHands() {
  const hands = new Hands({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/${file}`;
    }
  });
  hands.onResults(onResults);
}

/**
 * Instantiate a camera. We'll feed each frame we receive into the solution.
 */
export function initCamera(videoElement) {
  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await hands.send({image: videoElement});
    },
    width: 1280,
    height: 720
  });
  camera.start();
}

export function initControlPanel(controlsElement) {
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
