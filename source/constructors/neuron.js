import Connection from './connection.js';
import isNumber from '../functions/isnumber.js';
import getRandomNumber from '../functions/getrandomnumber.js';
import getRandomLowNumber from '../functions/getrandomlownumber.js';
import getRandomDecimal from '../functions/getrandomdecimal.js';

var diversity = [];
class Neuron {
  constructor(brain, type) {
    this.type = type;
    this.brain = brain;
    this.brain.counter++;
    this.brain.globalReferenceNeurons[this.brain.counter] = this;
    this.brain.layers[type][this.brain.counter] = this;
    this.active = true;
    this.id = brain.counter;
    this.weight = 2;
    this.lastInputTime = null;
    this.connected = {};
    this.connections = {};
    //this.recentCharges = [];
    //this.memory = getRandomLowNumber(1, 10, 0.7);
    for (let i = 0; i < this.memory; i++) {
      this.recentCharges.push(getRandomDecimal(0, 1));
    }
    this.polarization = getRandomDecimal(0, 1);
    this.threshold = 1; // getRandomDecimal(5, 10); 
    this.chargeRate = getRandomDecimal(0, 1);
    this.gain = getRandomDecimal(0, 0.1);
    this.inverse = getRandomNumber(0, 1);
    if (this.inverse === 0) this.inverse = -1;
    this.bias = getRandomDecimal(0, 1);
    this.recentCharge = 0.5;
    this.bindMethods(this);
    var initialChildrenCount = getRandomLowNumber(1, Object.keys(this.brain.globalReferenceNeurons).length, 0.65);
    var neurons = Object.values(this.brain.globalReferenceNeurons);
    for (let i = 0; i < initialChildrenCount; i++) {
      let child = neurons[Math.floor(Math.random() * neurons.length)];
      this.connect(child);
    }
  }
  bindMethods(self) {
    self.connect = this.connect.bind(self);
    self.measure = this.measure.bind(self);
    self.delete = this.delete.bind(self);
    self.transmit = this.transmit.bind(self);
  }
  test() {
    if ((Object.keys(this.connected).length === 0 || Object.keys(this.connections).length === 0) && this.type != 'input' && this.type != 'output') {
      this.delete();
    }
  };
  connect(target) {
    return new Connection(this.brain, this, target);
  };
  delete() {
    this.brain.deleteNeuron(this.id);
  }
  measure() {
    var output = (((this.recentCharge * this.inverse) + this.bias) / 2) + this.gain;
    if (output > 1) output = 1;
    if (output < 0) output = 0;
    return output;
  }
  transmit(charge) {

    // this is if the neuron has memory, but I'm thinking most neurons probably should not exhibit much memory if any - unclear on this and it should be tested as we improve the model
    // for now testing with no memory.

    //var total = 0;
    //for (let i = 0; i < this.recentCharges.length; i++) {
    //  total += this.recentCharges[i];
    //}
    //var output = (((total / this.recentCharges.length) * this.inverse) + this.bias ) / 2;

    var output = (((charge * this.inverse) + this.bias) / 2) + this.gain; 
    if (output > 1) output = 1;
    if (output < 0) output = 0;
    this.recentCharge = output;
    diversity.push(output);
    var total = 0;
    for (let i = 0; i < diversity.length; i++){
      total += diversity[i];
    }
    var average = total / diversity.length;
    console.log('Received charge ', charge.toFixed(2), ' with bias of ', this.bias.toFixed(2), ' transmitting:', output.toFixed(2), ' making the average neural output ', average.toFixed(2));

    //this.recentCharges.push(charge);
    //if (this.recentCharges.length > this.memory) {
    //  this.recentCharges.splice(0, 1);
    //}

    this.polarization += charge * this.chargeRate;
    if (this.polarization >= this.threshold) {
      this.polarization = 0;
      Object.values(this.connections).forEach(connection => {
        connection.activate(output);
      });
    }
  }
}
export default Neuron;