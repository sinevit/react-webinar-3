import StoreModule from "../module";

/**
 * Детальная ифнормация о товаре для страницы товара
 */
class AuthState extends StoreModule {

  initState() {
    return {
      user: null,
      isAuth: false,
      error: null
    }
  }

  async getUser() {
    this.setState({ ...this.getState(), isAuth: false});
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      const response = await fetch(`/api/v1/users/self`, {
        headers: { "X-Token": token },
      });
      const json = await response.json();
      console.log(json)

      this.setState({ ...this.getState(), isAuth: true, user: json.result});
    }

  }


  /**
   * авторизация пользователя
   * @param login {String}
   * @param password {String}
   * @return {Promise<void>}
   */

  async login(login, password) {

    const data = { "login": login, "password": password }

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (response?.ok || response.status === 200) {
        const json = await response.json();
        console.log(json)
        localStorage.setItem('token', json.result.token);

        // Пользователь авторизован
        this.setState({ ...this.getState(), isAuth: true, user: json.result.user, error: null});

      } else {
        this.setState({ ...this.getState(), error: `${response.status} ${response.statusText}` })
      }

    } catch (e) {
      // Ошибка при загрузке
      // throw new Error(`status ${response.status}`)
    }
  }

  async logout() {
		const token = localStorage.getItem('token');

    await fetch(`/api/v1/users/sign`, {
      method: "DELETE",
      headers: { "X-Token": token},
    });

    localStorage.removeItem("token");
    this.setState({ ...this.getState(), isAuth: false, user: null});

  }
}

export default AuthState;
