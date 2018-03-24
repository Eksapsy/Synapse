console.log('Started Example 1');
import Network from '../../source/constructors/network.js';
window.addEventListener("load", function() {
	var inputs = [{
		input: [0, 1],
		output: [1]
	}, {
		input: [1, 0],
		output: [1]
	}, {
		input: [0, 0],
		output: [0]
	}, {
		input: [1, 1],
		output: [0]
	}];
	var network1 = new Network(2, 1, (brain) => {
		var score = 0;
		var diff;
		for (let i = 0; i < 4; i++) {
			var input = inputs[i].input;
			var output = brain.input(input);
			console.log('Input', input);
			console.log('Output', Math.round(output[0]));
			diff = Math.abs(inputs[i].output[0] - output[0]);
			score -= diff;
			//console.log('Output value is ' + output[0] + ' which is a distance of ' + diff + ' from desired output of ' + inputs[i].output[0]);
		}
		console.log('Score', score);
		console.log('---');
		if (score < 0) {
			return score;
		} else {
			return true;
		}
	});
});