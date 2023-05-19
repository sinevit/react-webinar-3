import React from "react";
import PropTypes, { bool } from 'prop-types';
import './style.css';

function Controls({showModal, setShowModal}){
  console.log('controls')
  return (
    <div className='Controls'>
      {!showModal && <button onClick={() => setShowModal(!showModal)}>Перейти</button>}
    </div>
  )
}

Controls.propTypes = {
  showModal : PropTypes.bool,
  setShowModal: PropTypes.func
};

Controls.defaultProps = {
  setShowModal: () => {}
}

export default React.memo(Controls);
