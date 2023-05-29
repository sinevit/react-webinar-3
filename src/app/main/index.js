import { memo, useCallback, useEffect } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Paginations from '../../components/paginations';
import Menu from '../../components/menu';
import MenuLayout from '../../components/menu-layout';
import Preloader from '../../components/preloader';

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    limit: state.catalog.limit,
    totalArticlesCount: state.catalog.totalArticlesCount,
    currentPage: state.catalog.currentPage,
    menu: state.menu,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Выбор страницы товаров
    onClickPagination: useCallback((page) => store.actions.catalog.setCurrentPage(page), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} link={`/card/${item._id}`} onAdd={callbacks.addToBasket} />
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин' />
      <MenuLayout>
        <Menu menu={select.menu} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
          sum={select.sum} />
      </MenuLayout>
      {select.list.length
        ? <List list={select.list} renderItem={renders.item} />
        : <Preloader />}
      <Paginations totalArticlesCount={select.totalArticlesCount}
        limit={select.limit}
        currentPage={select.currentPage}
        onClickPagination={callbacks.onClickPagination} />
    </PageLayout>

  );
}

export default memo(Main);
