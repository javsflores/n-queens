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

window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

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
  var board = new Board({n: n});

  // var nSolution = function(row) {
  //   if (row === n) {
  //     return;
  //   }
  //   for (var i = 0; i < n; i++) {
  //     board.togglePiece(row, i);

  //     if (!board.hasAnyQueensConflicts()) {
  //       nSolution(row + 1);
  //     }

  //     board.togglePiece(row, i);

  //     if (i === n - 1) {
  //       nSolution(row + 1);
  //     }
  //   }
  // };

  // nSolution(0);

  var result = [];


  var nSolution = function(row) {
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        var solution = 0;
        board.rows().filter(function (row, index) {
          solution += row.reduce((acc, val) => acc + val);
        });
        if (solution === n) {
          const currentBoard = board.rows().slice();
          result.push(currentBoard);
          return;
        }
        nSolution(row + 1);
        // if board sum = n
        // board.rows().filter((row, index) => )

        // return board
        return;
      }
      board.togglePiece(row, i);
    }
  };

  nSolution(0);

  return result[0];

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