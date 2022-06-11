function Node(props) {
  const onMouseDown = props.onMouseDown;
  const onMouseEnter = props.onMouseEnter;
  const onMouseUp = props.onMouseUp;
  let size = props.size + "px";

  const nodeStyle = (alive, size) => ({
    width: size,
    height: size,
    backgroundColor: alive ? "rgb(0, 0, 0, 0.75)" : "rgb(255, 255, 255)",
    outline: "1px solid rgba(144, 175, 175, 0.75)",
    minWidth: size,
  });

  return (
    <div
      style={nodeStyle(props.isAlive, size)}
      row={props.row}
      col={props.col}
      filled={props.isAlive}
      onMouseDown={() => onMouseDown(props.row, props.col)}
      onMouseEnter={() => onMouseEnter(props.row, props.col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
}

export default Node;
