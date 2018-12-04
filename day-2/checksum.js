const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('input-day-2'),
  crlfDelay: Infinity
});

let boxIds = [];

rl.on('line', (line) => {
  boxIds.push(line);;
}).on('close', () => console.log(computeChecksum(boxIds)));


function computeChecksum(boxIds) {
    let idsWithDoubles = 0;
    let idsWithTriples = 0;

    boxIds.forEach((boxId) => {
      console.log(boxId);
      let countMap = countRepeats(boxId);
      if (Object.values(countMap).indexOf(2) > -1) {
        idsWithDoubles++;
        console.log('double');
      }
      if (Object.values(countMap).indexOf(3) > -1) {
        idsWithTriples++;
        console.log('triple');
      }
    });
    console.log(idsWithDoubles);
    console.log(idsWithTriples);
  
    return idsWithDoubles * idsWithTriples;
}

function countRepeats(boxId) {
  let letterCounts = {};
  for (let i = 0; i < boxId.length; i++) {
    let curChar = boxId.charAt(i);
    if (letterCounts[curChar]) {
      letterCounts[curChar] += 1 
    } else {
      letterCounts[curChar] = 1;
    }
  }
  return letterCounts;
}
