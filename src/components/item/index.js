import React, { useState } from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import './style.css';

function Item(props) {

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDeleteItem(props.item.code);
    },
    onAddCart: () => {
      props.onAddCart(props.item);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className='Item-price'>{(props.item.price).toLocaleString()} ₽</div>
      {props.isCart && <div className='Item-count'>{(props.item.count)} шт</div>}
      <div className='Item-actions'>
        {props.isCart
          ? <button onClick={callbacks.onDelete}>Удалить</button>
          : <button onClick={callbacks.onAddCart}>Добавить</button>
        }
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onAddCart: PropTypes.func,
  onAddCart: PropTypes.func,
  isCart: PropTypes.bool
};

Item.defaultProps = {
  onAddCart: () => { },
}

export default React.memo(Item);
