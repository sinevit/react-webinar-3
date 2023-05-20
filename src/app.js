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

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteCartItem(code);
    }, [store]),

    onAddCart: useCallback((item) => {
      store.addCartItem(item);
    }, [])
  }

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls setShowModal={setShowModal}
        showModal={showModal}
        cart={cart} />
      <List list={list}
        onAddCart={callbacks.onAddCart}
        isCart={false}
      />
      {showModal && <Modal>
        <Cart cart={cart}
          setShowModal={setShowModal}
          showModal={showModal}
          onDeleteItem={callbacks.onDeleteItem} />
      </Modal>}
    </PageLayout>
  );
}

export default App;
