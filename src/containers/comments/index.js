import { memo, useCallback, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";

import useInit from "../../hooks/use-init";
import NewComment from "../../components/new-comment";
import RedirectText from "../../components/redirect-text";
// import {cn as bem} from '@bem-react/classname';
// import './style.css';
import CommentsLayout from "../../components/comments-layout";
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from "shallowequal";
import useSelector from "../../hooks/use-selector";
import commentsActions from '../../store-redux/comments/actions';
import Comment from "../../components/comment";
import treeToList from "../../utils/tree-to-list"
import listToTree from "../../utils/list-to-tree"


function Comments() {

  const store = useStore();

  const selected = useSelector(state => ({
    exists: state.session.exists
  }));

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  const params = useParams();

  const [isOpenAnswer, setIsOpenAnswer] = useState('');

  const select = useSelectorRedux(state => ({
    comments: state.comments.data,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  // const {t} = useTranslate();
  const callbacks = {
    // Добавление поста
    postComment: useCallback((postText) => {
      dispatch(commentsActions.addComment(postText, params.id, 'article'))
      dispatch(commentsActions.load(params.id));
    }, [store]),
    answerComment: useCallback((id)=>(postText) => {
      dispatch(commentsActions.addComment(postText, id, 'comment'))
      dispatch(commentsActions.load(params.id));
    }, [store]),
    openAnswerForm: useCallback((id) => {
      setIsOpenAnswer(id)
    }, [isOpenAnswer]),
  }

  const container = {
    padding: 12,
  }
  console.log(select.comments.items)
  console.log(isOpenAnswer)
  const newArr = select.comments.items && (listToTree(select.comments.items));

  const CommentContainer = ({ comments }) => {
    console.log(comments);
    return (
      <div style={container}>
        {comments.map(item => item.children.length ?
          <>
            <Comment key={item._id} data={item} onOpen={callbacks.openAnswerForm}
              isOpenAnswer={isOpenAnswer} exists={selected.exists}
              answerComment={callbacks.answerComment} parentId={item._id}/>
            <CommentContainer key={`${item._id}child`} comments={item.children} />
          </>
          : <Comment key={item._id} data={item} onOpen={callbacks.openAnswerForm}
            isOpenAnswer={isOpenAnswer} exists={selected.exists}
            answerComment={callbacks.answerComment} parentId={item._id} />
        )

        }
      </div>
    )
  }

  return (
    <CommentsLayout>
      <h3>Комментарии ({select.comments.count})</h3>
      {/* <h2>{t('comment.title')}</h2> */}
      {select.comments?.items && <CommentContainer comments={newArr} />}

      {!isOpenAnswer && !selected.exists && <RedirectText />}
      {!isOpenAnswer && selected.exists 
      && <NewComment title={'Новый комментарий'} isAnswer={isOpenAnswer} postComment={callbacks.postComment} />}
    </CommentsLayout>
  );
}



export default memo(Comments);
