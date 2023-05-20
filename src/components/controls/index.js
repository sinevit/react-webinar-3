import React from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { getCartInfo } from '../../utils'
import './style.css';

function Controls({ showModal, setShowModal, cart }) {

  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        В корзине:
        <span className={cn('title', { weight: 'bold' })}>{getCartInfo(cart)}</span>
      </div>
      <button className={cn('btn')} onClick={() => setShowModal(!showModal)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  cart: PropTypes.array,
};

Controls.defaultProps = {
  setShowModal: () => { }
}

export default React.memo(Controls);
