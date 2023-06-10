import { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function RedirectText({ isAnswer, closeAnswerForm }) {
  const cn = bem('RedirectText');

  const callbacks = {
    closeAnswerForm: () => closeAnswerForm(),
  }

  return (
    <div className={isAnswer? `${cn('answer')} ${cn()}` :cn()}>
      {isAnswer
        ? <p className={cn('text')}><Link to="/login" className={cn('link')}>Войдите</Link>, чтобы иметь возможность ответить. </p>
        : <p className={cn('text')}><Link to="/login" className={cn('link')}>Войдите</Link>, чтобы иметь возможность комментировать. </p>
      }
      {isAnswer && <p className={cn('text')}> <a className={cn('cancel')} onClick={callbacks.closeAnswerForm}>Отмена</a></p>}
    </div>
  )
}

RedirectText.propTypes = {
  isAnswer: PropTypes.string.isRequired,
  closeAnswerForm: PropTypes.func.isRequired,
};

RedirectText.defaultProps = {
  isAnswer: '',
  closeAnswerForm: () => { },
}

export default memo(RedirectText);
