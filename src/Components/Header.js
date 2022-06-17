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
import { PlayFill, ArrowBarRight, Pause, XLg } from "react-bootstrap-icons";
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
  const [size, setSize] = useState(30);
  const [speed, setSpeed] = useState(40);

  // calls the stepConways function at a speed determined by the slider while the game is running
  const run = () => {
    // runs when pause is pressed
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }

    // runs continously while play is pressed
    const newIntervalId = setInterval(() => {
      props.handler((prevGrid) => {
        return stepConways(prevGrid);
      });
    }, 10000 / (speed + 1));
    setIntervalId(newIntervalId);
  };

  // goes one phase at time, updating the grid
  const step = () => {
    props.handler(stepConways(props.grid));
  };

  return (
    <Navbar sticky="top" bg="light" variant="light">
      <Container fluid>
        <h1 className="conways-title">Game of Life</h1>
        <Form>
          <Form.Group as={Row}>
            <Col>
              <Box sx={{ width: 200 }}>
                <Form.Label>Speed</Form.Label>
                <ThemeProvider theme={theme}>
                  <Slider
                    color="primary"
                    value={speed}
                    min={20}
                    max={90}
                    onChange={(e) => {
                      setSpeed(e.target.value);
                      props.passSpeed(speed);
                    }}
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
                    min={20}
                    max={60}
                    onChange={(e) => {
                      if (e.target.value !== size) {
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
          <ButtonGroup>
            <Button variant="light">
              <XLg
                color="#42a5f5"
                size={28}
                onClick={() => {
                  props.clearGrid(size);
                }}
              />
            </Button>
          </ButtonGroup>
          <ButtonGroup className="px-2">
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

/**
 * Loops through the grid and updates each node to either be alive or dead based on the rules of the game
 *
 * @param {*} grid the grid preupdate
 * @returns the grid post-update
 */
function stepConways(prevGrid) {
  // creates a deep copy
  const newGrid = JSON.parse(JSON.stringify(prevGrid));

  // loops through the old grid and updates the new one
  for (let i = 0; i < prevGrid.length; i++) {
    for (let j = 0; j < prevGrid[0].length; j++) {
      const oldNode = prevGrid[i][j];
      let liveNeighbors = oldNode.aliveNeighbors;

      // when the node is currently alive it only lives on if it has 2 or three neighbors
      if (oldNode.isAlive === "alive") {
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          newGrid[i][j].isAlive = "";
          addToNeighbors(newGrid, i, j);
        }
      } else {
        // if the node is dead it will come to life if it has 3 living neighbors
        if (liveNeighbors === 3) {
          newGrid[i][j].isAlive = "alive";
          addToNeighbors(newGrid, i, j); // updates the neighbors of the new node
        }
      }
    }
  }
  return newGrid;
}

/**
 * updates the neighbor count of the nodes neighbors at the given coordinates (row, col)
 *
 * @param {*} newGrid the new grid currently being updated
 * @param {*} row  the y coordinate
 * @param {*} col  the x coordinate
 */
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
