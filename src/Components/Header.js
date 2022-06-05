import {
  Navbar,
  Container,
  Button,
  ButtonToolbar,
  ButtonGroup,
} from "react-bootstrap";
import { PlayFill, ArrowBarRight, Pause } from "react-bootstrap-icons";
import { useState } from "react";

export function PlayButton(props) {
  if (props.isClicked) {
    return (
      <Button onClick={props.onStop} variant="dark">
        <Pause size={28} />
      </Button>
    );
  } else {
    return (
      <Button onClick={props.onStart} variant="dark">
        <PlayFill size={28} />
      </Button>
    );
  }
}

function Header(props) {
  // const [runClicked, setRunClicked] = useState(false);
  const [intervalId, setIntervalId] = useState(0);
  const [update, setUpdate] = useState(0);
  const [grid, setGrid] = useState(props.grid);
  // calls stepConways and passes
  // the updated grid into a function in grid.js that will update the state
  const run = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }

    const newIntervalId = setInterval(() => {
      setGrid((prevGrid) => {
        const temp = stepConways(prevGrid);
        props.handler(temp);
        return temp;
      });
    }, 1000);
    setIntervalId(newIntervalId);
  };

  const stop = () => {
    clearInterval(intervalId);
  };

  const step = () => {
    props.handler(stepConways(props.grid));
  };

  return (
    <Navbar fixed="top" bg="light" variant="light">
      <Container fluid>
        <Navbar.Brand>Conway's Game of Life</Navbar.Brand>
        <ButtonToolbar className="text-left">
          <ButtonGroup className="me-2">
            <Button onClick={run} variant="dark">
              {intervalId ? <Pause size={28} /> : <PlayFill size={28} />}
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={step} variant="light">
              <ArrowBarRight size={28} />
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Container>
    </Navbar>
  );
}

function stepConways(grid) {
  // creates a deep copy
  const newGrid = JSON.parse(JSON.stringify(grid));
  // loops through the old grid updating the new one based off conways rules
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const oldNode = grid[i][j];
      let liveNeighbors = oldNode.aliveNeighbors;

      // when the node is alive it only lives if it has 2 or three neighbors
      if (oldNode.isAlive === "alive") {
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          newGrid[i][j].isAlive = "";
          addToNeighbors(newGrid, i, j);
        }
      } else {
        // if the node is dead it will come to life if it has 3 living neighbors
        if (liveNeighbors === 3) {
          newGrid[i][j].isAlive = "alive";
          addToNeighbors(newGrid, i, j);
        }
      }
    }
  }
  return newGrid;
}

// updates the neighbors aliveNeighbors count based on if the node just came alive or
// died off
function addToNeighbors(newGrid, row, col) {
  const centerNode = newGrid[row][col];
  for (
    let i = Math.max(0, row - 1);
    i <= Math.min(row + 1, newGrid.length - 1);
    i++
  ) {
    for (
      let j = Math.max(0, col - 1);
      j <= Math.min(col + 1, newGrid[0].length - 1);
      j++
    ) {
      // makes sure we only check adjacent nodes and not the center node itself
      if (i !== row || j !== col) {
        if (centerNode.isAlive === "alive") {
          // node just came alive
          newGrid[i][j].aliveNeighbors++;
        } else {
          // node just died
          newGrid[i][j].aliveNeighbors--;
        }
      }
    }
  }
}

export default Header;
