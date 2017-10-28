import isValidObjectType from './isvalidobjecttype';
import collides from './collides';
class Environment {
  constructor(width,height){
    this.width = width;
    this.height = height;
    this.objects = [];
    this.allowCollision = false;
    this.addObject = this.addObject.bind(this);
    this.setObjectPosition = this.setObjectPosition.bind(this);
    this.outsideBoundaries = this.outsideBoundaries.bind(this);
  }
  addObject(object){
    if (typeof object !== 'object' || !isValidObjectType(object)) {
      throw new Error('Environment: Cannot Add Object, Invalid Object Type');
    }
    if (object.x < 0 || object.x > this.width || object.y < 0 || object.y > this.height) {
      throw new Error('Environment: Cannot Add Object, Out of Bounds');
    }
    this.objects.push(object);
  }
  setObjectPosition(object,x,y){
    if (!this.objects.includes(object)) {
      throw new Error('Environment: Cannot Set Position Of Unsaved Object!');
    }
    if (this.allowCollision === true  || object.noClip === true) {
      object.x = x;
      object.y = y;
      return true;
    } else {
      if (this.outsideBoundaries(object,x,y)) {
        return false;
      }
      var output = true;
      var oldX = object.x;
      var oldY = object.y;
      object.x = x;
      object.y = y;
      this.objects.forEach(checkObject=>{
        let collision = collides(object,checkObject);
        if (collision) {
          console.log('collision',checkObject);
        }
        if (output === true && object !==checkObject && collision) {
          output = false;
        }
      });
      if (output !== true) {
        object.x = oldX;
        object.y = oldY;
      }
      return output;
    }
  }
  outsideBoundaries(object,x,y){
    if (object.constructor.name === 'Square') {
      return x - object.width / 2 < 0 || x + object.width / 2 > this.width || /*HEIGHT*/y - object.height / 2 < 0 || y + object.height / 2 > this.height;
    } else if (object.constructor.name === 'circle') {

    }
  }
}
export default Environment;
