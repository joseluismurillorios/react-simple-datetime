import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const Nums = ({
  num,
  radius,
  onNumTap,
  adder,
}) => {
  const uid = useRef(Date.now().toString(36)).current;
  const step = (2 * Math.PI) / num;
  const offset = 12;

  return (
    Array.from({ length: num }, (_, i) => {
      const angle = step * i;
      const x = Math.round(150 + (radius * Math.cos(angle - Math.PI / 2)) - 23.5);
      const y = Math.round(150 + (radius * Math.sin(angle - Math.PI / 2)) - 23.5);
      const newOffset = i + offset;
      const hr = newOffset > num ? (newOffset) % num : newOffset;
      const val = (hr * adder) % 60;
      return (
        <g
          key={`${uid}-${i}`}
          className="hour__picker--num"
          transform={`translate(${x}, ${y})`}
          onClick={() => {
            onNumTap(val);
          }}
        >
          <circle className="hour__picker--num-bg" fill="#D8D8D8" fillRule="evenodd" cx="23.5" cy="23.5" r="23.5" />
          <text className="hour__picker--num-text" x="23.5" y="25.5" dominantBaseline="middle">
            {val}
          </text>
        </g>
      );
    })
  );
};

Nums.propTypes = {
  num: PropTypes.number,
  radius: PropTypes.number,
  edit: PropTypes.string,
  onNumTap: PropTypes.func,
  setMin: PropTypes.func,
};

export default Nums;
