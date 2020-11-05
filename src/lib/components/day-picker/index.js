import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import Display from './display';
import Calendar from './calendar';
import { getDateParams } from './utils';

const DayPicker = ({
  value,
  initial,
}) => {
  const todayDate = useRef(getDateParams()).current;
  const selectedMonth = new Date(initial.setDate(1));
  return (
    <div className="day__picker">
      <div className="day__picker--main">
        <Display />
        <div className="day__picker--wrapper">
          <Calendar />
        </div>
      </div>
    </div>
  )
}

DayPicker.defaultProps = {
  value: new Date(),
  initial: new Date(2020, 1, 25),
};

DayPicker.propTypes = {
  value: PropTypes.instanceOf(Date),
  initial: PropTypes.instanceOf(Date),
};


export default DayPicker;
