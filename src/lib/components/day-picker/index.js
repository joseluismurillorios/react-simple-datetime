import React from 'react';
// import PropTypes from 'prop-types';

import './style.scss';
import Display from './display';
import Calendar from './calendar';

const DayPicker = () => {
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

DayPicker.propTypes = {

};

export default DayPicker;
