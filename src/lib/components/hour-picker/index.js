import React, {
  useCallback,
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
  controls,
}) => {
  const initialValue = useRef(value);

  const [hours, setHrs] = useState(value.getHours());
  const [minutes, setMin] = useState(value.getMinutes());
  const [edit, setEdit] = useState(EDIT_HOURS);

  const [am, setAm] = useState(value.getHours() < 12);

  const onHourChange = useCallback((val) => {
    console.log('am', am);
    if (am) {
      setHrs(val % 12);
    } else {
      setHrs(val === 0 ? 12 : val);
    }
  }, [am])

  console.log('ama', am);
  return (
    <div className="dial__picker">
      <div className="dial__picker--main">
        <Display
          hours={hours}
          minutes={minutes}
          edit={edit}
          setEdit={setEdit}
          isAM={am}
          setAm={setAm}
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
                onChange={(val) => {
                  console.log(val)
                  setMin(val);
                }}
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
            // onConfirm={onUpdate}
          />
        )
      }
    </div>
  );
};

HourPicker.defaultProps = {
  id: '',
  value: undefined,
  onChange: () => {},
  controls: false,
};

HourPicker.propTypes = {
  id: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  controls: PropTypes.bool,
};

export default HourPicker;
