const tf = require('@tensorflow/tfjs');
const tfvis = require('@tensorflow/tfjs-vis');
// Optional Load the binding:
// Use '@tensorflow/tfjs-node-gpu' if running with GPU.
const classNames = ['palm', 'fist'];

function getModel(dataSize) {
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
    activation: "relu",
    units: 10,
  }));
  model.add(tf.layers.dense({
    inputShape: [10],
    activation: "relu",
    units: 5,
  }))
  model.add(tf.layers.dense({
    activation: "softmax",
    units: 2,
  }))
  model.compile({
    loss: "sparseCategoricalCrossentropy",
    optimizer: tf.train.adam(),
    metrics: ['accuracy']
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

function prepareTrainDataPacks(data) {
  const dataCopy = [];
  data.forEach(entry => {
    dataCopy.push([
      entry[0],
      [
        entry[1] === "palm" ? 1 : 0,
        entry[1] === "fist" ? 1 : 0
      ]
    ])
  });
  tf.util.shuffle(dataCopy);
  console.log(dataCopy);


  const TRAIN_DATA_SIZE = Math.round(data.length * 0.9);

  const train = dataCopy.slice(0, TRAIN_DATA_SIZE);
  const test = dataCopy.slice(TRAIN_DATA_SIZE, dataCopy.length);
  const trainXs = tf.tensor3d(train.map(entry => entry[0]));
  const trainYs = tf.tensor2d(train.map(entry => entry[1]));
  const testXs = tf.tensor3d(test.map(entry => entry[0]));
  const testYs = tf.tensor2d(test.map(entry => entry[1]));
  return {trainXs, trainYs, testXs, testYs};
}

async function train(model, dataPacks) {
  const {trainXs, trainYs, testXs, testYs} = dataPacks;
  const metrics = ['loss', 'val_loss', 'acc', 'val_acc'];
  const container = {
    name: 'Model Training', tab: 'Model', styles: { height: '1000px' }
  };
  const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);

  return model.fit(trainXs, trainYs, {
    epochs: 15,
    shuffle: true,
    validationData: [testXs.squeeze(), testYs.squeeze()],
    callbacks: fitCallbacks
  }).then((history) => {
    console.log(history)
    return model;
  });
}

function doPrediction(model, dataPacks) {
  const {testXs, testYs} = dataPacks;
  const preds = model.predict(testXs).argMax(-1);

  return [preds, testYs];
}


async function showAccuracy(model, dataPacks) {
  const [preds, labels] = doPrediction(model, dataPacks);
  const classAccuracy = await tfvis.metrics.perClassAccuracy(labels.argMax(-1), preds);
  const container = {name: 'Accuracy', tab: 'Evaluation'};
  tfvis.show.perClassAccuracy(container, classAccuracy, classNames);
}

async function showConfusion(model, dataPacks) {
  const [preds, labels] = doPrediction(model, dataPacks);
  const confusionMatrix = await tfvis.metrics.confusionMatrix(labels.argMax(-1), preds);
  const container = {name: 'Confusion Matrix', tab: 'Evaluation'};
  tfvis.render.confusionMatrix(container, {values: confusionMatrix, tickLabels: classNames});

}

async function evaluate(trainedModel, dataPacks) {
  await showAccuracy(trainedModel, dataPacks);
  await showConfusion(trainedModel, dataPacks);
  return {trainedModel, dataPacks};
}

function dispose(input) {
  const {trainedModel, dataPacks} = input;
  const {trainXs, trainYs, testXs, testYs} = dataPacks;
  trainXs.dispose();
  trainYs.dispose();
  testXs.dispose();
  testYs.dispose();

  return trainedModel;
}

exports.trainModel = function (data) {
  const model = getModel(data.length);
  const dataPacks = prepareTrainDataPacks(data);
  return train(model, dataPacks)
    .then((trainedModel) => evaluate(trainedModel, dataPacks))
    .then(dispose);
}

exports.predict = async function (model, input) {
  const tf = require('@tensorflow/tfjs');
  const prediction = model.predict(tf.tensor(input).expandDims());
  return prediction.data().then(data => {
    return data;
  });
}
