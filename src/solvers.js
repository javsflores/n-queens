/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.findNRooksSolution = function(n) {
  // var solution = undefined; //fixme

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution;

  //

  var solution = new Board({n: n});

  for (var i = 0; i < solution.rows().length; i++) {
    for (var j = 0; j < solution.rows().length; j++) {
      solution.togglePiece(i, j);
      if (solution.hasRowConflictAt(i) || solution.hasAnyColConflicts(j)) {
        solution.togglePiece(i, j);
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme

  let board = new Board({n: n});

  let solutionCounter = function(rowNo) {
    if (rowNo === n) {
      solutionCount++;
      return;
    }
    for (let i = 0; i < n; i++) {
      board.togglePiece(rowNo, i);
      if (!board.hasAnyRooksConflicts()) {
        solutionCounter(rowNo + 1);
      }
      board.togglePiece(rowNo, i);
    }
  };
  solutionCounter(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // var solution = undefined; //fixme

  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  // return solution;
  // TODO: COMPLETE OVER THE WEEKEND...
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  let flag = false;

  let board = new Board({n: n});

  let solutionCounter = function(rowNo) {
    if (rowNo === n) {
      solutionCount++;
      return;
    }
    for (let i = 0; i < n; i++) {
      board.togglePiece(rowNo, i);
      if (!board.hasAnyQueensConflicts()) {
        solutionCounter(rowNo + 1);
      }
      board.togglePiece(rowNo, i);
    }
  };
  solutionCounter(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};