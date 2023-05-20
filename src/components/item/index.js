import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item(props) {

  const cn = bem('Item');

  const callbacks = {
    onDelete: (e) => {
      e.stopPropagation();
      props.onDeleteItem(props.item.code);
    },
    onAdd: () => {
      props.onAddCart(props.item);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>{props.item.title}</div>
      <div className={props.isCart ? cn('price', { cart: true }) : cn('price')}>{(props.item.price).toLocaleString()} ₽</div>
      {props.isCart && <div className={cn('count')}>{(props.item.count)} шт</div>}
      <div className={cn('actions')}>
        {props.isCart
          ? <button className={cn('btn')} onClick={callbacks.onDelete}>Удалить</button>
          : <button className={cn('btn')} onClick={callbacks.onAdd}>Добавить</button>
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
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  isCart: PropTypes.bool
};

Item.defaultProps = {
  onAdd: () => { },
  onDelete: () => { },
}

export default React.memo(Item);
