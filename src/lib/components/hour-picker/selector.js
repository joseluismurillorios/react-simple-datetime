import React from 'react';
import PropTypes from 'prop-types';

const Selector = ({
  degrees,
  radius,
}) => {
  const linewidth = 150 + radius;
  return (
    <g className="hour__picker--selector" style={{ transform: `rotate(${degrees}deg)` }}>
      <line className="hour__picker--selector-line" x1="150" y1="150" x2={linewidth - 23.5} y2="150" />
      <circle className="hour__picker--selector-middle" cx="150" cy="150" r="3" />
      <circle className="hour__picker--selector-circle" cx={linewidth} cy="150" r="23.5" />
      {
        degrees % 30 !== 0 && (
          <circle className="hour__picker--selector-circle-inner" cx={linewidth} cy="150" r="6" />
        )
      }
    </g>
  );
};

Selector.defaultProps = {
  degrees: 0,
  radius: 0,
};

Selector.propTypes = {
  degrees: PropTypes.number,
  radius: PropTypes.number,
};

export default Selector;
