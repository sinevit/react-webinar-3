import { memo, useState } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function NewComment({ isAnswer, postComment, title, answerComment}) {
  const cn = bem('NewComment');

  const [commentContent, setCommentContent] = useState('');
console.log(commentContent)
  const callbacks = {
    postComment: () => postComment(commentContent),
    answerComment: () => answerComment(commentContent),
  }

  return (
    <div className={cn()}>
      <label className={cn('label')}>{title}
        <textarea
          name='postContent'
          defaultValue={commentContent}
          rows={4}
          onChange={e => setCommentContent(e.target.value)} 
        />
      </label>
      {isAnswer 
      ? <button type='submit' onClick={callbacks.answerComment}>Ответить</button>
      : <button type='submit' onClick={callbacks.postComment}>Отправить</button>
      }
      {isAnswer && <button type='reset'>Отмена</button>}
    </div>
  );
}

NewComment.propTypes = {
  isAnswer: PropTypes.string,
  title: PropTypes.string,
  postComment: PropTypes.func,
  answerComment: PropTypes.func,
};

NewComment.defaultProps = {
  isAnswer: false,
  postComment: ()=>{}
}

export default memo(NewComment);
