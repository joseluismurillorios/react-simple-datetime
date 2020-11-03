import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Selector from './selector';
import Nums from './nums';
import { DIVISIONS, RADIUS } from './constants';
import { getRotation, hourToDeg } from './utils';

const Hour = ({
  hour,
  radius,
  divisions,
  onChange,
  round = 30,
  pad = 3,
  adder = 1,
  clamp = 12,
}) => {
  const svgRef = useRef(null);

  const onSet = useRef((val) => {
    onChange(val);
  }).current;

  const onMove = useCallback((e) => {
    const {
      value: val,
    } = getRotation(svgRef.current, e.clientX, e.clientY, round, pad);
    onSet(val);
  }, [onSet, round, pad]);

  const onDown = useCallback((e) => {
    const {
      value: val,
    } = getRotation(svgRef.current, e.clientX, e.clientY, 30, 3);
    onSet(val * adder);
    svgRef.current.addEventListener('mousemove', onMove);
  }, [onSet, onMove, adder]);

  const onUp = useCallback(() => {
    svgRef.current.removeEventListener('mousemove', onMove);
  }, [onMove]);

  useEffect(() => {
    svgRef.current.addEventListener('mouseup', onUp);
    svgRef.current.addEventListener('mousedown', onDown);
    const curRef = svgRef.current;
    return () => {
      curRef.removeEventListener('mouseup', onUp);
      curRef.removeEventListener('mousedown', onDown);
    };
  }, [onDown, onUp]);

  const degrees = hourToDeg(hour, clamp);
  return (
    <div className="dial__picker--wrapper">
      <svg ref={svgRef} className="dial__picker--container" viewBox="0 0 300 300">
        <g className="clock">
          <circle className="dial__picker--bg" cx="150" cy="150" r="150" />

          <Selector degrees={degrees} radius={radius} />

          <Nums
            num={divisions}
            radius={radius}
            adder={adder}
            onNumTap={onSet}
          />
        </g>
      </svg>
    </div>
  )
}

Hour.defaultProps = {
  hour: 0,
  radius: RADIUS,
  divisions: DIVISIONS,
  onChange: () => {},
  onNumTap: () => {},
  round: 30,
  pad: 3,
  adder: 1,
  clamp: 12,
}

Hour.propTypes = {
  hour: PropTypes.number,
  radius: PropTypes.number,
  divisions: PropTypes.number,
  onChange: PropTypes.func,
  onNumTap: PropTypes.func,
  round: PropTypes.number,
  pad: PropTypes.number,
  adder: PropTypes.number,
  clamp: PropTypes.number,
}

export default Hour
