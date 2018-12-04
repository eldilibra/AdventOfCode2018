const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('input-day-2'),
  crlfDelay: Infinity
});

let boxIds = [];

rl.on('line', (line) => {
  boxIds.push(line);;
}).on('close', () => console.log(findCommonCharsOfVerySimilarBoxIds(boxIds)));

function findCommonCharsOfVerySimilarBoxIds(boxIds) {
  // this is quadratic... blegh...
  // at least we bail once we find a solution
  for (let i = 0; i < boxIds.length; i++) {
    for (let j = 0; j < boxIds.length; j++) {
      if (i === j) continue;
      const commonChars = removeCharDiffs(boxIds[i], boxIds[j]);
      if (commonChars.length === boxIds[i].length - 1) {
        return commonChars;
      }
    }
  }
  return '';
}

function removeCharDiffs(boxId1, boxId2) {
  let output = '';
  for (let i = 0; i < boxId1.length; i++) {
    if (boxId1.charAt(i) === boxId2.charAt(i)) {
      output += boxId1.charAt(i);
    }
  }
  return output;
}
