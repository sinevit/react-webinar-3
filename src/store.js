import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Удаление товаров из корзины
   * @param code
   */
  deleteCartItem(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code)
    })
  };

  /**
   * Добавление товаров в корзину
   * @param code
   */
  addCartItem(item) {

    const isCartItem = this.state.cart.find(el => el.code === item.code)

    if(isCartItem){
      isCartItem.count++
      this.setState({
        ...this.state,
        cart: [...this.state.cart]
      })
    }else{
      this.setState({
        ...this.state,
        cart: [...this.state.cart, {...item, count: 1}]
      })
    }
  }
}

export default Store;
