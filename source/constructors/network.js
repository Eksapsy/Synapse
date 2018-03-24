import Brain from './brain.js';
import cloneBrain from '../functions/clonebrain.js';
class Network {
  constructor(inputSize, outputSize, getScore) {
    this.topScore = false;
    this.inputSize = inputSize;
    this.outputSize = outputSize;
    this.getScore = getScore;
    this.brain = new Brain(inputSize, outputSize);
    this.child;
    this.ancestors;
    this.bindMethods(this);
    this.run();
  }
  bindMethods(self) {
    self.run = this.run.bind(self);
  }
  run() {
    if (!this.brain.score) {
      this.brain.score = this.getScore(this.brain);
      console.log('Brain born with score of ' + this.brain.score);
      setTimeout(this.run, 100);
    } else {
      this.child = cloneBrain(this.brain);
      this.child.generate();
      var childScore = this.getScore(cloneBrain(this.child));
      this.child.score = childScore;
      console.log('Child scored: ' + this.child.score);
      if (childScore === true) {
        this.complete = true;
        console.log('Evolution complete.');
        return true;
      } else {
        if (this.brain.score < this.child.score) {
          alert('!!! Evolved from ' + this.brain.score + ' to ' + this.child.score + '.');
          this.brain = cloneBrain(this.child);
        }
        console.log('Child score of: ' + this.child.score + ' was not enough to outperform brain score of ' + this.brain.score);
      }
      setTimeout(this.run, 100);
    }
  }
}
export default Network;