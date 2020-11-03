import React, {
  useCallback,
  useEffect,
  useRef, useState,
} from 'react';
import PropTypes from 'prop-types';

import Controls from './controls';
import Display from './display';
import Dial from './dial';

import { EDIT_HOURS } from './constants';
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
        {
          edit === EDIT_HOURS
            ? (
              <Dial
                hour={hours}
                onChange={onHourChange}
                round={30}
                pad={3}
                adder={1}
                clamp={12}
              />
            )
            : (
              <Dial
                hour={minutes}
                onChange={onMinuteChange}
                round={6}
                pad={15}
                adder={5}
                clamp={60}
              />
            )
        }
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
