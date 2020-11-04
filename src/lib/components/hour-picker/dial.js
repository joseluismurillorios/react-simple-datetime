import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import Selector from './selector';
import Nums from './nums';

import { DIVISIONS, RADIUS } from './constants';
import { getRotation, getTouches, hourToDeg } from './utils';

const Dial = ({
  className,
  hour,
  radius,
  divisions,
  onChange,
  round,
  pad,
  adder,
  clamp,
  style,
}) => {
  const svgRef = useRef(null);

  const onSet = useCallback((val) => {
    onChange(val);
  }, [onChange]);

  const onMove = useCallback((e) => {
    e.preventDefault();
    const {
      clientX,
      clientY,
    } = getTouches(e);
    const {
      value: val,
    } = getRotation(svgRef.current, clientX, clientY, round, pad);
    onSet(val);
  }, [onSet, round, pad]);

  const onDown = useCallback((e) => {
    const {
      clientX,
      clientY,
    } = getTouches(e);
    const {
      value: val,
    } = getRotation(svgRef.current, clientX, clientY, 30, 3);
    onSet(val * adder);
    svgRef.current.addEventListener('mousemove', onMove);
    svgRef.current.addEventListener('touchmove', onMove);
  }, [onSet, onMove, adder]);

  const onUp = useCallback(() => {
    svgRef.current.removeEventListener('mousemove', onMove);
    svgRef.current.removeEventListener('touchmove', onMove);
  }, [onMove]);

  useEffect(() => {
    svgRef.current.addEventListener('mouseup', onUp);
    svgRef.current.addEventListener('mousedown', onDown);
    svgRef.current.addEventListener('touchend', onUp);
    svgRef.current.addEventListener('touchstart', onDown);
    const curRef = svgRef.current;
    return () => {
      curRef.removeEventListener('mouseup', onUp);
      curRef.removeEventListener('mousedown', onDown);
      curRef.removeEventListener('touchend', onUp);
      curRef.removeEventListener('touchstart', onDown);
    };
  }, [onDown, onUp]);

  const degrees = hourToDeg(hour, clamp);
  return (
    <svg ref={svgRef} className={`dial__picker--container ${className}`} viewBox="0 0 300 300" style={style}>
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
  )
}

Dial.defaultProps = {
  className: '',
  hour: 0,
  radius: RADIUS,
  divisions: DIVISIONS,
  onChange: () => {},
  onNumTap: () => {},
  round: 30,
  pad: 3,
  adder: 1,
  clamp: 12,
  style: {},
}

Dial.propTypes = {
  className: PropTypes.string,
  hour: PropTypes.number,
  radius: PropTypes.number,
  divisions: PropTypes.number,
  onChange: PropTypes.func,
  onNumTap: PropTypes.func,
  round: PropTypes.number,
  pad: PropTypes.number,
  adder: PropTypes.number,
  clamp: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.any),
}

export default Dial
