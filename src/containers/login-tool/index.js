import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import { Link, Navigate } from "react-router-dom";
import SideLayout from "../../components/side-layout";
import useInit from "../../hooks/use-init";

function LoginTool() {
  const store = useStore();

  const select = useSelector(state => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user,
  }));

  const callbacks = {
    logout: useCallback(() => store.actions.auth.logout(), [store]),
  }

  const { t } = useTranslate();

  return (
    <SideLayout side="end" padding="medium" gap="small">
      {select.isAuth && select.user
        ?
        <>
          <Link to={"/profile"}>{select.user.profile.name}</Link>
          <button onClick={callbacks.logout}>{t('logout')} </button>
        </>
        : <Link to={"/login"}><button >{t('login')} </button></Link>}
    </SideLayout>
  );
}

export default memo(LoginTool);
