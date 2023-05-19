import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.cart = [];
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
   * Добавление новой записи
   */
  // addItem() {
  //   this.setState({
  //     ...this.state,
  //     list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
  //   })
  // };

  /**
   * Удаление записи по коду
   * @param code
   */
  // deleteItem(code) {
  //   this.setState({
  //     ...this.state,
  //     // Новый список, в котором не будет удаляемой записи
  //     list: this.state.list.filter(item => item.code !== code)
  //   })
  // };

  /**
   * Выделение записи по коду
   * @param code
   */
  addCartItem(item) {
    console.log(item);
    this.setState({
      ...this.state,
      cart: this.state.cart.map(el => {
        if (!cart.length) {
          this.setState({
            ...this.state,
            cart: [...this.state.cart, { ...item, count: 1 }],
          })
        }
        // if (item.code === el.code) {
        //   return {
        //     ...el,
        //     count: item.selected ? item.count : item.count + 1 || 1,
        //   };
        // }
      })
    })
    console.log(this.state.cart)
  }
}

export default Store;
