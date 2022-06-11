import {
  Navbar,
  Container,
  Button,
  ButtonToolbar,
  ButtonGroup,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { PlayFill, ArrowBarRight, Pause } from "react-bootstrap-icons";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";

const theme = createTheme({
  palette: {
    primary: {
      main: "#42a5f5",
    },
    secondary: {
      main: "#000000",
    },
  },
});

function Header(props) {
  const [intervalId, setIntervalId] = useState(0);
  const [grid, setGrid] = useState(props.grid);
  const [size, setSize] = useState(30);
  const [speed, setSpeed] = useState(40);

  // calls stepConways when play is clicked and updates the grid every 1 second
  // also makes the play button a pause button, when clicked again stops the execution
  // and makes it a play button again
  const run = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }

    const newIntervalId = setInterval(() => {
      console.log(speed);
      setGrid((prevGrid) => {
        const temp = stepConways(prevGrid);
        props.handler(temp);
        return temp;
      });
    }, 1500 / (speed + 1));
    setIntervalId(newIntervalId);
  };

  // goes one phase at time, updating the grid
  const step = () => {
    props.handler(stepConways(props.grid));
  };

  return (
    <Navbar sticky="top" bg="light" variant="light">
      <Container fluid>
        <h2 className="conways-title">Conway's Game of Life</h2>
        <Form>
          <Form.Group as={Row}>
            <Col>
              <Box sx={{ width: 200 }}>
                <Form.Label>Speed</Form.Label>
                <ThemeProvider theme={theme}>
                  <Slider
                    color="primary"
                    value={speed}
                    onChange={(e) => setSpeed(e.target.value)}
                  />
                </ThemeProvider>
              </Box>
            </Col>
            <Col>
              <Box sx={{ width: 200 }}>
                <Form.Label>Size </Form.Label>
                <ThemeProvider theme={theme}>
                  <Slider
                    color="primary"
                    value={size}
                    min={10}
                    max={60}
                    step={10}
                    onChange={(e) => {
                      if (e.target.value !== size) {
                        console.log("called");
                        setSize(e.target.value);
                        props.handleResize(e.target.value);
                      }
                    }}
                  />
                </ThemeProvider>
              </Box>
            </Col>
          </Form.Group>
        </Form>
        <ButtonToolbar className="text-left">
          <ButtonGroup className="me-2">
            <Button
              style={{ background: "#42a5f5", border: "#42a5f5" }}
              onClick={run}
            >
              {intervalId ? (
                <Pause size={28} color="white" />
              ) : (
                <PlayFill size={28} color="white" />
              )}
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={step} variant="light">
              <ArrowBarRight color="#42a5f5" size={28} />
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
