import mutations from './mutations.js';
import getRandomNumber from './getrandomnumber.js';
import getRandomProperty from './getrandomproperty.js';
import cloneBrain from './clonebrain.js';
var mutationList = [];
Object.keys(mutations).map((key) => {
	for (let i = 0; i < mutations[key].frequency; i++) {
		mutationList.push(key);
	}
});

function mutate(max, child) {
	var copy = cloneBrain(child);
	console.log('Mutating child:', copy);
	for (let i = 0; i < max; i++) {
		if (mutationList.length > 0) {
			var rand = getRandomNumber(0, mutationList.length - 1);
			var mutation = mutationList[rand];
			//console.log('Debug: ', rand, mutationList, mutation)
			mutations[mutation].mutate(child);
		}
	}
	console.log('Mutation result:', cloneBrain(child));
}

export default mutate;