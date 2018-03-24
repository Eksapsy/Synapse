import Neuron from './neuron.js';
import mutate from '../functions/mutate.js';
import getRandomNumber from '../functions/getrandomnumber.js';
import getRandomLowNumber from '../functions/getrandomlownumber.js';
import createStructure from '../functions/createstructure.js';
import cloneBrain from '../functions/clonebrain-1.0.0.js';
class Brain {
  constructor(inputSize, outputSize) {
    this.bindMethods(this);
    this.score;
    this.inputSize = inputSize;
    this.outputSize = outputSize;
    this.layers = {};
    this.layers.input = {};
    this.layers.hidden = {};
    this.layers.output = {};
    this.counter = 0;
    this.globalReferenceNeurons = {};
    this.globalReferenceConnections = {};
    this.activations = 0;
    this.mutationRate = 1;
    for (let i1 = 0; i1 < outputSize; i1++) {
      new Neuron(this, 'output');
    }
    for (let i1 = 0; i1 < getRandomLowNumber(1, Math.round((inputSize + outputSize) / 2)); i1++) {
      new Neuron(this, 'hidden');
    }
    for (let i1 = 0; i1 < inputSize; i1++) {
      new Neuron(this, 'input');
    }
    for (let prop in this.layers.hidden) {
      this.layers.hidden[prop].test();
    }
    function create(brain, type, count, max) {
      if (count < max) {
        count++;
        new Neuron(brain, type);
        create(brain, type, count, max);
      }
    }
  }
  bindMethods(self) {
    self.deleteNeuron = this.deleteNeuron.bind(self);
    self.deleteConnection = this.deleteConnection.bind(self);
    self.input = this.input.bind(self);
    self.generate = this.generate.bind(self);
    self.getAllNeurons = this.getAllNeurons.bind(self);
    self.getAllConnections = this.getAllConnections.bind(self);
  }
  getAllNeurons() {
    return Object.values(this.globalReferenceNeurons);
  }
  getAllConnections() {
    return Object.values(this.globalReferenceConnections);
  }
  input(array) {
    //console.log('Inputting to brain:', array);
    Object.values(this.layers.input).forEach((input, index) => {
      input.transmit(array[index]);
    });
    return Object.values(this.layers.output).map(neuron => {
      return neuron.measure();
    });
  }
  deleteConnection(connectionId) {
    if (this.globalReferenceConnections.hasOwnProperty(connectionId)) {
      let connection = this.globalReferenceConnections[connectionId];
      let source = connection.source;
      let target = connection.target;
      if (source) {
        if (source.connections[connectionId]) {
          delete source.connections[connectionId];
        }
      } else {
        console.error('!!! [ANOMALY] Connection was deleted but had no source.');
      }
      if (target) {
        if (target.connected[connectionId]) {
          delete target.connected[connectionId];
        }
      } else {
        console.error('!!! [ANOMALY] Connection was deleted but had no target.');
      }
      delete this.globalReferenceConnections[connectionId];
    }
  }
  deleteNeuron(neuronId) {
    if (this.globalReferenceNeurons.hasOwnProperty(neuronId)) {
      let neuron = this.globalReferenceNeurons[neuronId];
      Object.values(neuron.connections).concat(Object.values(neuron.connected)).forEach(connection => {
        connection.delete();
      });
      delete this.globalReferenceNeurons[neuronId];
    }
  }
  generate() {
    this.activations = 0;
    this.mutationRate = getRandomLowNumber(1, 200, 0.75);
    mutate(this.mutationRate, this);
  }
}
export default Brain;