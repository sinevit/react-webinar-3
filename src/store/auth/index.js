import StoreModule from "../module";

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class AuthState extends StoreModule {

  initState() {
    return {
      user: null,
      isAuth: false,
      error: null,
      waiting: false // признак ожидания загрузки
    }
  }

  async getUser() {
    const token = localStorage.getItem('token');

    if (token) {
      const response = await fetch(`/api/v1/users/self`, {
        headers: { "X-Token": token },
      });
      const json = await response.json();

      this.setState({ ...this.getState(), isAuth: true, user: json.result });
    }

  }

  /**
   * авторизация пользователя
   * @param login {String}
   * @param password {String}
   * @return {Promise<void>}
   */

  async login(login, password) {
    // установка признака ожидания загрузки
    this.setState({...this.getState(), waiting: true, isAuth: false});

    const data = { "login": login, "password": password }

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const json = await response.json();

      if (response?.ok) {

        localStorage.setItem('token', json.result.token);
        // Пользователь авторизован
        this.setState({ ...this.getState(), isAuth: true, user: json.result.user, error: null });

      } else {
        // Ошибка при загрузке
        this.setState({ ...this.getState(), error: `${json.error.data.issues[0].message}` })
      }

    } catch (e) {
      // Ошибка при загрузке
      this.setState({ ...this.getState(), error: `${e.name} ${e.message}` })
    }

    this.setState({ ...this.getState(), waiting: false })
  }

  async logout() {
    this.setState({ ...this.getState(), waiting: true });

    const token = localStorage.getItem('token');

    await fetch(`/api/v1/users/sign`, {
      method: "DELETE",
      headers: { "X-Token": token },
    });

    localStorage.removeItem("token");
    this.setState({ ...this.getState(), isAuth: false, user: null, waiting: false });

  }
}

export default AuthState;
