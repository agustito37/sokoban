/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tile {
  constructor(row, column) {
    this.row = row;
    this.column = column;
    this.imageSrc = "";
  }

  render(stage) {
    let image = new Image();
    if (this.player) {
      image.src = this.player.imageSrc;
    } else if (this.box) {
      image.src = this.box.imageSrc;
    } else {
      image.src = this.imageSrc;
    }

    image.onload = (event) => {
      const bitmap = new createjs.Bitmap(event.target);
      bitmap.scaleX = 0.5;
      bitmap.scaleY = 0.5;
      bitmap.x = this.column * 64;
      bitmap.y = this.row * 64;
      stage.addChild(bitmap);
      stage.update();
    };
  }

}

/* harmony default export */ __webpack_exports__["a"] = Tile;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tile_js__ = __webpack_require__(0);


class Floor extends __WEBPACK_IMPORTED_MODULE_0__tile_js__["a" /* default */] {

  constructor(row, column) {
    super(row, column);
    this.imageSrc = "./PNG/Ground/ground_04.png";
    this.player = false;
    this.box = false;
  }
}

/* harmony default export */ __webpack_exports__["a"] = Floor;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tiles_tile_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tiles_wall_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tiles_player_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tiles_box_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__ = __webpack_require__(5);







class Board {

  constructor(textGrid) {

    this.stage = new createjs.Stage("canvas");
    this.textGrid = textGrid;

    this.objectGrid = this.compile();
    this.lastRow    = this.objectGrid.length - 1;
    this.lastCol    = this.objectGrid[0].length - 1;
    this.stepCount  = 0;

    this.render();

  }

  getPlayerInfo() {
    const playerObject = this.playerObject;
    const row    = playerObject.row;
    const column = playerObject.column;
    return { playerObject, row, column };
  }

  getGridObject(row, column) {
    if (row < 0 || column < 0) { return undefined; }
    return this.objectGrid[row][column];
  }

  setGridObject(row, column, object) {
    this.objectGrid[row][column] = object;
  }

  handleLeftMovement() {

    const { playerObject, row, column } = this.getPlayerInfo();
    if (column === 0) { return; }

    const playerTile       = this.getGridObject(row, column);
    const oneLeftOfPlayer = this.getGridObject(row, column - 1);
    const twoLeftOfPlayer = this.getGridObject(row, column - 2);
    const player           = playerTile.player;
    let box;

    if (
      (oneLeftOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_2__tiles_wall_js__["a" /* default */]) ||
      (oneLeftOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && oneLeftOfPlayer.box && twoLeftOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_2__tiles_wall_js__["a" /* default */]) ||
      (oneLeftOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && oneLeftOfPlayer.box && twoLeftOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && twoLeftOfPlayer.box) ||
      (oneLeftOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && oneLeftOfPlayer.box && twoLeftOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && twoLeftOfPlayer.box) ||
      (oneLeftOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && oneLeftOfPlayer.box && twoLeftOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && twoLeftOfPlayer.box) ||
      (oneLeftOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && oneLeftOfPlayer.box && twoLeftOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_2__tiles_wall_js__["a" /* default */]) ||
      (oneLeftOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && oneLeftOfPlayer.box && twoLeftOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && twoLeftOfPlayer.box)
    ) {
      return;
    }

    if (
      (oneLeftOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && !oneLeftOfPlayer.box) ||
      (oneLeftOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && !oneLeftOfPlayer.box)
    ) {
      oneLeftOfPlayer.player = playerTile.player;
      playerTile.player = false;
      player.column -= 1;
      this.render();
      return;
    }

    if (
      (oneLeftOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && !twoLeftOfPlayer.box) ||
      (oneLeftOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && !twoLeftOfPlayer.box)
    ) {
        twoLeftOfPlayer.box = oneLeftOfPlayer.box;
        oneLeftOfPlayer.box = false;
        oneLeftOfPlayer.player = playerTile.player;
        playerTile.player = false;
        player.column -= 1;
        this.render();
        return;
    }

  }

