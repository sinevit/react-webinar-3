import { memo, useState } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function NewComment({ isAnswer, postComment}) {
  const cn = bem('NewComment');

  const [commentContent, setCommentContent] = useState('');

  const callbacks = {
    postComment: () => postComment(commentContent),
  }

  return (
    <div className={cn()}>
      <label className={cn('label')}>Новый комментарий
        <textarea
          name='postContent'
          defaultValue={commentContent}
          rows={4}
          onChange={e => setCommentContent(e.target.value)} 
        />
      </label>
      <button type='submit' onClick={callbacks.postComment}>Отправить</button>
      {isAnswer && <button type='reset'>Отмена</button>}
    </div>
  );
}

NewComment.propTypes = {
  isAnswer: PropTypes.bool,
};

NewComment.defaultProps = {
  isAnswer: false
}

export default memo(NewComment);
