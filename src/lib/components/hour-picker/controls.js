import React from 'react';
import PropTypes from 'prop-types';

const Controls = ({
  onConfirm,
  onCancel,
}) => (
  <div className="dial__picker--controls">
    <button
      type="button"
      className="dial__picker--controls-control"
      onClick={onCancel}
    >
      Cancel
    </button>
    <button
      type="button"
      className="dial__picker--controls-control"
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