  handleRightMovement() {

    const { playerObject, row, column } = this.getPlayerInfo();
    if (column === this.lastCol) { return; }

    const playerTile       = this.getGridObject(row, column);
    const oneRightOfPlayer = this.getGridObject(row, column + 1);
    const twoRightOfPlayer = this.getGridObject(row, column + 2);
    const player           = playerTile.player;
    let box;

    if (
      (oneRightOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_2__tiles_wall_js__["a" /* default */]) ||
      (oneRightOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && oneRightOfPlayer.box && twoRightOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_2__tiles_wall_js__["a" /* default */]) ||
      (oneRightOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && oneRightOfPlayer.box && twoRightOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && twoRightOfPlayer.box) ||
      (oneRightOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && oneRightOfPlayer.box && twoRightOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && twoRightOfPlayer.box) ||
      (oneRightOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && oneRightOfPlayer.box && twoRightOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && twoRightOfPlayer.box) ||
      (oneRightOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && oneRightOfPlayer.box && twoRightOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_2__tiles_wall_js__["a" /* default */]) ||
      (oneRightOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && oneRightOfPlayer.box && twoRightOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && twoRightOfPlayer.box)
    ) {
      return;
    }

    if (
      (oneRightOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && !oneRightOfPlayer.box) ||
      (oneRightOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && !oneRightOfPlayer.box)
    ) {
      oneRightOfPlayer.player = playerTile.player;
      playerTile.player = false;
      player.column += 1;
      this.render();
      return;
    }

    if (
      (oneRightOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && !twoRightOfPlayer.box) ||
      (oneRightOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && !twoRightOfPlayer.box)
    ) {
        twoRightOfPlayer.box = oneRightOfPlayer.box;
        oneRightOfPlayer.box = false;
        oneRightOfPlayer.player = playerTile.player;
        playerTile.player = false;
        player.column += 1;
        this.render();
        return;
    }

  }



  handleUpMovement() {

    const { playerObject, row, column } = this.getPlayerInfo();
    if (row === 0) { return; }

    const playerTile       = this.getGridObject(row, column);
    const oneNorthOfPlayer = this.getGridObject(row - 1, column);
    const twoNorthOfPlayer = this.getGridObject(row - 2, column);
    const player           = playerTile.player;
    let box;

    if (
      (oneNorthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_2__tiles_wall_js__["a" /* default */]) ||
      (oneNorthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && oneNorthOfPlayer.box && twoNorthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_2__tiles_wall_js__["a" /* default */]) ||
      (oneNorthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && oneNorthOfPlayer.box && twoNorthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && twoNorthOfPlayer.box) ||
      (oneNorthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && oneNorthOfPlayer.box && twoNorthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && twoNorthOfPlayer.box) ||
      (oneNorthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && oneNorthOfPlayer.box && twoNorthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && twoNorthOfPlayer.box) ||
      (oneNorthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && oneNorthOfPlayer.box && twoNorthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_2__tiles_wall_js__["a" /* default */]) ||
      (oneNorthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && oneNorthOfPlayer.box && twoNorthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && twoNorthOfPlayer.box)
    ) {
      return;
    }

    if (
      (oneNorthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && !oneNorthOfPlayer.box) ||
      (oneNorthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && !oneNorthOfPlayer.box)
    ) {
      oneNorthOfPlayer.player = playerTile.player;
      playerTile.player = false;
      player.row -= 1;
      this.render();
      return;
    }

    if (
      (oneNorthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && !twoNorthOfPlayer.box) ||
      (oneNorthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && !twoNorthOfPlayer.box)
    ) {
        twoNorthOfPlayer.box = oneNorthOfPlayer.box;
        oneNorthOfPlayer.box = false;
        oneNorthOfPlayer.player = playerTile.player;
        playerTile.player = false;
        player.row -= 1;
        this.render();
        return;
    }

  }

