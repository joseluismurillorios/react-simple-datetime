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
import './transitions.scss';
import './style.scss';
// import './theme.scss';

const HourPicker = ({
  id = Date.now().toString(16),
  value = new Date(),
  onChange,
  onConfirm,
  onCancel,
  controls,
}) => {
  const hourTransRef = useRef(null);
  const minuteTransRef = useRef(null);
  const initialValue = useRef(value);
  const onChangeRef = useRef(onChange);

  const [hours, setHrs] = useState(value.getHours() % 12);
  const [minutes, setMin] = useState(value.getMinutes());
  const [edit, setEdit] = useState(EDIT_HOURS);

  const [am, setAm] = useState(value.getHours() < 12);

  const onHourChange = useCallback((val) => {
    if (am) {
      setHrs(val % 12);
    } else {
      setHrs(val === 0 ? 12 : val);
    }
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
    <div className="dial__picker">
      <div className="dial__picker--main">
        <Display
          hours={hours}
          minutes={minutes}
          edit={edit}
          setEdit={setEdit}
          isAM={am}
          setAm={onAmPmChange}
          ampm={am ? 'AM' : 'PM'}
        />
        <div className="dial__picker--wrapper">
          <CSSTransition
            nodeRef={hourTransRef}
            in={edit === EDIT_HOURS}
            timeout={FADE_MILLI}
            classNames="transition-fade"
            unmountOnExit
            mountOnEnter
          >
            <Dial
              className={`dial-hours ${edit === EDIT_HOURS ? 'active' : 'inactive'}`}
              hour={hours}
              onChange={onHourChange}
              round={30}
              pad={3}
              adder={1}
              clamp={12}
            />
          </CSSTransition>
          <CSSTransition
            nodeRef={minuteTransRef}
            in={edit === EDIT_MINUTES}
            timeout={FADE_MILLI}
            classNames="transition-fade"
            unmountOnExit
            mountOnEnter
          >
            <Dial
              className={`dial-minutes ${edit === EDIT_MINUTES ? 'active' : 'inactive'}`}
              hour={minutes}
              onChange={onMinuteChange}
              round={6}
              pad={15}
              adder={5}
              clamp={60}
            />
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
};

HourPicker.propTypes = {
  id: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  controls: PropTypes.bool,
};

export default HourPicker;
