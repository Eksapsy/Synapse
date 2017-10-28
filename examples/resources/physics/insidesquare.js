import Square from './square.js';
import isNumber from './isnumber';

function insideSquare(square,x,y){
  if (!square instanceof Square) {
    throw new Error('Inside Square: Object Not Square Type ;(');
  }
  return (x >= square.x - square.width / 2 && x <= square.x + square.width / 2) && (y >= square.y - square.height / 2 && y <= square.y + square.height / 2);
}
export default insideSquare;
