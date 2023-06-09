import {memo, useCallback, useState} from "react";
import PropTypes from 'prop-types';
import useTranslate from "../../hooks/use-translate";
import Head from "../head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import PageLayout from "../page-layout";
import Input from "../input";
import Field from "../field";
import SideLayout from "../side-layout";
import TopHead from "../../containers/top-head";
import {useLocation, useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import NewComment from "../new-comment";
import RedirectText from "../redirect-text";
import {cn as bem} from '@bem-react/classname';
import './style.css';


function Comments({isExists, t, data}) {
  const cn = bem('Comments');
  return (
      <div className={cn()}>
          <h3 className={cn('title')}>Комментарии ({data.count})</h3>
          {/* <h2>{t('comment.title')}</h2> */}
          {/* <PostList></PostList> */}
          {isExists ? <NewComment /> : <RedirectText/>}
      </div>
  );
}

Comments.propTypes = {
  data: PropTypes.object,
  isExists: PropTypes.bool,
  t: PropTypes.func
};

Comments.defaultProps = {
  isExists: false,
  t: ()=> {},
}

export default memo(Comments);
