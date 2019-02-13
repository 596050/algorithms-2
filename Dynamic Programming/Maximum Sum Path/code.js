const { Array2DTracer, LogTracer, Randomize, Layout, VerticalLayout } = require('algorithm-visualizer');

const D = new Randomize.Array2D(5, 5, new Randomize.Integer(1, 5)).create();
const dataViewer = new Array2DTracer().set(D);
const tracer = new Array2DTracer('Results Table');
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([dataViewer, tracer, logger]));
const DP = [];
for (let i = 0; i < D.length; i++) {
  DP.push([]);
  for (let j = 0; j < D[i].length; j++) {
    DP[i].push(Infinity);
  }
}
tracer.set(DP).delay();

const N = DP.length;
const M = DP[0].length;

function update(i, j, value) {
  DP[i][j] = value;
  dataViewer.select(i, j).delay();
  tracer.patch(i, j, DP[i][j]).delay();
  tracer.depatch(i, j);
  dataViewer.deselect(i, j);
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (i === 0 && j === 0) {
      update(i, j, D[i][j]);
    } else if (i === 0) {
      tracer.select(i, j - 1);
      update(i, j, DP[i][j - 1] + D[i][j]);
      tracer.deselect(i, j - 1);
    } else if (j === 0) {
      tracer.select(i - 1, j);
      update(i, j, DP[i - 1][j] + D[i][j]);
      tracer.deselect(i - 1, j);
    } else {
      tracer.select(i, j - 1).select(i - 1, j);
      update(i, j, Math.max(DP[i][j - 1], DP[i - 1][j]) + D[i][j]);
      tracer.deselect(i, j - 1).deselect(i - 1, j);
    }
  }
}
logger.println(`max = ${DP[N - 1][M - 1]}`);
