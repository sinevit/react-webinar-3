import { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function RedirectText({ isAnswer, closeAnswerForm, t }) {
  const cn = bem('RedirectText');

  const callbacks = {
    closeAnswerForm: () => closeAnswerForm(),
  }

  return (
    <div className={cn()}>
      {isAnswer
        ? <p className={cn('text')}>
          <Link to="/login" className={cn('link')}>{t('comments.redirectText')}</Link>
          {t('comments.redirectTextAnswer')}
        </p>
        : <p className={cn('text')}>
          <Link to="/login" className={cn('link')}>{t('comments.redirectText')}</Link>
          {t('comments.redirectTextComment')}
        </p>
      }
      {isAnswer && <p className={cn('text')}>
        <a className={cn('cancel')} onClick={callbacks.closeAnswerForm}>{t('comments.cancel')}</a>
      </p>}
    </div>
  )
}

RedirectText.propTypes = {
  isAnswer: PropTypes.string.isRequired,
  closeAnswerForm: PropTypes.func.isRequired,
  t: PropTypes.func,
};

RedirectText.defaultProps = {
  isAnswer: '',
  closeAnswerForm: () => { },
}

export default memo(RedirectText);
