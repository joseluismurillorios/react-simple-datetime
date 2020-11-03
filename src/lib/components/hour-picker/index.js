import React, {
  useCallback,
  useEffect,
  useRef, useState,
} from 'react';
import PropTypes from 'prop-types';

import Controls from './controls';
import Display from './display';

import './style.scss';
import Dial from './dial';
import { EDIT_HOURS } from './constants';
// import './theme.scss';

const HourPicker = ({
  id = Date.now().toString(16),
  value = new Date(),
  onChange,
  onConfirm,
  controls,
}) => {
  const initialValue = useRef(value);

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
    onConfirm({
      name: id,
      value: initialValue.current,
    });
  }

  useEffect(() => {
    const adder = am ? 0 : 12;
    initialValue.current.setHours((hours % 12) + adder, minutes, 0, 0);
    if (onChange && typeof onChange === 'function') {
      onChange({
        name: id,
        value: initialValue.current,
      });
    }
  }, [id, am, hours, minutes, onChange]);

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
  controls: false,
};

HourPicker.propTypes = {
  id: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  onConfirm: PropTypes.func,
  controls: PropTypes.bool,
};

export default HourPicker;
