import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styling/Grid.css";
import Node from "./Node.js";
import Header from "./Header.js";

/**
 * Creates an empty grid of nodes based on the size passed in.
 *
 * @param {*} nodeSize the size of the squares in the grid
 * @returns the empty grid of nodes nodesize x nodesize
 */
const createInitialGrid = (nodeSize) => {
  const grid = [];

  let gridWidth = (0.99 * window.innerWidth) / nodeSize;
  let gridHeight = (window.innerHeight - 100) / nodeSize;

  // adds nodes to the grid represented by a 2d array
  for (let row = 0; row < gridHeight; row++) {
    const currentRow = [];
    for (let col = 0; col < gridWidth; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }

  return grid;
};

/**
 * updates the size of the nodes within the grid based on nodeSize. Preserves the current status (alive or dead)
 * of all the nodes and stores them in the newly sized grid
 *
 * @param {*} nodeSize the size to update the nodes to
 * @param {*} grid the current grid so we can keep track of the status of the nodes
 * @returns the grid with the updated nodes size
 */
const changeGridSize = (nodeSize, grid) => {
  const newGrid = grid;
  let width = (0.99 * window.innerWidth) / nodeSize;
  let height = (window.innerHeight - 100) / nodeSize;
  const id = 0;

  // if grid gets more squares added
  if (grid.length < height) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = grid[i].length; j < width; j++) {
        newGrid[i].push(createNode(j, i, id));
      }
    }
    for (let i = grid.length; i < height; i++) {
      const newRow = [];
      for (let j = 0; j < width; j++) {
        newRow.push(createNode(j, i, id));
      }
      newGrid.push(newRow);
    }
  } else if (grid.length > height) {
    // if grid gets less squares added
    for (let i = grid.length - 1; i > height; i--) {
      newGrid.pop();
    }
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = grid[i].length - 1; j > width; j--) {
        newGrid[i].pop();
      }
    }
  }
  return newGrid;
};

/**
 * Flips the nodes status at the given row and column and updates the living node count of the neighbors
 *
 * @param {*} grid the current grid
 * @param {*} row the y coordinate of the node to flip
 * @param {*} col the x coordinate of the node to flip
 * @returns
 */
function updateGrid(grid, row, col) {
  const updatedGrid = grid.slice();
  const node = updatedGrid[row][col];
  // flips the node to the oposite of what is was when clicked
  node.isAlive = node.isAlive ? "" : "alive";
  updatedGrid[row][col] = node;
  // adds or subtracts 1 to the aliveNeighbors count depending on if it died or came alive
  updateNeighborAliveCount(grid, row, col);
  return updatedGrid;
}

function Grid() {
  const [gridState, setGridState] = useState(createInitialGrid(30));
  const [mousePressed, setMousePressed] = useState(false);
  const [size, setSize] = useState(30);

  // changes grid as a mutable copy
  let grid = gridState;

  // handles when you press the mouse down flips nodes life status
  const handleMouseDown = (row, col, e) => {
    setMousePressed(true);
    setGridState(updateGrid(grid, row, col));
  };

  // if mouse is held flips life status of each node you enter
  const handleMouseEnter = (row, col, e) => {
    if (mousePressed) {
      setGridState(updateGrid(grid, row, col));
    }
  };

  // when you lift the mouse it stops flipping nodes you enter
  const handleMouseUp = () => {
    setMousePressed(false);
  };

  // updates the state when you press buttons in the header file
  const handler = (gridAfterRun) => {
    setGridState(gridAfterRun);
  };

  const handleResize = (size) => {
    setSize(size);
    const test = changeGridSize(size, gridState);
    setGridState(test);
    return test;
  };

  // saves the speed of the game to local storage
  const speed = useRef(30);
  const saveSpeed = (rate) => {
    speed.current = rate;
  };

  const clearGrid = (size) => {
    const grid = createInitialGrid(size);
    setGridState(grid);
    return grid;
  };

  // uses map to render the grid, passes the current grid and the handler into header
  return (
    <div>
      <Header
        grid={gridState}
        handler={handler}
        handleResize={handleResize}
        passSpeed={saveSpeed}
        clearGrid={clearGrid}
      />
      <div className="wrapper">
        <div className="grid-">
          {grid.map((row, rowIdx) => {
            return (
              <div className="row-node" key={rowIdx}>
                {row.map((node, nodeId) => {
                  return (
                    <Node
                      id={nodeId}
                      isAlive={node.isAlive}
                      col={node.col}
                      row={node.row}
                      animate={node.animate}
                      onMouseDown={handleMouseDown}
                      onMouseEnter={handleMouseEnter}
                      onMouseUp={handleMouseUp}
                      size={size}
                      speed={speed.current}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * updates the aliveNeighbors count of all the nodes neighbors at the given row and column
 *
 * @param {*} grid the current grid
 * @param {*} row the y coordinate of the node being updated
 * @param {*} col the x coordinate of the node being updated
 */
function updateNeighborAliveCount(grid, row, col) {
  const centerNode = grid[row][col];
  for (
    let i = Math.max(0, row - 1);
    i <= Math.min(row + 1, grid.length - 1);
    i++
  ) {
    for (
      let j = Math.max(0, col - 1);
      j <= Math.min(col + 1, grid[0].length - 1);
      j++
    ) {
      if (i !== row || j !== col) {
        if (centerNode.isAlive === "alive") {
          grid[i][j].aliveNeighbors++;
        } else {
          grid[i][j].aliveNeighbors--;
        }
      }
    }
  }
}

/**
 * creates a node object and stores its position. Also sets the aliveNeighbors count and status to default 0 and ""
 * @param {*} col x coordinate of the node
 * @param {*} row y coordinate of the node
 * @returns the node object
 */
const createNode = (col, row) => {
  return {
    col,
    row,
    isAlive: "",
    aliveNeighbors: 0,
  };
};

export default Grid;
