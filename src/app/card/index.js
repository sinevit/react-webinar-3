import { memo, useCallback, useEffect } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import CardContent from "../../components/item-card";
import { useParams } from 'react-router-dom';
import Menu from '../../components/menu';
import MenuLayout from '../../components/menu-layout';
import Preloader from '../../components/preloader';

function Card() {

  const store = useStore();
  let { id } = useParams();

  useEffect(() => {
    store.actions.modals.close();
    store.actions.card.loadCard(id);
  }, [id]);

  const select = useSelector(state => ({
    card: state.card.card,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout>
      <Head title={select.card?.title} />
      <MenuLayout>
        <Menu title='Главная' href='/' />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
          sum={select.sum} />
      </MenuLayout>
      {select.card
        ? <CardContent card={select.card} onAdd={callbacks.addToBasket} />
        : <Preloader />}
    </PageLayout>
  );
}

export default memo(Card);
