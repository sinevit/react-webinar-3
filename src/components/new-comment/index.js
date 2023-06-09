import { memo, useState } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function NewComment({ isAnswer, }) {
  const cn = bem('NewComment');

  const [commentContent, setCommentContent] = useState('');

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
      <button type='submit'>Отправить</button>
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
