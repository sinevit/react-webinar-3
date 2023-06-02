import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Form from "../../components/form";
import { Navigate } from "react-router-dom";

function LoginForm() {

  const store = useStore();

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    error: state.auth.error,
  }));

  const callbacks = {
    login: useCallback((login, password) => store.actions.auth.login(login, password), [store]),
  }

  const { t } = useTranslate();

  return (
    <Form login={callbacks.login} title={t('login.title')} loginText={t('login.login')}
      password={t('login.password')} buttonName={t('login.button')} isAuth={select.isAuth} error={select.error} />
  );
}

export default memo(LoginForm);
