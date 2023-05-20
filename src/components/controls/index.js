import React from "react";
import PropTypes, { bool } from 'prop-types';
import {getCartInfo} from '../../utils'
import './style.css';

function Controls({showModal, setShowModal, cart}){
  console.log('controls')
  return (
    <div className='Controls'>
      <div>
        <p>В корзине:<span>{getCartInfo(cart)}</span></p>
      </div>
      <button onClick={() => setShowModal(!showModal)}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  showModal : PropTypes.bool,
  setShowModal: PropTypes.func,
  cart: PropTypes.array,
};

Controls.defaultProps = {
  setShowModal: () => {}
}

export default React.memo(Controls);
