import {drawConnectors, drawLandmarks} from "@mediapipe/drawing_utils/drawing_utils";
import {HAND_CONNECTIONS} from "@mediapipe/hands/hands";

export const draw = (canvasElement, points) => {
  const canvasCtx = canvasElement.getContext('2d');
  // Draw the overlays.
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.fillStyle = "blue";
  canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
  // canvasCtx.drawImage(
  //   results.image, 0, 0, canvasElement.width, canvasElement.height);
  const landmarks = points;
  // eslint-disable-next-line
  drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {color: '#00FF00'});
  drawLandmarks(canvasCtx, landmarks, {
    color: '#00FF00',
    fillColor: '#FF0000',
    radius: () => {
      return 0.1;
    }
  });
  canvasCtx.restore();
}