  handleDownMovement() {
    const { playerObject, row, column } = this.getPlayerInfo();
    if (row === this.lastRow) { return; }

    const playerTile       = this.getGridObject(row, column);
    const oneSouthOfPlayer = this.getGridObject(row + 1, column);
    const twoSouthOfPlayer = this.getGridObject(row + 2, column);
    const player           = playerTile.player;
    let box;

    if (
      (oneSouthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_2__tiles_wall_js__["a" /* default */]) ||
      (oneSouthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && oneSouthOfPlayer.box && twoSouthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_2__tiles_wall_js__["a" /* default */]) ||
      (oneSouthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && oneSouthOfPlayer.box && twoSouthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && twoSouthOfPlayer.box) ||
      (oneSouthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && oneSouthOfPlayer.box && twoSouthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && twoSouthOfPlayer.box) ||
      (oneSouthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && oneSouthOfPlayer.box && twoSouthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && twoSouthOfPlayer.box) ||
      (oneSouthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && oneSouthOfPlayer.box && twoSouthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_2__tiles_wall_js__["a" /* default */]) ||
      (oneSouthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && oneSouthOfPlayer.box && twoSouthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && twoSouthOfPlayer.box)
    ) {
      return;
    }

    if (
      (oneSouthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && !oneSouthOfPlayer.box) ||
      (oneSouthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && !oneSouthOfPlayer.box)
    ) {
      oneSouthOfPlayer.player = playerTile.player;
      playerTile.player = false;
      player.row += 1;
      this.render();
      return;
    }

    if (
      (oneSouthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */] && !twoSouthOfPlayer.box) ||
      (oneSouthOfPlayer instanceof __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */] && !twoSouthOfPlayer.box)
    ) {
        twoSouthOfPlayer.box = oneSouthOfPlayer.box;
        oneSouthOfPlayer.box = false;
        oneSouthOfPlayer.player = playerTile.player;
        playerTile.player = false;
        player.row += 1;
        this.render();
        return;
    }
  }

  gameOver() {
    const flattened = _.flatten(this.objectGrid);
    const checkpoints = flattened.filter(object => {
      return object instanceof __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */];
    });
    return checkpoints.every(checkpoint => {
      return checkpoint.box;
    });
  }

  movePlayer(direction) {
    this.stage.removeAllChildren();

    switch(direction) {
      case "left":
        this.handleLeftMovement();
        break;

      case "right":
        this.handleRightMovement();
        break;

      case "up":
        this.handleUpMovement();
        break;

      case "down":
        this.handleDownMovement();
        break;

      default:
        break;
    }

    this.render();
  }

  compile() {
    return this.textGrid.map((array, rowIndex) => {
      return array.map((symbol, colIndex) => {
        let floor, box, player;
        switch(symbol) {
          case "#":
            return new __WEBPACK_IMPORTED_MODULE_2__tiles_wall_js__["a" /* default */](rowIndex, colIndex);

          case " ":
            return new __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */](rowIndex, colIndex);

          case ".":
            return new __WEBPACK_IMPORTED_MODULE_5__tiles_checkpoint_js__["a" /* default */](rowIndex, colIndex);

          case "$":
            floor = new __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */](rowIndex, colIndex);
            box   = new __WEBPACK_IMPORTED_MODULE_4__tiles_box_js__["a" /* default */](rowIndex, colIndex);
            floor.box = box;
            return floor;

          case "@":
            floor = new __WEBPACK_IMPORTED_MODULE_1__tiles_floor_js__["a" /* default */](rowIndex, colIndex);
            player = new __WEBPACK_IMPORTED_MODULE_3__tiles_player_js__["a" /* default */](rowIndex, colIndex);
            floor.player = player;
            this.playerObject = player;
            return floor;
        }
      });
    });
  }

  render() {
    this.objectGrid.forEach(row => {
      row.forEach(className => {
        className.render(this.stage);
      });
    });
  }


}



/* harmony default export */ __webpack_exports__["a"] = Board;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Level element      Character  ASCII Code
// Wall                  #         0x23
// Player                @         0x40
// Player on goal square +         0x2b
// Box                   $         0x24
// Box on goal square    *         0x2a
// Goal square           .         0x2e
// Floor              (Space)      0x20

