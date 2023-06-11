import { memo, useCallback, useMemo, useState } from "react";
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
import treeToList from "../../utils/tree-to-list"
import useTranslate from "../../hooks/use-translate";


function Comments() {

  const store = useStore();

  const selected = useSelector(state => ({
    exists: state.session.exists,
    user: state.session.user.profile,
  }));

  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  const params = useParams();

  const [isOpenAnswer, setIsOpenAnswer] = useState('');

  const select = useSelectorRedux(state => ({
    comments: state.comments.comments,
    count: state.comments.count,
    status: state.comments.status,
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  // const {t} = useTranslate();
  const callbacks = {
    // Добавление поста
    postComment: useCallback((postText) => {
      dispatch(commentsActions.addComment(postText, params.id, 'article'))
    }, []),
    // Добавление комментария
    answerComment: useCallback((id) => (postText) => {
      dispatch(commentsActions.addComment(postText, id, 'comment'))
    }, []),
    //Открытие окна добавления ответа/нового коммента
    openAnswerForm: useCallback((id) => {
      setIsOpenAnswer(id)
    }, [isOpenAnswer]),
  }
  const {t} = useTranslate();

  // const commentsLvl = useMemo(() => ([
  //   ...treeToList(listToTree(select.comments, 'comments'), (item, level) => (
  //     {value: item._id, lvl: level}
  //   ))
  // ]), [select.comments])
  // console.log(select.comments)
  // // console.log(listToTree(select.comments))
  // console.log(listToTree(select.comments, 'comments'))
  // console.log(commentsLvl)


  const CommentContainer = ({ comments, main }) => {
    // console.log(commentsLvl.find(el=> el.value === comments[0]._id).lvl)
    return (
      <CommentsLayout padding={main ? 'small' : 'medium'}>
        {comments.map(item =>
          <>
            <Comment key={item._id} data={item} onOpen={callbacks.openAnswerForm} username={selected.user?.name} t={t}/>

            {item.children.length ? <CommentContainer key={`${item._id}child`}  comments={item.children} /> : <></>}

            {!isOpenAnswer && <></>}
            
            {isOpenAnswer === item._id && selected.exists &&
              <CommentsLayout padding={'medium'}>
                <NewComment title={t('comments.newAnswer')} closeAnswerForm={callbacks.openAnswerForm}
                  isAnswer={isOpenAnswer} status={select.status} answerComment={callbacks.answerComment(item._id)} t={t}/>
              </CommentsLayout>}

            {isOpenAnswer === item._id && !selected.exists &&
              <CommentsLayout padding={'medium'}>
                <RedirectText closeAnswerForm={callbacks.openAnswerForm} isAnswer={isOpenAnswer} t={t}/>
              </CommentsLayout>}
          </>
        )
        }
      </CommentsLayout>
    )
  }

  return (
    <CommentsLayout>
      <h3>{t('comments.title')} ({select.count})</h3>
      {select.comments && <CommentContainer comments={listToTree(select.comments, 'comments')} main={true} />}

      {!isOpenAnswer && !selected.exists && <RedirectText t={t}/>}
      {!isOpenAnswer && selected.exists
        && <NewComment title={t('comments.newComment')} status={select.status} isAnswer={isOpenAnswer} postComment={callbacks.postComment} t={t}/>}

    </CommentsLayout>
  );
}


export default memo(Comments);
