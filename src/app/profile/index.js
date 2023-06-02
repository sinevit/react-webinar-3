import { memo, useCallback } from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginTool from '../../containers/login-tool';
import ProfileCard from '../../components/profile-card';
import { Navigate } from 'react-router-dom';

function Profile() {

  const store = useStore();

  // useInit(() => {
  //   store.actions.auth.getUser();
  // }, []);

  const select = useSelector(state => ({
    user: state.auth.user,
    isAuth: state.auth.isAuth,
  }));

  if (!select.isAuth) {
    return <Navigate to='/login' />   
  }

  const { t } = useTranslate();

  return (
    <PageLayout>
      <LoginTool />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileCard t={t} user={select.user}/>
    </PageLayout>
  );
}

export default memo(Profile);
