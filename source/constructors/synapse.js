const Brain = require('./brain');
const clone = require('../functions/clone');

class Synapse {
  constructor(inputSize, outputSize, runFunction) {
    this.runFunction = runFunction;
    this.brain = new Brain(inputSize, outputSize);
    this.run = this.run.bind(this);
  }
  run() {
    var child = clone(this.brain, true);
    child.generate();
    var childScore = this.runFunction(child.input);
    if (childScore === false) {
      return this.brain;
    } else {
      if (this.brain.score) {
        if (this.brain.score > childScore) {
          this.brain = child;
        }
      } else {
        this.brain = child;
      }
      this.brain.score = childScore;
      return this.run();
    }
  }
}
module.exports = Synapse;
