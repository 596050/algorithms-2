const { GraphTracer, LogTracer, Randomize, Layout, VerticalLayout } = require('algorithm-visualizer');

const tracer = new GraphTracer().weighted();
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([tracer, logger]));
tracer.log(logger);
const G = new Randomize.Graph(5, 1).weighted().create();
tracer.set(G);
tracer.delay();

function FloydWarshall() {
  // Finds the shortest path between all nodes
  const S = new Array(G.length);
  for (let i = 0; i < G.length; i++) S[i] = new Array(G.length);
  for (let i = 0; i < G.length; i++) {
    for (let j = 0; j < G.length; j++) {
      // Distance to self is always 0
      if (i === j) S[i][i] = 0;
      // Distance between connected nodes is their weight
      else if (G[i][j] > 0) {
        S[i][j] = G[i][j];
      }// Else we don't know the distance and we set it to infinity
      else S[i][j] = MAX_VALUE;
    }
  }
  // If there is a shorter path using k, use it instead
  for (let k = 0; k < G.length; k++) {
    for (let i = 0; i < G.length; i++) {
      if (k === i) continue;
      tracer.visit(k, i);
      tracer.delay();
      for (let j = 0; j < G.length; j++) {
        if (i === j || j === k) continue;
        tracer.visit(j, k);
        tracer.delay();
        if (S[i][j] > S[i][k] + S[k][j]) {
          tracer.visit(j, i, S[i][j]);
          tracer.delay();
          S[i][j] = S[i][k] + S[k][j];
          tracer.leave(j, i, S[i][j]);
        }
        tracer.leave(j, k);
      }
      tracer.leave(k, i);
      tracer.delay();
    }
  }
  for (let i = 0; i < G.length; i++) {
    for (let j = 0; j < G.length; j++) {
      if (S[i][j] === MAX_VALUE) logger.println(`there is no path from ${i} to ${j}`);
      else logger.println(`the shortest path from ${i} to ${j} is ${S[i][j]}`);
    }
  }
}

let MAX_VALUE = Infinity;
logger.println('finding the shortest paths from and to all nodes');
FloydWarshall();
