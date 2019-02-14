const { Tracer, Array1DTracer, Array2DTracer, LogTracer, Layout, VerticalLayout } = require('algorithm-visualizer');

/*
For N>3 the time taken by this algorithm is sufficiently high
Also it is not possible to visualise for N>6 due to stack overflow
caused by large number of recursive calls
*/
const N = 3;
const board = new Array(N);
for (let i = board.length - 1; i >= 0; i--) {
  board[i] = new Array(N);
}

for (let i = board.length - 1; i >= 0; i--) {
  for (let j = board[i].length - 1; j >= 0; j--) {
    board[i][j] = -1;
  }
}

/*
Define the next move of the knight
*/
const X = [2, 1, -1, -2, -2, -1, 1, 2];
const Y = [1, 2, 2, 1, -1, -2, -2, -1];

const pos = new Array(2);
pos[0] = pos[1] = -1;

const boardTracer = new Array2DTracer('Board').set(board);
const posTracer = new Array1DTracer('Knight Position').set(pos);
const logTracer = new LogTracer('Console');
Layout.setRoot(new VerticalLayout([boardTracer, posTracer, logTracer])).delay();

function knightTour(x, y, moveNum) {
  if (moveNum === N * N) {
    return true;
  }

  for (let i = 0; i < 8; i++) {
    const nextX = x + X[i];
    const nextY = y + Y[i];

    posTracer.patch(0, nextX);
    Tracer.delay();
    posTracer.patch(1, nextY);
    Tracer.delay();
    posTracer.depatch(0);
    posTracer.depatch(1);
    /*
    Check if knight is still in the board
    Check that knight does not visit an already visited square
    */
    if (nextX >= 0 && nextX < N && nextY >= 0 && nextY < N && board[nextX][nextY] === -1) {
      board[nextX][nextY] = moveNum;

      logTracer.println(`Move to ${nextX},${nextY}`);
      boardTracer.patch(nextX, nextY, moveNum);
      Tracer.delay();
      boardTracer.depatch(nextX, nextY);
      boardTracer.select(nextX, nextY);

      const nextMoveNum = moveNum + 1;
      if (knightTour(nextX, nextY, nextMoveNum) === true) {
        return true;
      }
      logTracer.println(`No place to move from ${nextX},${nextY}: Backtrack`);
      board[nextX][nextY] = -1; // backtrack
      boardTracer.patch(nextX, nextY, -1);
      Tracer.delay();
      boardTracer.depatch(nextX, nextY);
      boardTracer.deselect(nextX, nextY);
    } else {
      logTracer.println(`${nextX},${nextY} is not a valid move`);
    }
  }
  return false;
}

board[0][0] = 0; // start from this position
pos[0] = 0;
pos[0] = 0;

boardTracer.patch(0, 0, 0);
Tracer.delay();
posTracer.patch(0, 0);
Tracer.delay();
posTracer.patch(1, 0);
Tracer.delay();
boardTracer.depatch(0, 0);
boardTracer.depatch(0, 0);
posTracer.depatch(0);
posTracer.depatch(1);

if (knightTour(0, 0, 1) === false) {
  logTracer.println('Solution does not exist');
} else {
  logTracer.println('Solution found');
}
