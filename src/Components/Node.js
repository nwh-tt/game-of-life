function Node(props) {
  const onClick = props.onClick;
  return (
    <div
      className={`node-${props.isAlive}`}
      row={props.row}
      col={props.col}
      filled={props.isAlive}
      onClick={() => onClick(props.row, props.col)}
    ></div>
  );
}

export default Node;
