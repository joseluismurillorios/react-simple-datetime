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
  onUpdate,
  round,
  pad,
  adder,
  clamp,
  style,
  active,
}) => {
  const svgRef = useRef(null);
  const valRef = useRef(null);

  const onSet = useCallback((val) => {
    valRef.current = val;
    onChange(val);
  }, [onChange]);

  const onMove = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
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
    e.preventDefault();
    e.stopPropagation();
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
    onUpdate(valRef.current);
  }, [onMove, onUpdate]);

  const onContext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  }

  useEffect(() => {
    const curRef = svgRef.current;
    if (active) {
      svgRef.current.addEventListener('mouseup', onUp);
      svgRef.current.addEventListener('mousedown', onDown);
      svgRef.current.addEventListener('touchend', onUp);
      svgRef.current.addEventListener('touchstart', onDown);
      svgRef.current.addEventListener('contextmenu', onContext);
    }
    return () => {
      if (active) {
        curRef.removeEventListener('mouseup', onUp);
        curRef.removeEventListener('mousedown', onDown);
        curRef.removeEventListener('touchend', onUp);
        curRef.removeEventListener('touchstart', onDown);
        curRef.removeEventListener('contextmenu', onContext);
        curRef.removeEventListener('mousemove', onMove);
        curRef.removeEventListener('touchmove', onMove);
      }
    };
  }, [active, onDown, onUp, onMove]);

  const degrees = hourToDeg(hour, clamp);

  const activeClass = active ? 'active' : '';
  return (
    <svg ref={svgRef} className={`hour__picker--container ${activeClass} ${className}`} viewBox="0 0 300 300" style={style}>
      <g className="clock">
        <circle className="hour__picker--bg" cx="150" cy="150" r="150" />

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
  onUpdate: () => {},
  onNumTap: () => {},
  round: 30,
  pad: 3,
  adder: 1,
  clamp: 12,
  style: {},
  active: true,
}

Dial.propTypes = {
  className: PropTypes.string,
  hour: PropTypes.number,
  radius: PropTypes.number,
  divisions: PropTypes.number,
  onChange: PropTypes.func,
  onUpdate: PropTypes.func,
  onNumTap: PropTypes.func,
  round: PropTypes.number,
  pad: PropTypes.number,
  adder: PropTypes.number,
  clamp: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.any),
  active: PropTypes.bool,
}

export default Dial
