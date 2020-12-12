import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Year = ({
  year,
  active,
  onDate,
  onYearClicked,
}) => {
  const [selected, setSelected] = useState(Math.floor(year / 10) * 10);

  const onNext = () => {
    setSelected(selected + 10);
  };

  const onPrev = () => {
    setSelected(selected - 10);
  };

  return (
    <div className={`day__picker--years ${active ? 'active' : ''}`}>
      <div className="day__picker--years-header">
        <button className="day__picker--years-prev" onClick={onPrev}>
          <i className="day__picker--years-control control-prev" />
        </button>
        <button onClick={onDate} className="day__picker--years-current">
          {`${selected}'s`}
        </button>
        <button className="day__picker--years-next" onClick={onNext}>
          <i className="day__picker--years-control control-next" />
        </button>
      </div>
      <div className="day__picker--years-list">
        {
          Array.from({ length: 12 }, (_, i) => selected - 1 + i).map((y) => (
            <button
              key={`year-${y}`}
              className={`day__picker--years-card ${year === y ? 'active' : ''}`}
              onClick={() => { onYearClicked(y); }}
            >
              <div className="day__picker--years-year">{y}</div>
            </button>
          ))
        }
      </div>
    </div>
  )
}

Year.defaultProps = {
  year: (new Date()).getFullYear(),
  active: false,
  onDate: () => {},
  onYearClicked: () => {},
}

Year.propTypes = {
  year: PropTypes.number,
  active: PropTypes.bool,
  onDate: PropTypes.func,
  onYearClicked: PropTypes.func,
}

export default Year
