import React from "react";

const ClockWidget = (props) => {
  const { hours, minutes, seconds, ampm } = props.props;
  return (
    <div
      className="clock  text-white font-weight-bold"
      style={{ fontSize: "25px" }}
    >
      {hours === 0 ? 12 : hours > 12 ? hours - 12 : hours}:
      {minutes > 9 ? minutes : `0${minutes}`}:
      {seconds > 9 ? seconds : `0${seconds}`} {ampm}
    </div>
  );
};
export default ClockWidget;
