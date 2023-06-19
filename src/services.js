import APIService from "./api";
import LanguageService from "./i18n";
import Store from "./store";
import createStoreRedux from "./store-redux";

class Services {

  constructor(config) {
    this.config = config;
  }

  /**
   * Сервис АПИ
   * @returns {APIService}
   */
  get api() {
    if (!this._api) {
      this._api = new APIService(this, this.config.api);
    }
    return this._api;
  }

  /**
   * сервис Language
   * @returns {LanguageService}
   */
  get lang() {
    if (!this._lang) {
      this._lang = new LanguageService(this, this.config.lang);
    }
    return this._lang;
  }

  /**
   * Сервис Store
   * @returns {Store}
   */
  get store() {
    if (!this._store) {
      this._store = new Store(this, this.config.store);
    }
    return this._store;
  }

  /**
   * Redux store
   */
  get redux(){
    if (!this._redux) {
      this._redux = createStoreRedux(this, this.config.redux);
    }
    return this._redux;
  }

}

export default Services;
