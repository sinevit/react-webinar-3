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
import LoginForm from '../../containers/login-form';

function Login() {

  const store = useStore();

  // useInit(() => {
  //   store.actions.auth.getUser();
  // }, []);

  const { t } = useTranslate();

  return (
    <PageLayout>
      <LoginTool />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm />
    </PageLayout>
  );
}

export default memo(Login);
