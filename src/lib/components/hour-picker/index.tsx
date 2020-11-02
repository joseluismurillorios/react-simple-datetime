import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';

import Controls from './controls';
import Display from './display';
import Nums from './nums';
import Selector from './selector';

import { timeToDeg, getRotation } from './utils';

import './style.scss';
// import './theme.scss';

const num = 12;
const radius = 120;

const HourPicker = ({
  id,
  value = new Date(),
  onChange,
  controls,
}) => {
  const svgRef = useRef(null);
  const initialValue = useRef(value);

  const [hours, setHrs] = useState(timeToDeg(value.getHours()));
  const [minutes, setMin] = useState(timeToDeg(value.getMinutes(), 60));
  const [edit, setEdit] = useState('hrs');

  const [am, setAm] = useState(value.getHours() < 12);

  const onConfirm = useCallback(() => {
    const adder = am ? 0 : 12;
    initialValue.current.setHours(hours.value + adder, minutes.value, 0, 0);
    console.log('onConfirm', initialValue.current.toLocaleTimeString());
    onChange({
      name: id,
      value: initialValue.current,
    });
  }, [am, hours.value, id, minutes.value, onChange]);

  const onNumTap = (val) => {
    if (edit === 'hrs') {
      setHrs(timeToDeg(val));
    } else {
      setMin(timeToDeg(val, 60));
    }
  };

  const onSetValue = (deg, val, edits) => {
    if (edits === 'hrs') {
      setHrs({
        degrees: deg,
        value: Math.floor(val),
      });
    } else {
      setMin({
        degrees: deg,
        value: val,
      });
    }
  };

  const onMove = useCallback((e) => {
    const steps = edit === 'hrs' ? 30 : 6;
    const offsets = edit === 'hrs' ? 3 : 15;
    const {
      degrees,
      value: val,
    } = getRotation(svgRef.current, e.clientX, e.clientY, steps, offsets);
    onSetValue(degrees, val, edit);
  }, [edit]);

  const onDown = useCallback((e) => {
    const {
      degrees,
      value: val,
    } = getRotation(svgRef.current, e.clientX, e.clientY, 30, 3);
    const clamped = edit === 'hrs' ? 1 : 5;
    onSetValue(degrees, val * clamped, edit);
    svgRef.current.addEventListener('mousemove', onMove);
  }, [onMove, edit]);

  const onUp = useCallback(() => {
    svgRef.current.removeEventListener('mousemove', onMove);
    onConfirm();
    setTimeout(() => {
      setEdit('min');
    }, 200);
  }, [onMove, onConfirm]);

  useEffect(() => {
    svgRef.current.addEventListener('mouseup', onUp);
    svgRef.current.addEventListener('mousedown', onDown);
    const curRef = svgRef.current;
    return () => {
      curRef.removeEventListener('mouseup', onUp);
      curRef.removeEventListener('mousedown', onDown);
    };
  }, [onDown, onUp]);

  useEffect(() => {
    if (initialValue.current) {
      onConfirm();
    }
  }, [am, onConfirm]);

  return (
    <div className="dial__picker">
      <div className="dial__picker--main">
        <Display
          hours={hours.value}
          minutes={minutes.value}
          edit={edit}
          setEdit={setEdit}
          isAM={am}
          setAm={setAm}
        />
        <div className="dial__picker--wrapper">
          <svg ref={svgRef} className="dial__picker--container" viewBox="0 0 300 300">
            <g className="clock">
              <circle className="dial__picker--bg" cx="150" cy="150" r="150" />

              <Selector degrees={edit === 'hrs' ? hours.degrees : minutes.degrees} radius={radius} />

              <Nums
                num={num}
                radius={radius}
                edit={edit}
                onNumTap={onNumTap}
              />
            </g>
          </svg>
        </div>
      </div>
      {
        controls && (
          <Controls
            onConfirm={onConfirm}
          />
        )
      }
    </div>
  );
};

HourPicker.defaultProps = {
  value: undefined,
  onChange: () => {},
  controls: false,
};

HourPicker.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  controls: PropTypes.bool,
};

export default HourPicker;
