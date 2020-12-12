import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import './style.scss';
import { FADE_MILLI } from './constants';

const ModalPicker = ({
  children,
  isVisible,
  toggleModal,
}) => {
  const hourTransRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={hourTransRef}
      in={isVisible}
      timeout={FADE_MILLI}
      classNames="modal-fade"
      unmountOnExit
      mountOnEnter
    >
      <div className="modalpicker" ref={hourTransRef}>
        <button className="modalpicker__overlay" onClick={toggleModal} />
        <div className="modalpicker__wrapper">
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

ModalPicker.defaultProps = {
  isVisible: false,
  toggleModal: () => {},
  value: new Date(),
  minValue: undefined,
};

ModalPicker.propTypes = {
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool,
  toggleModal: PropTypes.func,
  value: PropTypes.instanceOf(Date),
  minValue: PropTypes.instanceOf(Date),
};

export default ModalPicker;
