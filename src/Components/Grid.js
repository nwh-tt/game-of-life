import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styling/Grid.css";
import Node from "./Node.js";
import Header from "./Header.js";

// this section manages the grid (update and creation) //

const createInitialGrid = () => {
  const grid = [];
  // determines amount of cells to place based on window size
  let width = (0.98 * window.innerWidth) / 30;
  let height = (0.9 * window.innerHeight) / 30;
  let id = 0;

  // adds nodes to the grid represented by a 2d array
  for (let row = 0; row < height; row++) {
    const currentRow = [];
    for (let col = 0; col < width; col++) {
      currentRow.push(createNode(col, row, id));
      id++;
    }
    grid.push(currentRow);
  }
  // addNeighbors adds neighbors for each cell
  addNeighbors(grid);
  return grid;
};

// updates the grid whenever a specific node is clicked
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

// this section renders the grid //

function Grid() {
  const [gridState, setGridState] = useState(createInitialGrid());
  const [mousePressed, setMousePressed] = useState(false);
  // const [intervalId, setIntervalId] = useState(0);
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
    // console.log("made it up");
    setGridState(gridAfterRun);
  };

  // uses map to render the grid, passes the current grid and the handler into header
  return (
    <div>
      <Header grid={grid} handler={handler} />
      <div className="wrapper">
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div className="row" key={rowIdx}>
                {row.map((node, nodeId) => {
                  return (
                    <Node
                      id={nodeId}
                      isAlive={node.isAlive}
                      col={node.col}
                      row={node.row}
                      onMouseDown={handleMouseDown}
                      onMouseEnter={handleMouseEnter}
                      onMouseUp={handleMouseUp}
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

// loops through the grid and adds an array of each nodes neighbors stored
// by each node object
function addNeighbors(grid) {
  for (let i = 0; i < grid.length; i++) {
    let row = grid[i];
    for (let j = 0; j < row.length; j++) {
      let node = row[j];
      node.neighbors = getNeighbors(grid, i, j);
    }
  }
}

// returns an array of the node in grid[row][col] neighbors
function getNeighbors(grid, row, col) {
  let neighbors = [];
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
        neighbors.push({ ...grid[i][j], neighbors: [] });
      }
    }
  }
  return neighbors;
}

// updates the aliveNeighbors value of each neighbor
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

// creates a node object to be stored in the grid array
const createNode = (col, row, id) => {
  return {
    id,
    col,
    row,
    isAlive: "",
    aliveNeighbors: 0,
  };
};

export default Grid;
