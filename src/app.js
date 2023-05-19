import React, { useCallback, useState } from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [showModal, setShowModal] = useState(false)

  const { list, cart } = store.getState();
  // const cart = store.getState().cart;
  console.log(list, cart)

  const callbacks = {
    // onDeleteItem: useCallback((code) => {
    //   store.deleteItem(code);
    // }, [store]),

    // onSelectItem: useCallback((code) => {
    //   store.selectItem(code);
    // }, [store]),

    onAddCart: useCallback((item) => {
      store.addCartItem(item);
    }, [])
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls setShowModal={setShowModal}
        showModal={showModal} />
      <List list={list}
        // onDeleteItem={callbacks.onDeleteItem}
        onAddCart={callbacks.onAddCart}
      />
      {showModal && <Modal>
        <Cart cart={cart}
          setShowModal={setShowModal}
          showModal={showModal} />
      </Modal>}
    </PageLayout>
  );
}

export default App;
