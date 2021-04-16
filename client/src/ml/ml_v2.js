function getModel(tf, dataSize) {
// Train a simple model:
  // build neural network
  const model = tf.sequential()

  // Now we flatten the output from the 2D filters into a 1D vector to prepare
  // it for input into our last layer. This is common practice when feeding
  // higher dimensional data to a final classification output layer.
  model.add(tf.layers.flatten({inputShape: [21, 2],}));

  // Our last layer is a dense layer which has 10 output units, one for each
  // output class (i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9).
  model.add(tf.layers.dense({
    inputShape: [21],
    activation: "sigmoid",
    units: 10,
  }));

  model.add(tf.layers.dense({
    inputShape: [10],
    activation: "sigmoid",
    units: 5,
  }))
  model.add(tf.layers.dense({
    activation: "sigmoid",
    units: 2,
  }))
  model.compile({
    loss: "meanSquaredError",
    optimizer: tf.train.adam(.06),
  })

  model.summary();

  // Choose an optimizer, loss function and accuracy metric,
  // then compile and return the model
  const optimizer = tf.train.adam();
  model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });
  return model;
}

async function train(tf, model, data) {
  const features = data.map(entry => entry[0]);
  const labels = data.map(entry => entry[1]).map(item => [
    item === "palm" ? 1 : 0,
    item === "fist" ? 1 : 0
  ]);

  const xs = tf.tensor3d(features);
  const ys = tf.tensor2d(labels);
  xs.print();
  xs.print();
  console.log(xs.shape);

  return model.fit(xs, ys, {
    epochs: 100,
    shuffle: true,
    callbacks: {
      onBatchEnd,
      onEpochEnd: (epoch, log) => console.log(`Epoch ${epoch}: loss = ${log.loss}`)
    }
  }).then((history) => {
    console.log(history)
    return model;
  });
}

exports.trainModel = function (data) {
  const tf = require('@tensorflow/tfjs');
  // Optional Load the binding:
  // Use '@tensorflow/tfjs-node-gpu' if running with GPU.
  require('@tensorflow/tfjs');

  const model = getModel(tf, data.length);
  return train(tf, model, data);
}

exports.testModel = async function (model) {
  return model;
}

exports.predict = async function (model, input) {
  const tf = require('@tensorflow/tfjs');
  const prediction = model.predict(tf.tensor(input).expandDims());
  return prediction.data().then(data => {
    return data;
  });
}

function onBatchEnd(batch, logs) {
  console.log('Batch accuracy', logs.acc);
}
