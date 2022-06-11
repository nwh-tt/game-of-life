import "./Styling/App.css";
import Grid from "./Components/Grid";

function App() {
  //let gridToPass;
  const getGrid = (grid) => {
    return grid;
    // console.log("worked");
  };

  return (
    <div className="App">
      <Grid callBack={getGrid} />
    </div>
  );
}

export default App;
