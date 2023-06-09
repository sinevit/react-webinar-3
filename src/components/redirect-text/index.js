import { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function RedirectText({ isAnswer }) {
  const cn = bem('RedirectText');
  return (
    <div className={cn()}>
      {isAnswer 
      ? <p className={cn('text')}><Link to="/login" className={cn('link')}>Войдите</Link>, чтобы иметь возможность ответить</p> 
      : <p className={cn('text')}><Link to="/login" className={cn('link')}>Войдите</Link>, чтобы иметь возможность комментировать</p>
      }
      {isAnswer && <button type="reset">Отмена</button>}
    </div>
  )
}

RedirectText.propTypes = {
  isAnswer: PropTypes.bool,
};

RedirectText.defaultProps = {
  isAnswer: false
}

export default memo(RedirectText);
