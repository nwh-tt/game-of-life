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
      <div>
        <Grid callBack={getGrid} />
      </div>
    </div>
  );
}

export default App;
