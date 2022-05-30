function Node(props) {
  // const onClick = props.onClick;
  const onMouseDown = props.onMouseDown;
  const onMouseEnter = props.onMouseEnter;
  const onMouseUp = props.onMouseUp;
  return (
    <div
      className={`node-${props.isAlive}`}
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
