import { memo } from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import ProfileCard from '../../components/profile-card';
import { Navigate } from 'react-router-dom';
import LoginPanel from '../../containers/login-panel';

function Profile() {

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
      <LoginPanel />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileCard t={t} user={select.user}/>
    </PageLayout>
  );
}

export default memo(Profile);
