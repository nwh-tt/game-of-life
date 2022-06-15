function Node(props) {
  const onMouseDown = props.onMouseDown;
  const onMouseEnter = props.onMouseEnter;
  const onMouseUp = props.onMouseUp;
  let size = props.size + "px";

  const nodeStyle = (alive, size) => ({
    width: size,
    height: size,
    backgroundColor: alive ? "rgb(66, 165, 245, .75)" : "rgb(250, 250, 250)",
    outline: "1px solid rgba(66, 165, 245, .70)",
    minWidth: size,
    transition: "background-color .25s ease-out",
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
