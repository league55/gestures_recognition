import '@mediapipe/control_utils/control_utils.css'
import styles from './video.module.scss'
import React from 'react'
import {initHands} from "../lib/mediapipe/script";


export default function Video({ }) {
  initHands();
  return (
    <div className={styles.container}>
      <video className={styles.input_video}/>
      <canvas className={styles.output_canvas} width="1280px" height="720px"/>

      <div className={styles.shoutout}>
        <div>
          <button id="debugBtn">Debug</button>
          <button id="addBtn">Add</button>
          <button id="cleanBtn">Clean</button>
          <label htmlFor="name">Name</label><input id="name"/>
        </div>
      </div>
    </div>
  )
}
