import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import { numberFormat } from '../../utils'
import './style.css';

function CardContent(props) {

  const cn = bem('Card');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.card._id)
  };


  return (
    <article className={cn()}>
      <p className={cn('item')}>{props.card.description}</p>
      <p className={cn('item')}> Страна производитель:
        <b> {props.card.madeIn?.title} ({props.card.madeIn?.code})</b>
      </p>
      <p className={cn('item')}> Категория:
        <b> {props.card.category?.title}</b>
      </p>
      <p className={cn('item')}> Год выпуска:
        <b> {props.card.edition}</b>
      </p>
      <p className={cn('item', { weight: "bold" })}> Цена:  {numberFormat(props.card.price)} ₽</p>
      <button onClick={callbacks.onAdd}> Добавить </button>
    </article>

  );

}

CardContent.propTypes = {
  card: PropTypes.shape({
    description: PropTypes.string,
    madeIn: PropTypes.object,
    category: PropTypes.object,
    edition: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onAdd: propTypes.func,
}

CardContent.defaultProps = {
  onAdd: () => { },
}

export default memo(CardContent);
