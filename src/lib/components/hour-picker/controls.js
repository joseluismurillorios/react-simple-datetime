import React from 'react';
import PropTypes from 'prop-types';

const Controls = ({
  onConfirm,
  onCancel,
}) => (
  <div className="hour__picker--controls">
    <button
      type="button"
      className="hour__picker--controls-control"
      onClick={onCancel}
    >
      Cancel
    </button>
    <button
      type="button"
      className="hour__picker--controls-control"
      onClick={onConfirm}
    >
      OK
    </button>
  </div>
);

Controls.defaultProps = {
  onConfirm: () => {},
  onCancel: () => {},
};

Controls.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Controls;
