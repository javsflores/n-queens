// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

    */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // console.log('test this: ', this.rows()[rowIndex]);
      // debugger;
      if (this.rows()[rowIndex].reduce((acc, val) => acc + val) > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //  get all the rows
      // let board = this.rows();
      // iterate over all the rows
      // for (let i = 0; i < this.rows().length; i++) {
      //   // if one of those rows has a conflict
      //   if (this.hasRowConflictAt(i)) {
      //   // return true
      //     return true;
      //   }
      // }
      // return false; // fixme
      if (this.rows().filter((row, index) => this.hasRowConflictAt(index)).length) {
        return true;
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //we will get the value at every row on that specific column
      if (this.rows().filter((row) => row[colIndex] > 0).length > 1) {
        return true;
      }
      //
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // for (let i = 0; i < this.rows().length; i++) {
      //   if (this.hasColConflictAt(i)) {
      //     return true;
      //   }
      // }
      if (this.rows().filter((row, index) => this.hasColConflictAt(index)).length) {
        return true;
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        var row = Math.abs(majorDiagonalColumnIndexAtFirstRow);
        var column = 0;
      } else {
        var row = 0;
        var column = majorDiagonalColumnIndexAtFirstRow;
      }

      var result = [];
      var counter = row;

      for (var i = 0; i < this.rows().length - counter; i++) {
        if (this.rows()[row][column] === 1) {
          result.push(1);
        }
        row++;
        column++;
        if (result.length > 1) {
          return true;
        }
      }
      return false; // fixme
      ///////////////////////////
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // hasMajorDiagonalConflictAt(_getFirstRowColumnIndexForMajorDiagonalOn(0, -3)) to (0, 3)
      // console.log('testing for: ', this);
      let range = this.rows().length;
      let minColIndex = -1 * (range - 1);
      let maxColIndex = range - 1;
      for (let i = minColIndex; i <= maxColIndex; i++) {
        if (this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(0, i))) {
          // flag = true;
          return true;
        }
      }
      // if (flag === false) {
      //   debugger;
      // }
      return false; // fixme
      /////////////////////////////////////// paste below //////////
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      let startRow = 0;
      let startCol = minorDiagonalColumnIndexAtFirstRow;
      let max = this.rows().length - 1;
      let valuesToCheck = [];
      while (startCol >= 0 && startRow <= max) {
        if (startCol <= max && startRow <= max) {
          valuesToCheck.push([startCol, startRow]);
        }
        startCol--;
        startRow++;
      }
      let sum = 0;
      for (let value of valuesToCheck) {
        sum += this.rows()[value[0]][value[1]];
      }
      if (sum > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let range = this.rows().length;
      let minColIndex = 1;
      let maxColIndex = (range - 1) * 2;
      for (let i = minColIndex; i <= maxColIndex; i++) {
        if (this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(0, i))) {
          // flag = true;
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
