import StoreModule from "../module";

const baseURL = '/api/v1/articles';

class Card extends StoreModule {

  initState() {
    return {
      card: {},
    }
  }

  async loadCard(id) {
    const response = await fetch(`${baseURL}/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      card: json.result,
    }, 'Загружена карточка товара');
  }
}

export default Card;
