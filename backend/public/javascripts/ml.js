exports.trainModel = function (data) {
  const features = data.map(entry => entry[0]);
  const labels =  data.map(entry => entry[1]).map(item => [
    item === "" ? 1 : 0,
    item === "ok" ? 1 : 0
  ]);

  const tf = require('@tensorflow/tfjs');
// Optional Load the binding:
// Use '@tensorflow/tfjs-node-gpu' if running with GPU.
  require('@tensorflow/tfjs-node');

// Train a simple model:
  // build neural network
  const model = tf.sequential()

  model.add(tf.layers.dense({
    inputShape: [10],
    activation: "sigmoid",
    units: 5,
  }))
  model.add(tf.layers.dense({
    inputShape: [5],
    activation: "sigmoid",
    units: 3,
  }))
  model.add(tf.layers.dense({
    activation: "sigmoid",
    units: 2,
  }))
  model.compile({
    loss: "meanSquaredError",
    optimizer: tf.train.adam(.06),
  })
// train/fit our network
  const startTime = Date.now()

  const xs = tf.tensor2d(features);
  const ys = tf.tensor2d(labels);

  return model.fit(xs, ys, {
    epochs: 100,
    callbacks: {
      onBatchEnd,
      onEpochEnd: (epoch, log) => console.log(`Epoch ${epoch}: loss = ${log.loss}`)
    }
  }).then((history) => {
    console.log(history)
    return model;
  });
}

exports.predict = function (model, input) {
  const tf = require('@tensorflow/tfjs');
  console.log(input.distances);
  const prediction = model.predict(tf.tensor(input.distances).expandDims());
  console.log("-------")
  prediction.print();
}

function onBatchEnd(batch, logs) {
  console.log('Batch accuracy', logs.acc);
}
