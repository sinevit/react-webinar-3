import React from "react";
// import List from "./components/list";
import Head from "../../components/head";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Cart(props) {

  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <Head title='Корзина' setShowModal={props.setShowModal}
          showModal={props.showModal}/>
        <List list={cart}/>
      </div>
    </div>
  );
}


// Cart.propTypes = {
//   cart: PropTypes.shape({
//     code: PropTypes.number,
//     title: PropTypes.string,
//     count: PropTypes.number
//   }).isRequired,
//   showModal: PropTypes.bool,
//   setShowModal: PropTypes.func
// };

export default React.memo(Cart);
