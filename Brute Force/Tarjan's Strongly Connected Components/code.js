const { Array1DTracer, GraphTracer, LogTracer, Layout, VerticalLayout } = require('algorithm-visualizer');

const G = [
  [0, 0, 1, 1, 0, 0],
  [1, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 1, 0],
];

const graphTracer = new GraphTracer();
graphTracer.set(G);

const discTracer = new Array1DTracer('Disc');
const lowTracer = new Array1DTracer('Low');
const stackMemberTracer = new Array1DTracer('stackMember');
const stTracer = new Array1DTracer('st');
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([graphTracer, discTracer, lowTracer, stackMemberTracer, stTracer, logger]));

const disc = new Array(G.length);
const low = new Array(G.length);
const stackMember = new Array(G.length);
const st = [];
const carry = { time: 0 };

for (let i = 0; i < G.length; i++) {
  disc[i] = -1;
  low[i] = -1;
  stackMember[i] = false;
}

discTracer.set(disc);
lowTracer.set(low);
stackMemberTracer.set(stackMember);
stTracer.set(st);
stTracer.delay();

function SCCVertex(u, disc, low, st, stackMember, carry) {
  graphTracer.visit(u);
  graphTracer.delay();

  disc[u] = ++carry.time;
  discTracer.patch(u, carry.time);
  discTracer.delay();

  low[u] = carry.time;
  lowTracer.patch(u, carry.time);
  lowTracer.delay();

  st.push(u);
  stTracer.set(st);
  stTracer.delay();

  stackMember[u] = true;
  stackMemberTracer.patch(u, true);
  stackMemberTracer.delay();

  // Go through all vertices adjacent to this
  for (let v = 0; v < G[u].length; v++) {
    if (G[u][v]) {
      // If v is not visited yet, then recur for it
      if (disc[v] === -1) {
        SCCVertex(v, disc, low, st, stackMember, carry);

        // Check if the subtree rooted with 'v' has a
        // connection to one of the ancestors of 'u'
        low[u] = Math.min(low[u], low[v]);
        lowTracer.patch(u, low[u]);
      }

      // Update low value of 'u' only of 'v' is still in stack
      // (i.e. it's a back edge, not cross edge).
      else if (stackMember[v] === true) {
        low[u] = Math.min(low[u], disc[v]);
        lowTracer.patch(u, low[u]);
        lowTracer.delay();
      }
    }
  }

  // head node found, pop the stack and print an SCC
  let w = 0; // To store stack extracted vertices
  if (low[u] === disc[u]) {
    while (st[st.length - 1] !== u) {
      w = st.pop();
      stTracer.set(st);
      stTracer.delay();

      logger.println(w);
      logger.delay();

      stackMember[w] = false;
      stackMemberTracer.patch(w, false);
      stackMemberTracer.delay();
    }

    w = st.pop();
    stTracer.set(st);
    stTracer.delay();

    logger.println(w);
    logger.delay();
    logger.println('------');

    stackMember[w] = false;
    stackMemberTracer.patch(w, false);
    stackMemberTracer.delay();
  }
}

for (let i = 0; i < G.length; i++) {
  if (disc[i] === -1) {
    SCCVertex(i, disc, low, st, stackMember, carry);
  }
}
