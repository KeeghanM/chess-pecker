// Algorithm to calculate minimum knight jumps

// Class for storing a cell's data
class cell {
  constructor(x, y, dis) {
    this.x = x
    this.y = y
    this.dis = dis
  }
}

// Utility method returns true if (x, y) lies
// inside Board
function isInside(x, y, N) {
  if (x >= 1 && x <= N && y >= 1 && y <= N) return true
  return false
}

export function minKnightJumps(start, end) {
  if (start == end) {
    return 2
  }

  // Convert SAN to Array (1 based index) eg:
  // a1 = [1,1]
  // b6 = [2,6]
  let knightPos = [start.charCodeAt(0) - 96, parseInt(start.substring(1))]
  let targetPos = [end.charCodeAt(0) - 96, parseInt(end.substring(1))]

  let N = 8
  // x and y direction, where a knight can move
  let dx = [-2, -1, 1, 2, -2, -1, 1, 2]
  let dy = [-1, -2, -2, -1, 1, 2, 2, 1]

  // queue for storing states of knight in board
  let q = []

  // push starting position of knight with 0 distance
  q.push(new cell(knightPos[0], knightPos[1], 0))

  let t
  let x, y
  let visit = new Array(N + 1)

  // make all cell unvisited
  for (let i = 1; i <= N; i++) {
    visit[i] = new Array(N + 1)
    for (let j = 1; j <= N; j++) visit[i][j] = false
  }

  // visit starting state
  visit[knightPos[0]][knightPos[1]] = true

  // loop until we have one element in queue
  while (q.length != 0) {
    t = q.shift()

    // if current cell is equal to target cell,
    // return its distance
    if (t.x == targetPos[0] && t.y == targetPos[1]) return t.dis

    // loop for all reachable states
    for (let i = 0; i < 8; i++) {
      x = t.x + dx[i]
      y = t.y + dy[i]

      // If reachable state is not yet visited and
      // inside board, push that state into queue
      if (isInside(x, y, N) && !visit[x][y]) {
        visit[x][y] = true
        q.push(new cell(x, y, t.dis + 1))
      }
    }
  }
  return Number.MAX_VALUE
}
