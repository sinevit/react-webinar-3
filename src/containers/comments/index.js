import {memo, useCallback, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";

import useInit from "../../hooks/use-init";
import NewComment from "../../components/new-comment";
import RedirectText from "../../components/redirect-text";
// import {cn as bem} from '@bem-react/classname';
// import './style.css';
import CommentsLayout from "../../components/comments-layout";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from "shallowequal";
import useSelector from "../../hooks/use-selector";
import commentsActions from '../../store-redux/comments/actions';


function Comments() {

  const store = useStore();

  const selected = useSelector(state => ({
    exists: state.session.exists
  }));

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  const params = useParams();

  const select = useSelectorRedux(state => ({
    comments: state.comments.data,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  // const {t} = useTranslate();
  const callbacks = {
    // Добавление поста
    postComment: useCallback((postText) => {
      dispatch(commentsActions.addComment(postText,params.id, 'article'))
      dispatch(commentsActions.load(params.id));
    }, [store]),
  }

  console.log(select.comments)

  return (
      <CommentsLayout>
          <h3>Комментарии ({select.comments.count})</h3>
          {/* <h2>{t('comment.title')}</h2> */}
          {/* <PostList></PostList> */}
          {selected.exists ? <NewComment postComment={callbacks.postComment}/> : <RedirectText/>}
      </CommentsLayout>
  );
}


export default memo(Comments);
