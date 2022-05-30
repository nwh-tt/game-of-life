import React, { useState } from "react";
import "../Styling/Grid.css";
import Node from "./Node.js";

const createInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 30; row++) {
    const currentRow = [];
    for (let col = 0; col < 60; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

function updateGrid(grid, row, col) {
  const updatedGrid = grid.slice();
  const node = updatedGrid[row][col];
  let alive = "";
  if (node.isAlive === "alive") {
    alive = "";
  } else {
    alive = "alive";
  }
  const newNode = {
    ...node,
    isAlive: alive,
  };
  updatedGrid[row][col] = newNode;
  return updatedGrid;
}

function Grid() {
  const [gridState, setGridState] = useState(createInitialGrid());
  const [mousePressed, setMousePressed] = useState(false);

  let grid = gridState;
  /*
  const handleClick = (row, col, e) => {
    setGridState(updateGrid(grid, row, col));
  };
  */
  const handleMouseDown = (row, col, e) => {
    setMousePressed(true);
    setGridState(updateGrid(grid, row, col));
  };
  const handleMouseEnter = (row, col, e) => {
    if (mousePressed) {
      setGridState(updateGrid(grid, row, col));
    }
  };

  const handleMouseUp = () => {
    setMousePressed(false);
  };

  return (
    <div className="grid">
      {grid.map((row, rowIdx) => {
        return (
          <div className="row" key={rowIdx}>
            {row.map((node) => {
              return (
                <Node
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
  );
}

const createNode = (col, row) => {
  return {
    col,
    row,
    isAlive: "",
  };
};

export default Grid;
