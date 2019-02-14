const { Array1DTracer, GraphTracer, LogTracer, Layout, VerticalLayout } = require('algorithm-visualizer');

const G = [ // G[i][j] indicates whether the path from the i-th node to the j-th node exists or not
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
];

const T = [ // mapping to G as a binary tree , [i][0] indicates left child, [i][1] indicates right child
  [-1, -1],
  [0, 2],
  [-1, -1],
  [1, 4],
  [-1, -1],
  [3, 8],
  [-1, 7],
  [-1, -1],
  [6, 10],
  [-1, -1],
  [9, -1],
];

const treeTracer = new GraphTracer(' Traversal Pre-order ').set(G).layoutTree(5);
const arrayTracer = new Array1DTracer(' Print Pre-order ').set(new Array(T.length).fill('-'));
const logger = new LogTracer(' Log ');
Layout.setRoot(new VerticalLayout([treeTracer, arrayTracer, logger])).delay();

let index = 0;

function preOrder(root, parent) {
  if (root === -1) {
    logger.println('No more nodes. Backtracking.');
    logger.delay();
    return;
  }

  logger.println(`Reached ${root}`);
  treeTracer.visit(root, parent);
  treeTracer.delay();

  logger.println(`Printing ${root}`);
  treeTracer.leave(root);
  arrayTracer.patch(index++, root);
  arrayTracer.delay();

  logger.println(` Going left from ${root}`);
  logger.delay();
  preOrder(T[root][0], root);

  logger.println(` Going right from ${root}`);
  logger.delay();
  preOrder(T[root][1], root);
}

preOrder(5); // node with key 5 is the root
logger.println('Finished');
