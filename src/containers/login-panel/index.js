import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Spinner from "../../components/spinner";
import LoginTool from "../../components/login-tool";

function LoginPanel() {
  const store = useStore();

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user,
    waiting: state.auth.waiting
  }));

  useInit(() => {
    store.actions.auth.getUser();
  }, []);


  const callbacks = {
    logout: useCallback(() => store.actions.auth.logout(), [store]),
    logout: useCallback(() => store.actions.auth.logout(), [store]),
  }

  const { t } = useTranslate();

  return (
    <Spinner active={select.waiting}>
      <LoginTool isAuth={select.isAuth} userName={select.user?.profile.name}
        logout={callbacks.logout} logoutText={t('logout')} loginText={t('login')} />
    </Spinner>
  );
}

export default memo(LoginPanel);
