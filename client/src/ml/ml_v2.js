function getModel(tf) {
// Train a simple model:
  // build neural network
  const model = tf.sequential()

  // In the first layer of our convolutional neural network we have
  // to specify the input shape. Then we specify some parameters for
  // the convolution operation that takes place in this layer.
  model.add(tf.layers.conv2d({
    inputShape: [20, 2],
    kernelSize: 5,
    filters: 8,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));

  // The MaxPooling layer acts as a sort of downsampling using max values
  // in a region instead of averaging.
  model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));

  // Repeat another conv2d + maxPooling stack.
  // Note that we have more filters in the convolution.
  model.add(tf.layers.conv2d({
    kernelSize: 5,
    filters: 16,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));
  model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));

  // Now we flatten the output from the 2D filters into a 1D vector to prepare
  // it for input into our last layer. This is common practice when feeding
  // higher dimensional data to a final classification output layer.
  model.add(tf.layers.flatten());

  // Our last layer is a dense layer which has 10 output units, one for each
  // output class (i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9).
  const NUM_OUTPUT_CLASSES = 2;
  model.add(tf.layers.dense({
    units: NUM_OUTPUT_CLASSES,
    kernelInitializer: 'varianceScaling',
    activation: 'softmax'
  }));


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

async function train(model, data) {
  const features = data.map(entry => entry[0]);
  const labels =  data.map(entry => entry[1]).map(item => [
    item === "" ? 1 : 0,
    item === "ok" ? 1 : 0
  ]);

  const metrics = ['loss', 'val_loss', 'acc', 'val_acc'];
  const container = {
    name: 'Model Training', tab: 'Model', styles: { height: '1000px' }
  };

  const xs = tf.tensor2d(features);
  const ys = tf.tensor2d(labels);
  xs.print();
  xs.print();

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

exports.trainModel = function (data) {
  const features = data.map(entry => entry[0]);
  const labels = data.map(entry => entry[1]).map(item => [
    item === "" ? 1 : 0,
    item === "ok" ? 1 : 0
  ]);

  const tf = require('@tensorflow/tfjs');
  // Optional Load the binding:
  // Use '@tensorflow/tfjs-node-gpu' if running with GPU.
  require('@tensorflow/tfjs');

  const model = getModel(tf);
  return train(model, data);
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
