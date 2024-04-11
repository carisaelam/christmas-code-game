import React from "react";

export default function Dice(props) {
  const styles = {
    backgroundColor: props.isHeld ? "darkgreen" : "",
    color: props.isHeld ? "white" : "",
  };

  return (
    <div style={styles} onClick={props.holdDie} className="die">
      {props.value}
    </div>
  );
}
