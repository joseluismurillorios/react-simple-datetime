import React from 'react'

const AmPm = ({
  setAm,
  isAM,
}) => {
  const onAM = () => {
    setAm(true);
  };
  const onPM = () => {
    setAm(false);
  };
  return (
    <div className="dial__picker--ampm">
      <div onClick={onAM} className={`dial__picker--ampm-am ${isAM ? 'active' : ''}`}><span>AM</span></div>
      <div onClick={onPM} className={`dial__picker--ampm-pm ${isAM ? '' : 'active'}`}><span>PM</span></div>
    </div>
  )
}

export default AmPm;
