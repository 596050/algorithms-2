const { Array1DTracer, ChartTracer, LogTracer, Randomize } = require('algorithm-visualizer');

const chart = new ChartTracer();
const tracer = new Array1DTracer().chart(chart);
const logger = new LogTracer();
const D = new Randomize.Array1D(15, new Randomize.Integer(0, 50)).sorted().create();
tracer.set(D).delay();

function BinarySearch(array, element, minIndex, maxIndex) { // array = sorted array, element = element to be found, minIndex = low index, maxIndex = high index
  if (minIndex > maxIndex) {
    logger.println(`${element} is not found!`);
    return -1;
  }

  const middleIndex = Math.floor((minIndex + maxIndex) / 2);
  const testElement = array[middleIndex];

  tracer.select(minIndex, maxIndex).delay();
  tracer.patch(middleIndex);
  logger.println(`Searching at index: ${middleIndex}`).delay();
  tracer.depatch(middleIndex);
  tracer.deselect(minIndex, maxIndex);

  if (testElement < element) {
    logger.println('Going right.');
    return BinarySearch(array, element, middleIndex + 1, maxIndex);
  }

  if (testElement > element) {
    logger.println('Going left.');
    return BinarySearch(array, element, minIndex, middleIndex - 1);
  }

  if (testElement === element) {
    logger.println(`${element} is found at position ${middleIndex}!`);
    tracer.select(middleIndex);
    return middleIndex;
  }

  logger.println(`${element} is not found!`);
  return -1;
}

const element = D[new Randomize.Integer(0, D.length - 1).create()];

logger.println(`Using binary search to find ${element}`);
BinarySearch(D, element, 0, D.length - 1);