const LEVELS = [

  [
    ["#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "#", "#", " ", ".", ".", "@", "#"],
    ["#", "#", "#", " ", "$", "$", " ", "#"],
    ["#", "#", "#", "#", " ", "#", "#", "#"],
    ["#", "#", "#", "#", " ", "#", "#", "#"],
    ["#", "#", "#", "#", " ", "#", "#", "#"],
    ["#", "#", "#", "#", " ", "#", "#", "#"],
    ["#", " ", " ", " ", " ", "#", "#", "#"],
    ["#", " ", "#", " ", " ", " ", "#", "#"],
    ["#", " ", " ", " ", "#", " ", "#", "#"],
    ["#", "#", "#", " ", " ", " ", "#", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#"],
  ],

  [
    ["#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "#", "#", " ", " ", " ", " ", "#"],
    ["#", "@", " ", "$", "#", " ", "#", "#"],
    ["#", " ", "#", " ", " ", ".", " ", "#"],
    ["#", " ", " ", " ", " ", "#", " ", "#"],
    ["#", "#", " ", "#", " ", " ", " ", "#"],
    ["#", "#", " ", " ", " ", "#", "#", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#"]
  ],

  // Super easy - level 1
  [
    ["#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "#", "#", ".", "#", "#", "#", "#"],
    ["#", "#", "#", " ", "#", "#", "#", "#"],
    ["#", "#", "#", "$", " ", "$", ".", "#"],
    ["#", ".", " ", "$", "@", "#", "#", "#"],
    ["#", "#", "#", "#", "$", "#", "#", "#"],
    ["#", "#", "#", "#", ".", "#", "#", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#"],
  ],


  // Super eays - level 2 - Index 3
  [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", " ", " ", "@", "#", "#", "#", "#", "#"],
    ["#", " ", "$", "$", "#", "#", "#", "#", "#"],
    ["#", " ", "$", " ", "#", "#", "#", ".", "#"],
    ["#", "#", "#", " ", "#", "#", "#", ".", "#"],
    ["#", "#", "#", " ", " ", " ", " ", ".", "#"],
    ["#", "#", " ", " ", " ", "#", " ", " ", "#"],
    ["#", "#", " ", " ", " ", "#", "#", "#", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ],

  [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", "#", " ", " ", "#", "#", "#", "#", "#"],
    ["#", "#", "@", "$", " ", " ", "#", "#", "#"],
    ["#", "#", "#", " ", "#", " ", "#", "#", "#"],
    ["#", ".", "#", " ", "#", " ", " ", "#", "#"],
    ["#", ".", "$", " ", " ", "#", " ", "#", "#"],
    ["#", ".", " ", " ", " ", "$", " ", "#", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"]
  ],

  [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
  ]


];

/* harmony default export */ __webpack_exports__["a"] = LEVELS;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tile_js__ = __webpack_require__(0);


class Box extends __WEBPACK_IMPORTED_MODULE_0__tile_js__["a" /* default */] {

  constructor(row, column) {
    super(row, column);
    this.imageSrc = "./PNG/Crates/crate_05.png";
    this.onCheckPoint = false;
  }

}

/* harmony default export */ __webpack_exports__["a"] = Box;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tile_js__ = __webpack_require__(0);


class Checkpoint extends __WEBPACK_IMPORTED_MODULE_0__tile_js__["a" /* default */] {

  constructor(row, column) {
    super(row, column);
    this.imageSrc = "./PNG/Crates/crate_30.png";
    this.player = false;
    this.box = false;
  }

}

/* harmony default export */ __webpack_exports__["a"] = Checkpoint;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tile__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__floor__ = __webpack_require__(1);



class Player extends __WEBPACK_IMPORTED_MODULE_0__tile__["a" /* default */] {

  constructor(row, column) {
    super(row, column);
    this.imageSrc = "./PNG/Player/player_04.png";
  }
}

/* harmony default export */ __webpack_exports__["a"] = Player;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tile_js__ = __webpack_require__(0);


class Wall extends __WEBPACK_IMPORTED_MODULE_0__tile_js__["a" /* default */] {

  constructor(row, column) {
    super(row, column);
    this.imageSrc = "./PNG/Environment/environment_04.png";
  }

}

/* harmony default export */ __webpack_exports__["a"] = Wall;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__levels_js__ = __webpack_require__(3);
// Level element      Character  ASCII Code
// Wall                  #         0x23
// Player                @         0x40
// Player on goal square +         0x2b
// Box                   $         0x24
// Box on goal square    *         0x2a
// Goal square           .         0x2e
// Floor              (Space)      0x20




class Sokoban {

  constructor() {

    this.level = 3;
    const textGrid = __WEBPACK_IMPORTED_MODULE_1__levels_js__["a" /* default */][this.level];

    const canvas =  document.getElementById("canvas");
          canvas.width =  textGrid[0].length * 64;
          canvas.height = textGrid.length * 64;;

    this.board = new __WEBPACK_IMPORTED_MODULE_0__board_js__["a" /* default */](textGrid);
  }

}

const sokoban = new Sokoban();
const board = sokoban.board;
window.board = board;


/* harmony default export */ __webpack_exports__["default"] = Sokoban;

let canvas;
let lastDownTarget;

window.onload = () => {
  canvas = document.getElementById("canvas");

  document.addEventListener("mousedown", (event) => {
    lastDownTarget = event.target;
  });

  document.addEventListener("keydown", function(event) {
    event.preventDefault();
    if(lastDownTarget === canvas) {
      switch(event.keyCode) {
        // left
        case 37:
          board.movePlayer("left");
          break;

        //up
        case 38:
          board.movePlayer("up");
          break;

        //right
        case 39:
          board.movePlayer("right");
          break;

        //down
        case 40:
          board.movePlayer("down");
        break;
      }
    }

    board.stepCount += 1;

  });
};


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map