'use strict';

const ids = function* () {
  const obj = { 0: '0' };
  const free = () => obj;
  let i = 0;
  free.shift = () => {
    let obj1 = {};
    const firstElem = Object.keys(obj)[0];
    const deletedItem = obj[firstElem];
    delete obj[firstElem];
    obj1 = { obj, deletedItem };
    return obj1;
  };
  free.push = a => {
    obj[i] = a;
    i++;
    return obj;
  };
  const prepared = { has: false, value: '' };

  while (true) {
    if (i > 30) break;
    if (prepared.has) {
      prepared.has = false;
      yield prepared.value;
    }
    const nextFree = free.shift();
    free.push('01' + nextFree.deletedItem);
    free.push('00' + nextFree.deletedItem);
    prepared.value = '11' + nextFree.deletedItem;
    prepared.has = true;
    yield '10' + nextFree.deletedItem;
  }
};

module.exports = { ids };
