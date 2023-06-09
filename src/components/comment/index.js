import {memo, useState} from "react";
import PropTypes from "prop-types";
import dateFormat from "../../utils/format-date"
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Comment({data}){

  const cn = bem('Comment');
  console.log(data)

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <p className={cn('user-name')} >{data.author.profile.name}</p>
        <p className={cn('date')} >{dateFormat(data.dateCreate)}</p>
      </div>
      <div className={cn('content')}>
          <p>{data.text}</p>
      </div>
      <button className={cn('button')}>Ответить</button>
    </div>
  );
}

Comment.propTypes = {
  date: PropTypes.object
};

Comment.defaultProps = {
}

export default memo(Comment);
