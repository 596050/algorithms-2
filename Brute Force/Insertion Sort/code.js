const { Array1DTracer, ChartTracer, LogTracer, Randomize } = require('algorithm-visualizer');

const chart = new ChartTracer();
const tracer = new Array1DTracer().chart(chart);
const logger = new LogTracer();
const D = new Randomize.Array1D(15).create();
tracer.set(D).delay();

logger.println(`original array = [${D.join(', ')}]`);
for (let i = 1; i < D.length; i++) {
  const key = D[i];
  logger.println(`insert ${key}`);
  tracer.select(i).delay();
  let j;
  for (j = i - 1; (j >= 0) && (D[j] > key); j--) {
    D[j + 1] = D[j];
    tracer.patch(j + 1, D[j + 1]).delay();
    tracer.depatch(j + 1);
  }
  D[j + 1] = key;
  tracer.patch(j + 1, D[j + 1]).delay();
  tracer.depatch(j + 1);
  tracer.deselect(i);
}
logger.println(`sorted array = [${D.join(', ')}]`);
