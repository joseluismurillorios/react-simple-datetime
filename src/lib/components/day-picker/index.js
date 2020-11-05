import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const DayPicker = () => {
  return (
    <div className="day__picker">
      <div className="day__picker--main">
        <div className="day__picker--display">
          <div className="day__picker--display-values">
            <div className="day__picker--display-year">2020</div>
            <div className="day__picker--display-current">
              <div className="day__picker--display-weekday">Tue</div>
              <div className="day__picker--display-day">14</div>
              <div className="day__picker--display-month">Nov</div>
            </div>
          </div>
        </div>
        <div className="day__picker--wrapper"></div>
      </div>
    </div>
  )
}

DayPicker.propTypes = {

}

export default DayPicker
