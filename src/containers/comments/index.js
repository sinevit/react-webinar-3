import { memo, useCallback, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import NewComment from "../../components/new-comment";
import RedirectText from "../../components/redirect-text";
import CommentsLayout from "../../components/comments-layout";
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from "shallowequal";
import useSelector from "../../hooks/use-selector";
import commentsActions from '../../store-redux/comments/actions';
import Comment from "../../components/comment";
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
    }, []),
    // Добавление комментария
    answerComment: useCallback((id) => (postText) => {
      dispatch(commentsActions.addComment(postText, id, 'comment'))
      dispatch(commentsActions.load(params.id));
    }, []),
    //Открытие окна добавления ответа/нового коммента
    openAnswerForm: useCallback((id) => {
      setIsOpenAnswer(id)
    }, [isOpenAnswer]),
  }

  console.log(select.comments.items)
  console.log(isOpenAnswer)

  const CommentContainer = ({ comments, main }) => {
    console.log(comments)
    return (
      <CommentsLayout padding={main? 'none': 'medium'}>
        {comments.map(item => item.children.length ?
          <>
            <Comment key={item._id} data={item} onOpen={callbacks.openAnswerForm}
              isOpenAnswer={isOpenAnswer} exists={selected.exists}
              answerComment={callbacks.answerComment} parentId={item._id} closeAnswerForm={callbacks.openAnswerForm} />
            <CommentContainer key={`${item._id}child`} comments={item.children} />
          </>
          : <Comment key={item._id} data={item} onOpen={callbacks.openAnswerForm}
            isOpenAnswer={isOpenAnswer} exists={selected.exists}
            answerComment={callbacks.answerComment} parentId={item._id} closeAnswerForm={callbacks.openAnswerForm} />
        )

        }
      </CommentsLayout>
    )
  }

  return (
    <CommentsLayout>
      <h3>Комментарии ({select.comments.count})</h3>
      {/* <h2>{t('comment.title')}</h2> */}
      {select.comments?.items && <CommentContainer comments={listToTree(select.comments.items)} main={true}/>}

      {!isOpenAnswer && !selected.exists && <RedirectText />}
      {!isOpenAnswer && selected.exists
        && <NewComment title={'Новый комментарий'} isAnswer={isOpenAnswer} postComment={callbacks.postComment}/>}
        
    </CommentsLayout>
  );
}


export default memo(Comments);
