import { memo, useState } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function NewComment({ isAnswer, title, postComment, answerComment, closeAnswerForm }) {
  const cn = bem('NewComment');

  const [commentContent, setCommentContent] = useState('');

  const callbacks = {
    postComment: () => postComment(commentContent),
    answerComment: () => answerComment(commentContent),
    closeAnswerForm: () => closeAnswerForm(),
  }

  return (
    <div className={isAnswer? `${cn('answer')} ${cn()}` :cn()}>
      <label className={cn('label')}>{title}
        <textarea
          name='postContent'
          defaultValue={commentContent}
          rows={4}
          onChange={e => setCommentContent(e.target.value)}
        />
      </label >
      <div className={cn('buttons-block')}>
      {isAnswer 
      ? <button type='submit' onClick={callbacks.answerComment}>Ответить</button>
      : <button type='submit' onClick={callbacks.postComment}>Отправить</button>
      }
        {/* <button type='submit' onClick={isAnswer ? callbacks.answerComment : callbacks.postComment}>Отправить</button> */}
        {isAnswer && <button type='reset' onClick={callbacks.closeAnswerForm}>Отмена</button>}
      </div>
    </div>
  );
}

NewComment.propTypes = {
  isAnswer: PropTypes.string,
  title: PropTypes.string,
  postComment: PropTypes.func,
  answerComment: PropTypes.func,
  closeAnswerForm: PropTypes.func,
};


export default memo(NewComment);
