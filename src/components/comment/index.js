import { memo, useState } from "react";
import PropTypes from "prop-types";
import dateFormat from "../../utils/format-date"
import { cn as bem } from '@bem-react/classname';
import './style.css';
import NewComment from "../new-comment";
import RedirectText from "../redirect-text";

function Comment({ data, onOpen, isOpenAnswer, exists, answerComment, parentId, closeAnswerForm }) {

  const cn = bem('Comment');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <p className={cn('user-name')} >{data.author.profile.name}</p>
        <p className={cn('date')} >{dateFormat(data.dateCreate)}</p>
      </div>
      <div className={cn('content')}>
        <p>{data.text}</p>
      </div>
      <button className={cn('button')} onClick={() => onOpen(data._id)}>Ответить</button>
      {!isOpenAnswer && <></>}
      {isOpenAnswer === data._id && exists && 
      <NewComment title={'Новый ответ'} closeAnswerForm={closeAnswerForm} isAnswer={isOpenAnswer} answerComment={answerComment(parentId)} />}
      {isOpenAnswer === data._id && !exists && <RedirectText closeAnswerForm={closeAnswerForm} isAnswer={isOpenAnswer} />}
    </div>
  );
}

Comment.propTypes = {
  date: PropTypes.object,
  onOpen: PropTypes.func,
  closeAnswerForm: PropTypes.func,
  answerComment: PropTypes.func,
  isOpenAnswer: PropTypes.string,
  exists: PropTypes.bool,
  parentId: PropTypes.string,
};

Comment.defaultProps = {
}

export default memo(Comment);
