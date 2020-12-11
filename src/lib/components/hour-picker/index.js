import React, {
  useCallback,
  useEffect,
  useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import Controls from './controls';
import Display from './display';
import Dial from './dial';

import { EDIT_HOURS, EDIT_MINUTES, FADE_MILLI } from './constants';
import { parse24hours } from './utils';

import './transitions.scss';
import './style.scss';

const HourPicker = ({
  id,
  value = new Date(),
  onChange,
  onConfirm,
  onCancel,
  controls,
  autoToggle,
  initialEdit,
}) => {
  const hourTransRef = useRef(null);
  const minuteTransRef = useRef(null);
  const initialValue = useRef(value);
  const onChangeRef = useRef(onChange);

  const [am, setAm] = useState(value.getHours() < 12);
  const [hours, setHrs] = useState(parse24hours(value.getHours()));
  const [minutes, setMin] = useState(value.getMinutes());

  const [edit, setEdit] = useState(initialEdit);

  const onHourChange = useCallback((val) => {
    const adder = am ? 0 : 12;
    setHrs(parse24hours(val + adder));
    // if (autoToggle) {
    //   setEdit(EDIT_MINUTES);
    // }
  }, [am]);

  const onMinuteChange = useCallback((val) => {
    setMin(val);
  }, []);

  const onAmPmChange = useCallback((val) => {
    setAm(val);
    if (val && hours === 12) {
      setHrs(0);
    } else if (!val && hours === 0) {
      setHrs(12);
    }
  }, [hours]);

  const onHourUpdate = useCallback(() => {
    if (autoToggle) {
      setEdit(EDIT_MINUTES);
    }
  }, [autoToggle]);

  const onFinish = () => {
    console.log('onFinish', initialValue.current.toLocaleTimeString());
    onConfirm({
      name: id,
      value: initialValue.current,
    });
  }

  useEffect(() => {
    const adder = am ? 0 : 12;
    initialValue.current.setHours((hours % 12) + adder, minutes, 0, 0);
    if (onChangeRef.current && typeof onChangeRef.current === 'function') {
      onChangeRef.current({
        name: id,
        value: initialValue.current,
      });
    }
  }, [id, am, hours, minutes]);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  return (
    <div id={id} className="hour__picker">
      <div className="hour__picker--main">
        <Display
          hours={hours}
          minutes={minutes}
          edit={edit}
          setEdit={setEdit}
          isAM={am}
          setAm={onAmPmChange}
        />
        <div className="hour__picker--wrapper">
          <CSSTransition
            nodeRef={hourTransRef}
            in={edit === EDIT_HOURS}
            timeout={FADE_MILLI}
            classNames="transition-fade"
            unmountOnExit
            mountOnEnter
          >
            <div className="hour__picker--transition" ref={hourTransRef}>
              <Dial
                className="dial-hours"
                hour={hours}
                onChange={onHourChange}
                onUpdate={onHourUpdate}
                round={30}
                pad={3}
                adder={1}
                clamp={12}
                active={edit === EDIT_HOURS}
              />
            </div>
          </CSSTransition>
          <CSSTransition
            nodeRef={minuteTransRef}
            in={edit === EDIT_MINUTES}
            timeout={FADE_MILLI}
            classNames="transition-fade"
            unmountOnExit
            mountOnEnter
          >
            <div className="hour__picker--transition" ref={minuteTransRef}>
              <Dial
                className="dial-minutes"
                hour={minutes}
                onChange={onMinuteChange}
                round={6}
                pad={15}
                adder={5}
                clamp={60}
                active={edit === EDIT_MINUTES}
              />
            </div>
          </CSSTransition>
        </div>
      </div>
      {
        controls && (
          <Controls
            onConfirm={onFinish}
            onCancel={onCancel}
          />
        )
      }
    </div>
  );
};

HourPicker.defaultProps = {
  id: '',
  value: undefined,
  onChange: undefined,
  onConfirm: () => {},
  onCancel: () => {},
  controls: false,
  autoToggle: false,
  initialEdit: EDIT_HOURS,
};

HourPicker.propTypes = {
  id: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  controls: PropTypes.bool,
  autoToggle: PropTypes.bool,
  initialEdit: PropTypes.string,
};

export default HourPicker;
