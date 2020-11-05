import React from 'react';
// import PropTypes from 'prop-types';

const DisplayDay = () => {
  return (
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
  )
}

DisplayDay.propTypes = {

};

export default DisplayDay;
